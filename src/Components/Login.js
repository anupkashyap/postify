import { Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 2,
};
export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "Anonymous",

        }
    }
    onUserChange = (event) => this.setState({ ...this.state, user: event.target.value })
    changeUser = () => {
        this.props.login(this.state.user);
        this.props.closeDialog();
    }
    render() {
        return (
            <div>
                <div>
                    <Box sx={style}>
                        <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center" }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Login as
                            </Typography>
                            <IconButton onClick={this.props.closeNewPostDialog}>
                                <CloseIcon />
                            </IconButton>

                        </div>

                        <div>
                            <TextField
                                id="outlined-multiline-flexible"
                                placeholder={"Anonymous"}
                                size="small"
                                onChange={(event) => this.onUserChange(event)}
                                style={{ "width": "100%" }}
                            />
                        </div>


                        <Button
                            style={{ "float": "right" }}
                            onClick={this.changeUser}
                        >
                            Login
                        </Button>
                    </Box>

                </div>

            </div>
        );
    }
}