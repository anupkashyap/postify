import './../Styles/Header.css';
import React from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { IconButton } from '@mui/material';

const Header = (props) => {
    return (
        <div className="header" >
            <h2 className="header__title">Postify</h2>
            <IconButton>
                <BorderColorIcon className="header__newPost" onClick={props.openNewPostDialog}/>
            </IconButton>

        </div>
    );
};

export default Header;