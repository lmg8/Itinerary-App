import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class UserSettingsChange extends React.Component {
    render() {
        const {type, value, open, handleSettingsChange, handleClose, handleAccept} = this.props;
        return (
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle className={"DialogTitlePrompt"} text-transform={"uppercase"} id="form-dialog-title">Edit {type}</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="standard-basic"
                            autoFocus
                            margin="dense"
                            label={value}
                            onChange={handleSettingsChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleAccept} color="primary">
                            Accept
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default UserSettingsChange;