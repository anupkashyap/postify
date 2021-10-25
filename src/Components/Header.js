import './../Styles/Header.css';
import React from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { IconButton, Typography } from '@mui/material';

const Header = (props) => {
    return (
        <div style={{ "display": "flex", "justifyContent": "space-around" }}>
            <div className="header" >
                <h2 className="header__title">Postify</h2>
                <div>
                    <IconButton onClick={props.openNewPostDialog}>
                        <BorderColorIcon className="header__newPost" />
                        <Typography style={{ "color": "white", "width": "5rem" }}>New Post!</Typography>
                    </IconButton>
                </div>


            </div>
        </div>

    );
};

export default Header;