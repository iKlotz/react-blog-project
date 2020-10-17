from flask import Flask, request, abort, make_response
from datetime import date, datetime
import mysql.connector as mysql
import json
from flask_cors import CORS
import bcrypt
import uuid

db = mysql.connect(
    #aws
    #host = "my-rds.ccig5nob4omq.us-east-1.rds.amazonaws.com",
    #user = "admin",
    host = "localhost",
    user = "root",
    passwd = "IK123456",
    database = "blog")


app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    query = "select id, password, first_name from users where email = %s"
    values = (data['email'], )
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    print(record)

    if not record:
        abort(401)

    user_id = record[0]
    hashed_pwd = record[1].encode('utf-8')
    first_name = record[2]

    if bcrypt.hashpw(data['password'].encode('utf-8'), hashed_pwd) != hashed_pwd:
        abort(401)

    session_id = str(uuid.uuid4())
    query = "insert into sessions (user_id, session_id) values (%s, %s) on duplicate key update session_id=%s"
    values = (user_id, session_id, session_id)
    cursor.execute(query, values)
    db.commit()
    res_data = {"first_name": first_name, "user_id": user_id, "session_id": session_id}
    res = make_response(res_data)
    res.set_cookie("session_id", session_id)
    res.set_cookie("user_id", str(user_id))
    res.set_cookie("first_name", (first_name))

    return res



@app.route('/logout', methods=['POST'])
def logout():
    data = request.get_json()
    query = "delete from sessions where user_id=%s"
    print(data['user_id'])
    value = (data['user_id'], )
    cursor = db.cursor()
    cursor.execute(query, value)
    db.commit()
    cursor.close()
    res = make_response()
    res.set_cookie("session_id", '', expires=0)
    res.set_cookie("user_id", '', expires=0)
    res.set_cookie("first_name", '', expires=0)

    return res

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print(data)
    query = "select id from users where email=%s"
    value = (data['email'], )
    cursor = db.cursor()
    cursor.execute(query, value)
    records = cursor.fetchall()
    print(records)

    if records:
        abort(401)

    hashed_pwd = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    query = "insert into users (first_name, last_name, email, password) values (%s, %s, %s, %s)"
    values = (data['first_name'], data['last_name'], data['email'], hashed_pwd)
    cursor.execute(query, values)
    db.commit()
    user_id = cursor.lastrowid
    first_name = data['first_name']
    cursor.close()
    res_data = {"first_name": first_name, "user_id": user_id}
    res = make_response(res_data)

    return res

@app.route('/users/<key>', methods=['GET'])
def get_user_id(key):
    query = "select id, first_name from users where email = (%s)"
    value =(key,)
    cursor = db.cursor()
    cursor.execute(query,value)
    records = cursor.fetchall()
    header = ['user_id', 'first_name']
    cursor.close()
    user = dict(zip(header,records[0]))
    print(user)

    return json.dumps(user, default=str)


@app.route('/posts', methods=['GET', 'POST', 'PUT'])
def manage_posts():
    if request.method == 'GET':
        return get_all_posts()
    elif request.method == 'POST':
        return add_post()
    else:
        return submit_post()

def submit_post():
    data = request.get_json()
    query = "update posts set title=(%s), content=(%s), image=(%s), status=(%s) where id=(%s)"
    values = (data["title"], data["content"], data["image"], "published", data["postId"])
    cursor = db.cursor()
    cursor.execute(query,values)
    db.commit()
    cursor.close()

    return "Post was successfully submitted"

def add_post():
    data = request.get_json()
    current_time = datetime.now()
    query = "insert into posts (author_id, title, content, image, published, status) values (%s ,%s, %s, %s, %s, %s)"
    values = (data["authorId"], data["title"], data["content"], data["image"], current_time, data["status"])
    cursor = db.cursor()
    cursor.execute(query, values)
    post_id = cursor.lastrowid
    db.commit()
    cursor.close()
    res_data = {"post_id": post_id}
    res = make_response(res_data)

    return res


def get_all_posts():
    query = "select posts.id, author_id, left(title, 40), left(content, 50), image, published, first_name, last_name from posts join users on posts.author_id = users.id where status = (%s) order by id desc;"
    values=("published",)
    cursor = db.cursor()
    cursor.execute(query, values)
    records = cursor.fetchall()
    cursor.close()
    header = ['id', 'author_id', 'title', 'content', 'image', 'published', 'first_name', 'last_name']
    data = []

    for r in records:
        post = dict(zip(header, r))
        data.append(post)

    return json.dumps(data, default=str)

@app.route('/posts/<id>/tags', methods=['GET', 'POST'])
def manage_tags(id):
    if request.method == 'GET':
        return get_post_tags(id)
    else:
        return add_post_tag(id)


def get_post_tags(id):
    query = "select id, label from tags where post_id = (%s)"
    value = (id,)
    cursor = db.cursor()
    cursor.execute(query, value)
    records = cursor.fetchall()
    cursor.close()
    header = ['id', 'label']
    data = []

    for r in records:
        data.append(dict(zip(header, r)))

    return data

def add_post_tag(id):
    data = request.get_json()
    query = "insert into tags (post_id, label) values (%s ,%s)"
    values = (id, data["label"])
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()

    return "Tag successfully added"

@app.route('/posts/<id>/tags/<label>', methods=['POST'])
def delete_post_tag(id, label):
    query = "delete from tags where post_id = (%s) AND label=(%s)"
    value = (id, label)
    cursor = db.cursor()
    cursor.execute(query, value)
    db.commit()
    cursor.close()

    return "tag successfully deleted"

@app.route('/posts/<id>/comments', methods=['GET', 'POST'])
def manage_comments(id):
    if request.method == 'GET':
        return get_post_comments(id)
    else:
        return add_post_comment(id)

def get_post_comments(id):
    query = "select published_at, content, author_id, first_name, last_name from comments join users on comments.author_id = users.id where post_id = (%s) order by comments.id desc"
    value = (id,)
    cursor = db.cursor()
    cursor.execute(query, value)
    records = cursor.fetchall()
    cursor.close()
    header = ['published_at', 'content', 'author_id', 'first_name', 'last_name']
    data = []

    for r in records:
        data.append(dict(zip(header, r)))

    return data

@app.route('/posts/<id>/comments')
def add_post_comment(id):
    data = request.get_json()
    print(data)
    current_time = datetime.now()
    query = "insert into comments (post_id, author_id, content, published_at) values (%s ,%s, %s, %s)"
    values = (data["post_id"], data["author_id"], data["content"], current_time)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    res_data = {"post_id": data["post_id"], "author_id": data["author_id"], "content": data["content"], "first_name": data["first_name"], "last_name": data["last_name"], "published_at": current_time}
    res = make_response(res_data)

    return res

@app.route('/posts/<id>', methods=['GET', 'DELETE'])

def manage_posts_by_id(id):
    if request.method == 'GET':
        return get_post_by_id(id)
    else:
        return delete_post_by_id(id)

def get_post_by_id(id):
    query = "select posts.id, author_id, title, content, image, published, first_name, last_name from posts join users on posts.author_id = users.id where posts.id = (%s)"
    value =(id,)
    cursor = db.cursor()
    cursor.execute(query,value)
    records = cursor.fetchall()
    print(records)
    header = ['id', 'author_id', 'title', 'content', 'image', 'published', 'first_name', 'last_name']
    cursor.close()
    post = dict(zip(header,records[0]))
    post.update({"comments": get_post_comments(records[0][0])})
    post.update({"tags": get_post_tags(records[0][0])})

    return json.dumps(post, indent=4, sort_keys=True, default=str)

def delete_post_by_id(id):
    query = "delete from posts where id=(%s)"
    value =(id,)
    cursor = db.cursor()
    cursor.execute(query, value)
    db.commit()
    cursor.close()

    return "Post was successfully deleted"

@app.route('/edit-post/<id>', methods=['PUT'])

def edit_post(id):
    data = request.get_json()
    query = "update posts set title=(%s), content=(%s), image=(%s) where id=(%s)"
    values = (data["title"], data["content"], data["image"], id)
    cursor = db.cursor()
    cursor.execute(query,values)
    db.commit()
    cursor.close()

    return "Post was successfully updated"


@app.route('/search/<key>')

def filter_records(key):
    query_key = "%" + key + "%"
    query = "select posts.id, first_name, last_name, left(title, 40), left(content, 50), image, published from posts join users on posts.author_id = users.id WHERE title like %s OR content like %s OR first_name like %s OR last_name like %s and status =(%s) order by id desc"
    value = (query_key, query_key, query_key, query_key, "published")
    cursor = db.cursor()
    cursor.execute(query, value)
    records = cursor.fetchall()
    cursor.close()
    header = ['id', 'first_name', 'last_name', 'title', 'content', 'image', 'published']
    data = []

    for r in records:
        post = dict(zip(header, r))
        data.append(post)

    return json.dumps(data, default=str)

@app.route('/search/tag/<key>')

def filter_records_by_tag(key):
    query_key = "%" + key + "%"
    query = "select posts.id, first_name, last_name, left(title, 40), left(content, 50), image, published, label from posts join tags on posts.id = tags.post_id join users on posts.author_id = users.id where label like %s and status = (%s) order by id desc"
    value = (query_key, "published")
    cursor = db.cursor()
    cursor.execute(query, value)
    records = cursor.fetchall()
    print(records)
    cursor.close()
    header = []
    header = ['id', 'first_name', 'last_name', 'title', 'content', 'image', 'published']
    data = []

    for r in records:
        post = dict(zip(header, r))
        data.append(post)

    return json.dumps(data, default=str)

@app.route('/api/alive', methods=['GET'])
def api_alive():
    return "It's a new dawn, It's a new day, It's a new life for me and I'm feeling good!"


if __name__ == "__main__":
    app.run()


