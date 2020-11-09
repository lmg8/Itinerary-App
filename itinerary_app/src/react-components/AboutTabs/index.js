import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles, withTheme } from "@material-ui/core/styles";

import Faqs from '.././FAQs';

import "./styles.css";

const styles = (theme) => ({
    root: {
        width: 1000,
        position: 'relative',
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    dir: PropTypes.node.isRequired,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

class AboutTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 0};

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIndex = this.handleChangeIndex.bind(this);
    }

    handleChange(event, value) {
        this.setState({value});
    }

    handleChangeIndex = (index) => {
        this.setState({value: index});
    };

    render() {
        const {classes, theme} = this.props;
        return (
            <div className={classes.root}>
                <AppBar className="aboutappbar" position="relative" color="default">
                    <Tabs
                        className={"abouttabs"}
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        backgroundcolor={"transparent"}
                    >
                        <Tab label="About Us" {...a11yProps(0)} />
                        <Tab label="FAQs" {...a11yProps(1)} />
                        <Tab label="Dev Notes" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    className="abouttabs__swipeable"
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabPanel value={this.state.value} index={0} dir={theme.direction}>
                        We are a small team of web developers that love to travel and found that there was not a sufficient website
                        that allowed us to share our itineraries with our friends. So we took it upon ourselves to make a lightweight
                        application that would allow others that want to share their itineraries with their friends. This makes it easier
                        for friends to stay connected and plan trips out in the future.

                    </TabPanel>
                    <TabPanel value={this.state.value} index={1} dir={theme.direction}>
                        <Faqs/>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2} dir={theme.direction}>
                        Version 0.1:
                        Rough version of application created.
                    </TabPanel>
                </SwipeableViews>
            </div>
        );

    }
}

AboutTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme:true})(AboutTabs);
