import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles, withTheme } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';

import Faqs from '.././Faqs';

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
                        Lorem ipsum dolor sit amet, qui persius complectitur id. Animal erroribus quo te, no pro iudico
                        laudem inermis. Duo ex lorem invidunt salutatus, no eius malorum docendi sit. At atomorum
                        necessitatibus quo, at per quaeque aliquam. Pro ut graecis torquatos, ad nec iuvaret dolores
                        neglegentur. His no civibus deleniti oporteat, sit et patrioque gloriatur disputando.

                        Usu te reque docendi, mel id possit tincidunt. Quo justo consequat reprehendunt ut.
                        Percipit efficiendi eam id. Assum torquatos sea an, eos purto causae eu. Eam dicant perpetua
                        adipiscing te, mentitum copiosae dissentiet quo ne.

                        Vel id autem congue. In diceret blandit vis, eu velit dolorem nec. Primis posidonium efficiantur
                        his cu, porro copiosae ad has. Duo ei perpetua sadipscing. Probo deserunt democritum et ius,
                        mei errem admodum scriptorem at. At duo ubique definitiones, minim suscipiantur mel te.
                        Integre vivendo consequuntur ius ei, nec iuvaret appareat luptatum ex, iusto paulo nonumes
                        has ne.

                        Ei omnis postulant duo, tale postulant id eos. Eu solet vitae hendrerit eos, nec illum
                        dolorem at, case ceteros vix te. Quo in unum illum, id nam vivendum percipitur. Atqui accumsan
                        deserunt sea no, ea eum blandit urbanitas, ex his detracto ocurreret. Ei nonumy oblique
                        adipiscing cum.

                        Et cum graece corrumpit splendide, vitae latine laboramus at nam. Pro an latine feugait, nec
                        \graecis lobortis eu. Ea libris primis definitiones cum, at facilisis complectitur has. Id
                        modus verear imperdiet ius, eos viderer iuvaret legimus eu. Mollis posidonium vim ei.
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1} dir={theme.direction}>
                        <Faqs/>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2} dir={theme.direction}>
                        Lorem ipsum dolor sit amet, qui persius complectitur id. Animal erroribus quo te, no pro iudico
                        laudem inermis. Duo ex lorem invidunt salutatus, no eius malorum docendi sit. At atomorum
                        necessitatibus quo, at per quaeque aliquam. Pro ut graecis torquatos, ad nec iuvaret dolores
                        neglegentur. His no civibus deleniti oporteat, sit et patrioque gloriatur disputando.

                        Usu te reque docendi, mel id possit tincidunt. Quo justo consequat reprehendunt ut.
                        Percipit efficiendi eam id. Assum torquatos sea an, eos purto causae eu. Eam dicant perpetua
                        adipiscing te, mentitum copiosae dissentiet quo ne.

                        Vel id autem congue. In diceret blandit vis, eu velit dolorem nec. Primis posidonium efficiantur
                        his cu, porro copiosae ad has. Duo ei perpetua sadipscing. Probo deserunt democritum et ius,
                        mei errem admodum scriptorem at. At duo ubique definitiones, minim suscipiantur mel te.
                        Integre vivendo consequuntur ius ei, nec iuvaret appareat luptatum ex, iusto paulo nonumes
                        has ne.

                        Ei omnis postulant duo, tale postulant id eos. Eu solet vitae hendrerit eos, nec illum
                        dolorem at, case ceteros vix te. Quo in unum illum, id nam vivendum percipitur. Atqui accumsan
                        deserunt sea no, ea eum blandit urbanitas, ex his detracto ocurreret. Ei nonumy oblique
                        adipiscing cum.

                        Et cum graece corrumpit splendide, vitae latine laboramus at nam. Pro an latine feugait, nec
                        \graecis lobortis eu. Ea libris primis definitiones cum, at facilisis complectitur has. Id
                        modus verear imperdiet ius, eos viderer iuvaret legimus eu. Mollis posidonium vim ei.
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
