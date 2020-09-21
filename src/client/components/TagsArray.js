import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import axios from "axios";
import { Redirect } from 'react-router-dom';
const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
});

class TagsArray extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            currentTag: null,
            isClicked: false
        };
    }

    setChipData(tags) {
        this.setState({
            tags: tags,

        });
    }

    // handleDelete = (tagToDelete) => () => {
    //     //this.setState({chips: (chips) => chips.filter((chip) => chip.key !== chipToDelete.key)});
    //
    //     const { label } = tagToDelete;
    //     let id = this.props.postId;
    //     console.log(id);
    //     axios.post(`/posts/${id}/tags/${label}`).then(res => {
    //         this.setState({
    //             tags: res.data,
    //         });
    //     })
    // };

    onClick = (tag) => () => {
        console.log(tag);
        this.setState({
            currentTag: tag,
            isClicked: true
        })
    };



    render() {
        const {classes} = this.props;
        if(this.state.isClicked){
            return (<Redirect to={`/search/tag/${this.state.currentTag.label}`}/>);
        }


        return (
            <Paper component="ul" className={classes.root}>
                {this.props.tags && this.props.tags.map((data) => {
                    // console.log(data);
                    let icon;
                    if (data.label === 'React') {
                        icon = <TagFacesIcon/>;
                    }

                    return (
                        <li key={data.key}>
                            <Chip
                                color='primary'
                                icon={icon}
                                label={data.label}
                                //onDelete={this.handleDelete(data)}
                                clickable={true}
                                onClick={this.onClick(data)} //try with link
                                className={classes.chip}
                            />
                        </li>
                    );
                })}
            </Paper>
        );
    }
}

export default withStyles(styles, {withTheme: true})(TagsArray);