import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
//import Link from '@material-ui/core/Link';
import {withStyles} from "@material-ui/core/styles";
import {Link, Redirect} from 'react-router-dom'
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
        // '&:hover': {
        //     backgroundColor: fade(theme.palette.common.white, 0.25),
        // },
        // marginLeft: 0,
        // width: '100%',
        // [theme.breakpoints.up('sm')]: {
        //     marginLeft: theme.spacing(1),
        //     width: 'auto',
        // },
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
        this.state = {
            inputText: '',
        };
    }

    onChange = e => this.setState({...this.state, [e.target.name]: e.target.value});

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state.inputText);


        this.setState ({
            query: this.state.inputText
        });

    };

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                {this.props.isLoggedIn ?
                    <Toolbar className={classes.toolbar}>
                        <Button size="small" >
                            <Link
                                style={{textDecoration: 'none', color: 'black'}}
                                to={{
                                pathname: '/new-post',
                                state: {
                                    userId: this.props.userId
                                }}
                            }> Create post </Link>
                        </Button>
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center" //make it fixed
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            <Link to="/home" style={{textDecoration: 'none', color: 'black', marginLeft: '17%'}}>The Blog Inc.</Link>
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <form onSubmit={() => this.onSubmit}>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    type='text'
                                    name='inputText'
                                    value={this.state.inputText}
                                    onChange={this.onChange}
                                />


                            </form>
                        </div>

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
                            <Link to="/home" style={{textDecoration: 'none', color: 'black', marginLeft: '17%'}}>The Blog Inc.</Link>
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <form onSubmit={this.onSubmit}>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                type='text'
                                name='inputText'
                                value={this.state.inputText}
                                onChange={this.onChange}
                            />


                            </form>
                        </div>

                        <Button variant="outlined" size="small">
                            <Link
                                style={{textDecoration: 'none', color: 'black'}}
                                to={{
                                    pathname: `/search/${this.state.inputText}`,
                                    state: {
                                        query: this.state.inputText
                                    }}}
                            >Search</Link>
                        </Button>

                        {/*<Button variant="outlined" size="small">*/}
                        {/*    <Link to="/register" style={{textDecoration: 'none', color: 'black'}}>Sign up</Link>*/}
                        {/*</Button>*/}

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
