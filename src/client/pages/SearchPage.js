import React from 'react';
import Search from "../components/Search";
import Grid from "@material-ui/core/Grid";

function SearchPage(props) {
    return (
        <Grid container spacing={3}>
            <Search {...props}/>
        </Grid>
    );
}

export default SearchPage;