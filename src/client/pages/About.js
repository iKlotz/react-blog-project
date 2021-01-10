import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({

    aboutDiv: {
        paddingTop: theme.spacing(3),
        marginLeft: "15px",
        padding: "15px"
    },
}));

function About() {
    const classes = useStyles();

    return (
        <div className={classes.aboutDiv}>
            <h1>About me</h1>
            <p>
                <span>This is a blog website that was created as a part of a full-stack development course taught by Intuit employees, thanks guys!</span>
            </p>
        </div>
    );
}

export default About;