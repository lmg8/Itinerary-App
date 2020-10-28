import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1
}
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
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