import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

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
            chips: [
                    { key: 0, label: 'Angular' },
                    { key: 1, label: 'jQuery' },
                    { key: 2, label: 'Polymer' },
                    { key: 3, label: 'React' },
                    { key: 4, label: 'Vue.js' },
            ]
        };
    }

    setChipData(chips) {
        this.setState({
            chips: chips,
        });
    }

    handleDelete = (chipToDelete) => () => {
        //this.setState({chips: (chips) => chips.filter((chip) => chip.key !== chipToDelete.key)});
        console.log(chipToDelete);
    };

    render() {
        const {classes} = this.props;
        const {chips} = this.state;

        return (
            <Paper component="ul" className={classes.root}>
                {chips.map((data) => {
                    console.log(data);
                    let icon;
                    if (data.label === 'React') {
                        icon = <TagFacesIcon/>;
                    }

                    return (
                        <li key={data.key}>
                            <Chip
                                icon={icon}
                                label={data.label}
                                onDelete={this.handleDelete(data)}
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