// import React from 'react';
// import { fade, makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import Badge from '@material-ui/core/Badge';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Person from '@material-ui/icons/Person';
// import ExitToApp from '@material-ui/icons/ExitToApp';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';
// import withStyles from "@material-ui/core/styles/withStyles";
// import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
// import Container from "@material-ui/core/Container";
// import Box from "@material-ui/core/Box";
//
// const styles = theme =>  ({
//     appBar: {
//         backgroundColor: "#fff"
//     },
//     hero: {
//         backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')`,
//         height: "100px",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         position: "relative",
//         display: "flex",
//         justifyContent: "center",
//         color: "#fff",
//         [theme.breakpoints.down("sm")]: {
//             height: 300,
//             fontSize: "3em"
//         }
//     },
//     grow: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
//     title: {
//         display: 'none',
//         [theme.breakpoints.up('sm')]: {
//             display: 'block',
//         },
//     },
//     search: {
//         position: 'relative',
//         borderRadius: theme.shape.borderRadius,
//         backgroundColor: fade(theme.palette.common.white, 0.15),
//         '&:hover': {
//             backgroundColor: fade(theme.palette.common.white, 0.25),
//         },
//         marginRight: theme.spacing(2),
//         marginLeft: 0,
//         width: '100%',
//         [theme.breakpoints.up('sm')]: {
//             marginLeft: theme.spacing(3),
//             width: 'auto',
//         },
//     },
//     searchIcon: {
//         padding: theme.spacing(0, 2),
//         height: '100%',
//         position: 'absolute',
//         pointerEvents: 'none',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     inputRoot: {
//         color: 'inherit',
//     },
//     inputInput: {
//         padding: theme.spacing(1, 1, 1, 0),
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//         transition: theme.transitions.create('width'),
//         width: '100%',
//         [theme.breakpoints.up('md')]: {
//             width: '20ch',
//         },
//     },
//     sectionDesktop: {
//         display: 'none',
//         [theme.breakpoints.up('md')]: {
//             display: 'flex',
//         },
//     },
//     sectionMobile: {
//         display: 'flex',
//         [theme.breakpoints.up('md')]: {
//             display: 'none',
//         },
//     },
//
//     blogsContainer: {
//         paddingTop: theme.spacing(3)
//     },
//     blogTitle: {
//         fontWeight: 800,
//         paddingBottom: theme.spacing(3)
//     },
//     card: {
//         maxWidth: "100%",
//     },
//     media: {
//         height: 240
//     },
//     cardActions: {
//         display: "flex",
//         margin: "0 10px",
//         justifyContent: "space-between"
//     },
//     author: {
//         display: "flex"
//     },
//     paginationContainer: {
//         display: "flex",
//         justifyContent: "center"
//     }
// });
//
// class Header extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             anchorEl: null,
//             open: false
//         };
//
//         this.actionRef = React.createRef();
//     }
//
//     flipOpen = () => this.setState({ ...this.state, open: !this.state.open });
//
//     handleClick = event => {
//         this.state.anchorEl
//             ? this.setState({ anchorEl: null })
//             : this.setState({ anchorEl: event.currentTarget });
//         this.flipOpen();
//     };
//
//     //const [anchorEl, setAnchorEl] = React.useState(null);
//     //const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
//
//     isMenuOpen = () => this.state.open;
//    // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
//
//     handleProfileMenuOpen = event => {
//         //setAnchorEl(e.currentTarget);
//         this.setState({ anchorEl: event.currentTarget })
//     };
//
//     // const handleMobileMenuClose = () => {
//     //     setMobileMoreAnchorEl(null);
//     // };
//
//     handleMenuClose = () => {
//         this.setState({ anchorEl: null })
//         //handleMobileMenuClose();
//     };
//     //
//     // const handleMobileMenuOpen = (event) => {
//     //     setMobileMoreAnchorEl(event.currentTarget);
//     // };
//
//     menuId = () => 'primary-search-account-menu';
//     renderMenu = () => (
//         <Menu
//             action={this.actionRef}
//             anchorEl={this.state.anchorEl}
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             id={this.menuId}
//             keepMounted
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//             open={this.isMenuOpen}
//             onClose={this.handleMenuClose}
//         >
//             <MenuItem onClick={this.handleMenuClose}>Hi, Ido</MenuItem>
//             <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
//         </Menu>
//     );
//
//     mobileMenuId = 'primary-search-account-menu-mobile';
//     // renderMobileMenu = () => (
//     //     <Menu
//     //         anchorEl={mobileMoreAnchorEl}
//     //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//     //         id={mobileMenuId}
//     //         keepMounted
//     //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//     //         open={isMobileMenuOpen}
//     //         onClose={handleMobileMenuClose}
//     //     >
//     //         <MenuItem onClick={handleProfileMenuOpen}>
//     //             <IconButton
//     //                 aria-label="account of current user"
//     //                 aria-controls="primary-search-account-menu"
//     //                 aria-haspopup="true"
//     //                 color="inherit"
//     //             >
//     //                 <AccountCircle />
//     //             </IconButton>
//     //             <p>Profile</p>
//     //         </MenuItem>
//     //     </Menu>
//     // );
//
//     render(){
//         const { classes } = this.props;
//
//     return (
//         <div className={classes.grow}>
//             <AppBar position="static" className={classes.hero}>
//                 <Toolbar>
//                     <IconButton
//                         edge="start"
//                         className={classes.menuButton}
//                         color="inherit"
//                         aria-label="open drawer"
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography className={classes.title} variant="h6" noWrap>
//                         In Tech We Trust
//                     </Typography>
//                     <div className={classes.search}>
//                         <div className={classes.searchIcon}>
//                             <SearchIcon />
//                         </div>
//                         <InputBase
//                             placeholder="Search…"
//                             classes={{
//                                 root: classes.inputRoot,
//                                 input: classes.inputInput,
//                             }}
//                             inputProps={{ 'aria-label': 'search' }}
//                         />
//                     </div>
//                     <div className={classes.grow} />
//                     <div className={classes.sectionDesktop} >
//                         <Grid container spacing={2}>
//                             <Grid item>
//                         <Button
//                             variant="contained"
//                             className={classes.button}
//                             startIcon={<Person />}
//                         >
//                             <Typography className={classes.menuButton}>
//                                 Sign Up
//                             </Typography>
//                         </Button>
//                             </Grid>
//                             <Grid item>
//                         <Button
//                             variant="contained"
//                             color="default"
//                             className={classes.button}
//                             startIcon={<ExitToApp />}
//                         >
//                             <Typography className={classes.menuButton}>
//                                 Log in
//                             </Typography>
//                         </Button>
//                             </Grid>
//                         </Grid>
//
//                         {/*<IconButton*/}
//                         {/*    edge="end"*/}
//                         {/*    aria-label="account of current user"*/}
//                         {/*    aria-controls={this.menuId}*/}
//                         {/*    aria-haspopup="true"*/}
//                         {/*    onClick={this.handleClick}*/}
//                         {/*    color="inherit"*/}
//                         {/*>*/}
//                         {/*    <AccountCircle />*/}
//                         {/*</IconButton>*/}
//                         {/*<Button color="default">*/}
//                         {/*    Log in*/}
//                         {/*</Button>*/}
//                         {/*<Button color="primary">*/}
//                         {/*    Sign up*/}
//                         {/*</Button>*/}
//                     </div>
//                     <div className={classes.sectionMobile}>
//                         <IconButton
//                             aria-label="show more"
//                             aria-controls={this.mobileMenuId}
//                             aria-haspopup="true"
//                             // onClick={handleMobileMenuOpen}
//                             color="inherit"
//                         >
//                             <MoreIcon />
//                         </IconButton>
//                     </div>
//                 </Toolbar>
//             </AppBar>
//             {/*{renderMobileMenu}*/}
//             {this.renderMenu}
//         </div>
//     );
// }
// }
//
// export default withStyles(styles, { withTheme: true })(Header);


import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
//import Link from '@material-ui/core/Link';
import {withStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom'
import {fade} from "@material-ui/core";

const styles = theme => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
});

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    // const classes = useStyles();
    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                {this.props.isLoggedIn ?
                    <Toolbar className={classes.toolbar}>
                        <Button size="small">Create post</Button>
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center" //make it fixed
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            <Link to="/home" style={{textDecoration: 'none', color: 'black'}}>The Blog Inc.</Link>
                        </Typography>
                        <IconButton>
                            <SearchIcon/>
                        </IconButton>

                        <Button size="small" disabled>
                            <Link to="#" style={{textDecoration: 'none', color: 'black'}}>Hi, {this.props.user}</Link>
                        </Button>

                        <Button variant="outlined" size="small">
                            <Link to="/logout" style={{textDecoration: 'none', color: 'black'}}>Sign out</Link>
                        </Button>
                    </Toolbar>
                    :
                    <Toolbar className={classes.toolbar}>
                        <Button size="small">Subscribe</Button>
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            <Link to="/home" style={{textDecoration: 'none', color: 'black'}}>The Blog Inc.</Link>
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>

                        <Button variant="outlined" size="small">
                            <Link to="/register" style={{textDecoration: 'none', color: 'black'}}>Sign up</Link>
                        </Button>

                        <Button variant="outlined" size="small">
                            <Link to="/login" style={{textDecoration: 'none', color: 'black'}}>Sign in</Link>
                        </Button>
                    </Toolbar>
                }
                <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                    {this.props.sections.map((section) => (
                        <Link
                            color="inherit"
                            noWrap
                            key={section.title}
                            variant="body2"
                            href={section.url}
                            className={classes.toolbarLink}
                            style={{textDecoration: 'none', color: 'black'}}
                        >
                            {section.title}
                        </Link>
                    ))}
                </Toolbar>
            </React.Fragment>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Header);

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};
