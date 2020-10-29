import React from "react";
import { AppBar, Toolbar, Typography, InputBase, Theme} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import InfoIcon from '@material-ui/icons/Info';
import "./styles.css"


const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1
},
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar className="header-appbar" position="static">
      <Toolbar>
        <Typography className={classes.typographyStyles}>
          Title
        </Typography>
        <InfoIcon />
      </Toolbar>
    </AppBar>
    
    );
};

export default Header;