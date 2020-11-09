import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles} from "@material-ui/core/styles";


const styles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

class Faqs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {expanded: false};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (panel) => (event, isExpanded) => {
        isExpanded ? this.setState({ expanded: panel}) : this.setState({ expanded: false })
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Accordion expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>What is this?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            A website that lets you share your trip itineraries with others!
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={this.state.expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography className={classes.heading}>What kind of users are on here?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Anyone that you want to plan a trip with!
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={this.state.expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography className={classes.heading}>How do I get started?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Sign up on the top right!
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={this.state.expanded === 'panel4'} onChange={this.handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography className={classes.heading}>Is my personal data being collected?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Not necessarily. The only data we store is the information that you provide us.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }

};
export default withStyles(styles)(Faqs);
