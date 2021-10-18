import React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import './../Styles/CommentsSection.css'
import { TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


const CommentsSection = (props) => {
    return (
        <div>
            {props.comments.map(comment =>
                <div className="commentsSection">
                    <div className="commentsSection__offset">

                    </div>
                    {/* <Author author={comment.author} /> */}
                    <div className="commentsSection__comment">
                        <div className="commentsSection__author">
                            <Avatar sx={{ bgcolor: deepOrange[500] }} className="commentsSection__author__avatar"></Avatar>
                            <p>{comment.author}</p>
                        </div>
                        <p className="commentsSection__commentText">
                            {comment.comment}
                        </p>
                        


                    </div>
                </div>

            )}
            <div className="commentsSection__commentInput">
                            <TextField id="standard-basic" 
                                size="small" variant="standard" helperText="Add a comment" fullWidth="true" />
                                <SendIcon></SendIcon>
                        </div>
        </div>
    );
};

export default CommentsSection;