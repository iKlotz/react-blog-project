import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

class Sections extends React.Component {
    // const [state, setState] = React.useState({
    //     checkedA: true,
    //     checkedB: true,
    //     checkedF: true,
    //     checkedG: true,
    // });
    constructor(props) {
        super(props);
        this.state = {
            technology: false,
            design: false,
            culture: false,
            business: false,
            politics: false,
            opinion: false,
            science: false,
            health: false,
            style: false,
            travel: false
        };
    }

    handleChange = (event) => {
        this.setState({...this.state, [event.target.name]: event.target.checked});
    };

    render() {

        return (
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.technology}
                            onChange={this.handleChange}
                            name="technology"
                            color="primary"
                        />
                    }
                    label="Technology"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.design}
                            onChange={this.handleChange}
                            name="design"
                            color="primary"
                        />
                    }
                    label="Design"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.culture}
                            onChange={this.handleChange}
                            name="culture"
                            color="primary"
                        />
                    }
                    label="Culture"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.business}
                            onChange={this.handleChange}
                            name="business"
                            color="primary"
                        />
                    }
                    label="Business"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.politics}
                            onChange={this.handleChange}
                            name="politics"
                            color="primary"
                        />
                    }
                    label="Business"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.opinion}
                            onChange={this.handleChange}
                            name="opinion"
                            color="primary"
                        />
                    }
                    label="Opinion"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.science}
                            onChange={this.handleChange}
                            name="science"
                            color="primary"
                        />
                    }
                    label="Science"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.health}
                            onChange={this.handleChange}
                            name="health"
                            color="primary"
                        />
                    }
                    label="Health"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.style}
                            onChange={this.handleChange}
                            name="style"
                            color="primary"
                        />
                    }
                    label="Style"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.travel}
                            onChange={this.handleChange}
                            name="travel"
                            color="primary"
                        />
                    }
                    label="Travel"
                />

            </FormGroup>
        );
    }
}

export default Sections;