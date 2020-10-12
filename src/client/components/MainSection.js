import React from 'react';
import Posts from './Posts'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MainFeaturedPost from "./MainFeaturedPost";

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#fff"
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
        height: "500px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em"
        }
    },
    blogsContainer: {
        paddingTop: theme.spacing(3),
        marginLeft: "inherit",
    },
    blogTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3),
    },
    card: {
        maxWidth: "100%",
    },
    media: {
        height: 240
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },
    author: {
        display: "flex"
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center"
    }
}));


const mainFeaturedPost = {
    title: 'Elon Musk\'s Tesla Roadster And SpaceX Starman Made First Close Approach With Mars',
    description:
        "Car and space enthusiasts alike are sure to get excited with this news. Starman, the spacesuit-clad mannequin by SpaceX, just \"drived\" by Mars for the very first time.",
    //image: 'https://source.unsplash.com/random',
    image: 'https://cnet1.cbsistatic.com/img/KM9vLKWCuNO4yRa_feoE0LJeS5I=/1092x0/2018/02/08/3dcc95d9-a305-407d-9a7a-5aa80802cf45/screen-shot-2018-02-08-at-12-07-40-pm-1-1.jpg',
    imgText: 'main image description',
    linkText: 'Continue reading…',
};


function MainSection() {
    const classes = useStyles();

    return (
        <section className="post-section">
            <Container maxWidth="false" className={classes.blogsContainer}>
                <MainFeaturedPost post={mainFeaturedPost} />
                <Grid container spacing={3}>
                    <Posts/>
                </Grid>
            </Container>

        </section>
    );
}

export default MainSection;