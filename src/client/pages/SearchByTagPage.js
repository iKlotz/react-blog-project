import React from 'react';
import SearchByTag from "../components/Search/SearchByTag";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";


const useStyles = makeStyles((theme) => ({
    blogsContainer: {
        paddingTop: theme.spacing(3),
        marginLeft: "inherit",
    },
}));


function SearchByTagPage(props) {
    const classes = useStyles();

    return (
        <Container maxWidth="false" className={classes.blogsContainer}>
            <Grid container spacing={3}>
                <SearchByTag {...props}/>
            </Grid>
        </Container>
    );
}

export default SearchByTagPage;