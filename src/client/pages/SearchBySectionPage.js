import React from 'react';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SearchBySection from "../components/Search/SearchBySection";

const useStyles = makeStyles((theme) => ({

    blogsContainer: {
        paddingTop: theme.spacing(3),
        marginLeft: "inherit",
    },
}));

function SearchBySectionPage(props) {
    const classes = useStyles();

    return (
        <Container maxWidth="false" className={classes.blogsContainer}>
            <Grid container spacing={3}>
                <SearchBySection {...props}/>
            </Grid>
        </Container>
    );
}

export default SearchBySectionPage;