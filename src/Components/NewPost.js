import { Button, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Config from './../Config';
const NewPost = (props) => {
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postAuthor, setPostAuthor] = useState("Anonymous");
    const onPostTitleChange = (event) => setPostTitle(event.target.value);
    const onPostContentChange = (event) => setPostContent(event.target.value);
    const onPostAuthorChange = (event) => setPostAuthor(event.target.value);
    const submitPost = () => {
        fetch(Config.api, {
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "body": JSON.stringify({

                "id": uuidv4(),
                "title": postTitle,
                "postBody":postContent,
                "author": postAuthor,
                "timestamp": Date.now(),
                "isLiked": false,
                "isDisliked": false,
                "comments": []

            })
        })
        .then(response=>{
            if(response.ok){
                props.closeNewPostDialog();
                props.reload();
            }
        });
    }

    return (

        <div>
            <Box className="newPost__box">
                <div className="newPost__container">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        New Post
                    </Typography>
                    <IconButton onClick={props.closeNewPostDialog}>
                        <CloseIcon />
                    </IconButton>

                </div>

                <div>
                    <TextField
                        id="outlined-multiline-flexible"
                        placeholder={"Title"}
                        size="small"
                        onChange={(event) => onPostTitleChange(event)}
                        style={{ "width": "100%" }}
                    />
                </div>

                <TextField
                    id="outlined-multiline-flexible"
                    multiline
                    rows={8}
                    size="large"
                    onChange={(event) => onPostContentChange(event)}
                    style={{ "width": "100%", height: "30vh" }}
                />
                <div>
                    <TextField
                        id="outlined-multiline-flexible"
                        placeholder={"Post as"}
                        size="small"
                        onChange={(event) => onPostAuthorChange(event)}
                        style={{ "width": "100%" }}
                    />
                </div>
                <Button
                    style={{ "float": "right" }}
                    onClick={submitPost}>
                    Post!
                </Button>
            </Box>

        </div>
    );
};

export default NewPost;