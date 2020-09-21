import React from 'react';
import SearchByTag from "../components/SearchByTag";
import Grid from "@material-ui/core/Grid";

function SearchByTagPage(props) {
    return (
        <Grid container spacing={3}>
            <SearchByTag {...props}/>
        </Grid>
    );
}

export default SearchByTagPage;