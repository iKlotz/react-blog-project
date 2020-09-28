import React from 'react';
import Search from "../components/Search";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({

    blogsContainer: {
        paddingTop: theme.spacing(3),
        marginLeft: "inherit",
    },
}));

function SearchPage(props) {
    const classes = useStyles();


    return (
        <Container maxWidth="false" className={classes.blogsContainer}>
            <Grid container spacing={3}>
                <Search {...props}/>
            </Grid>
        </Container>
    );
}

export default SearchPage;