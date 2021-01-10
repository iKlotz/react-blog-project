import React from 'react';
import '../../App.css';
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles((theme) => ({
    contactMeDiv: {
        marginLeft: "15px",
        padding: "15px"
    },
}));


function ContactMe() {
    const classes = useStyles();
    return (
        <div className={classes.contactMeDiv}>
            <h1>Want to keep in touch?</h1>
            <p>
                Email: idoklotz@gmail.com
            </p>
            <p>
                Cell: +972 586397163
            </p>
        </div>
    );
}

export default ContactMe;