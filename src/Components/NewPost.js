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
const NewPost = (props) => {
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const onPostTitleChange = (event) => setPostTitle(event.target.value);
    const onPostContentChange = (event) => setPostContent(event.target.value);
    const submitPost = () => {
        fetch("https://severless-socialmedia.anupkashyap.workers.dev/posts", {
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "body": JSON.stringify({

                "id": 1,
                "title": postTitle,
                "postBody":postContent,
                "author": "Anonymous",
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
            else{
                //Error Toast
            }
        });
    }

    return (

        <div>
            <Box sx={style}>
                <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center" }}>
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