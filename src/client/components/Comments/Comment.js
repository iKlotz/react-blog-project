import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";

import Faker from "faker";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    fonts: {
        fontWeight: "bold"
    },
    inline: {
        display: "inline"
    }
}));

const Comment = ({comments}) => {
    const classes = useStyles();
    return (
        <List className={classes.root}>
            {comments.map(comment => {
                //console.log("Comment", comment);
                return (
                    <React.Fragment key={comment.id}>
                        <ListItem key={comment.id} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="avatar" src={Faker.image.avatar()}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography className={classes.fonts}>
                                        {comment.first_name + ' ' + comment.last_name}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {comment.email}
                                        </Typography>
                                        {` - ${comment.content}`}
                                    </>
                                }
                            />
                        </ListItem>
                        <Divider/>
                    </React.Fragment>
                );
            })}
        </List>
    );
};

export default Comment;