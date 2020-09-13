from flask import Flask, request, abort, make_response
from datetime import date, datetime
import mysql.connector as mysql
import json
from flask_cors import CORS
import bcrypt
import uuid

db = mysql.connect(
    #host = "my-rds.ccig5nob4omq.us-east-1.rds.amazonaws.com",
    host = "localhost",
    #user = "admin",
    user = "root",
    passwd = "BKNY1987",
    database = "blog")
print(db)

app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
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
    res_data = {"first_name": first_name, "user_id": user_id}
    res = make_response(res_data)
    res.set_cookie("session_id", session_id)
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
    #return 'New user id: ' + str(new_user_id)
    res_data = {"first_name": first_name, "user_id": user_id}
    res = make_response(res_data)
    #res.set_cookie("session_id", session_id) make it work
    return res

@app.route('/posts', methods=['GET', 'POST'])
def manage_posts():
    if request.method == 'GET':
        return get_all_posts()
    else:
        return add_post()


def add_post():
    data = request.get_json()
    print(data)
    current_time = datetime.now()
    author = "Ido Klotz" #set default to anonymous???
    query = "insert into posts (author, title, content, published) values (%s ,%s, %s, %s)"
    values = (author, data["title"], data["content"], current_time)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()

    return "Post successfully added"


def get_all_posts():
    query = "select id, author, title, content, image, published from posts;"
    #comments_query = "select id, title, content, author, published from post_comment;"
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    header = ['id', 'author', 'title', 'content', 'image', 'published']
    data = []

    for r in records:
        post = dict(zip(header, r))
        # post.update({"comments": get_post_comments(r[0])}) #don't need it here
        data.append(post)

    return json.dumps(data, default=str)


############### is it pretty enough?

@app.route('/posts/<id>/comments', methods=['GET', 'POST'])
def manage_comments(id):
    if request.method == 'GET':
        return get_post_comments(id)
    else:
        return add_post_comment(id)

def get_post_comments(id):
    query = "select title, published_at, content, author_id from post_comment where post_id = (%s)"
    value = (id,)
    cursor = db.cursor()
    cursor.execute(query, value)
    records = cursor.fetchall()
    cursor.close()
    header = ['title', 'published_at', 'content', 'author_id']
    data = []

    for r in records:
        data.append(dict(zip(header, r)))

    return data

@app.route('/posts/<id>/comments')
def add_post_comment(id):
    data = request.get_json()
    print(data)
    current_time = datetime.now()
    #author_id = 1 #set to current user
    query = "insert into post_comment (post_id, author_id, title, content, published_at) values (%s ,%s, %s, %s, %s)"
    values = (data["post_id"], data["author_id"], data["title"], data["content"], current_time)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()

    return "Comment successfully added"

@app.route('/posts/<id>')

def get_post_by_id(id):
    query = "select id, title, content, author, image, published from posts where id = (%s)"
    value =(id,)
    #print(id)
    cursor = db.cursor()
    cursor.execute(query,value)
    records = cursor.fetchall()
    print(records)
    header = ['id', 'title', 'content', 'author', 'image', 'published']
    cursor.close()
    post = dict(zip(header,records[0]))
    post.update({"comments": get_post_comments(records[0][0])})
    return json.dumps(post, indent=4, sort_keys=True, default=str)

@app.route('/api/alive', methods=['GET'])
def api_alive():
    return "It's a new dawn, It's a new day, It's a new life for me and I'm feeling good!"


if __name__ == "__main__":
    app.run()


