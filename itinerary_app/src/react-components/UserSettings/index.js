import React from "react";
import Container from "@material-ui/core/Container";
import "./styles.css" ;
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import {ArrowForwardIos} from "@material-ui/icons";
import UserSettingsChange from "../UserSettingsChange";
import Header from "../Header";
import {
    getUserForSettings,
    getUsers, updateUserInfo
} from "../../actions/user";


class UserSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userList: [], userId: null, file: "", imagePreviewUrl:"./../SearchPics/profilePic1.jpeg",
            user: null,
            value: "",
            loaded: false,
            userKeys: null
        };
        this.handleImageUpload = this.handleImageUpload.bind(this);

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
        this.handleSettingsChange = this.handleSettingsChange.bind(this);
        this.handleClickAccept = this.handleClickAccept.bind(this);
    }

    handleImageUpload(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
        console.log(this.state.file);
        console.log(this.state.imagePreviewUrl);
        console.log(reader)
    }

    //for dialog form
    handleClickOpen(i){
        const user = this.state.user;
        user["open"][i] = true;
        this.setState({user});
    }
    handleClickClose(i){
        const user = this.state.user;
        user["open"][i] = false;
        this.setState({user});
    }
    handleClickAccept(type,i){
        const user = this.state.user;
        user["open"][i] = false;
        user[type] = this.state.value;
        //update in database
        if (type !== "password") {
            const newUpdate = updateUserInfo(type, this.state.value, this.state.userId, this)
        }
        //update in front end
        this.setState({user})
    }
    handleSettingsChange(e){
        this.setState({value:e.target.value})
    }

    componentDidMount(){
        getUsers(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {app} = this.props;
        if(prevState.userList != this.state.userList){
            for (let i = 0; i < this.state.userList.length; i++){
                if(app.state.currentUser == this.state.userList[i].username){
                    getUserForSettings(this, this.state.userList[i]._id)
                    this.setState({userId: this.state.userList[i]._id})
                }
            }
        }
        if(prevState.user != this.state.user) {
            this.setState({userKeys: Object.keys(this.state.user)});
            this.setState({loaded: true})
        }

    }

    render() {
        console.log(this.state)
        return (
            this.state.loaded ?
            <div>
                <Header/>
                <Container maxWidth="md" justify="center">
                    <div className={"settings__body"}>
                        <h1 className={"settingsHeader"}> Settings</h1>

                        <Grid container  alignItems="center" spacing={1}>
                            <Grid item xs={3} >

                                <Card  >
                                    <input className={"imageUpload"}
                                        accept="image/*"
                                        id="contained-button-file"
                                        type="file"
                                           onChange={this.handleImageUpload}
                                    />

                                    <CardActionArea>
                                        <label htmlFor="contained-button-file">
                                            <CardMedia className={"profilePic"}
                                                component="img"
                                                alt="profile picture"
                                                defaultValue={this.state.imagePreviewUrl}
                                                image={this.state.imagePreviewUrl}
                                                title="profile picture"
                                            />

                                            <CardContent className={"changePictureText"}>
                                                <Typography className={"changePictureTextTypography"} variant="caption" align-text="center" component="p">
                                                    Change profile picture
                                                </Typography>
                                            </CardContent>
                                        </label>
                                    </CardActionArea>

                                </Card>

                            </Grid>

                            <Grid className={"editSettings"} item container xs={9} direction="column"  spacing={1}>

                                    <Button onClick={() => this.handleClickOpen(0)}>
                                        <Grid item container xs={12} direction={"row"}>
                                            <Grid className={"settingInfo"} item xs={3} >
                                                Change First Name
                                            </Grid>
                                            <Grid item xs={8} >
                                                {this.state.user[this.state.userKeys[0]]}

                                            </Grid>
                                            <Grid className={"arrowIcon"} item xs={1} float={"right"}>
                                                <ArrowForwardIos />
                                            </Grid>
                                        </Grid>
                                    </Button>
                                    <Button onClick={()=>this.handleClickOpen(1)}>
                                        <Grid  item container xs={12} direction={"row"} >
                                            <Grid className={"settingInfo"} item xs={3} >
                                                Change Last Name
                                            </Grid>
                                            <Grid item xs={8} >
                                                {this.state.user[this.state.userKeys[1]]}
                                            </Grid>
                                            <Grid className={"arrowIcon"} item xs={1} float={"right"}>
                                                <ArrowForwardIos />
                                            </Grid>
                                        </Grid>
                                    </Button>
                                    <Button onClick={()=>this.handleClickOpen(2)}>
                                        <Grid  item container xs={12} direction={"row"} >
                                            <Grid className={"settingInfo"} item xs={3} >
                                                Change Email Address
                                            </Grid>
                                            <Grid item xs={8} >
                                                {this.state.user[this.state.userKeys[2]]}
                                            </Grid>
                                            <Grid className={"arrowIcon"} item xs={1} float={"right"}>
                                                <ArrowForwardIos />
                                            </Grid>
                                        </Grid>
                                    </Button>
                                    <Button onClick={()=>this.handleClickOpen(3)}>
                                        <Grid  item container xs={12} direction={"row"} >
                                            <Grid className={"settingInfo"} item xs={3} >
                                                Change Password
                                            </Grid>
                                            <Grid item xs={8} >
                                                <InputBase
                                                    className={"passwordInput"}
                                                    disabled
                                                    defaultValue="Naked input"
                                                    type={"password"}
                                                    inputProps={{ 'aria-label': 'naked' }}
                                                    size={"small"}
                                                />
                                            </Grid>
                                            <Grid className={"arrowIcon"} item xs={1} float={"right"}>
                                                <ArrowForwardIos />
                                            </Grid>
                                        </Grid>
                                    </Button>
                            </Grid>

                        </Grid>
                    </div>

                </Container>

                <UserSettingsChange type= {this.state.userKeys[0]} value={this.state.user[this.state.userKeys[0]]} open={this.state.user[this.state.userKeys[4]][0]}
                                    handleClose={()=>this.handleClickClose(0)}
                                    handleAccept={() => this.handleClickAccept(this.state.userKeys[0],0)}
                                    handleSettingsChange={this.handleSettingsChange}/>
                <UserSettingsChange type= {this.state.userKeys[1]} value={this.state.user[this.state.userKeys[1]]} open={this.state.user[this.state.userKeys[4]][1]}
                                    handleClose={()=>this.handleClickClose(1)}
                                    handleAccept={() => this.handleClickAccept(this.state.userKeys[1],1)}
                                    handleSettingsChange={this.handleSettingsChange}/>
                <UserSettingsChange type= {this.state.userKeys[2]} value={this.state.user[this.state.userKeys[2]]} open={this.state.user[this.state.userKeys[4]][2]}
                                    handleClose={()=>this.handleClickClose(2)}
                                    handleAccept={() => this.handleClickAccept(this.state.userKeys[2],2)}
                                    handleSettingsChange={this.handleSettingsChange}/>
                <UserSettingsChange type= {this.state.userKeys[3]} value={this.state.user[this.state.userKeys[3]]} open={this.state.user[this.state.userKeys[4]][3]}
                                    handleClose={()=>this.handleClickClose(3)}
                                    handleAccept={() => this.handleClickAccept(this.state.userKeys[3],3)}
                                    handleSettingsChange={this.handleSettingsChange}/>

            </div> : null
        );
    };
}
export default UserSettings;