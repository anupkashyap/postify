import React from 'react';
import './../Styles/Post.css'

import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { deepOrange } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import CommentsSection from './CommentsSection';

const Post = (props) => {
    return (
        <div className="post">
            <div className="post__container">
                <div className="post__header">
                    <h3>{props.post.title}</h3>
                </div>
                <div className="post__author">
                    <Avatar sx={{ bgcolor: deepOrange[500] }} className="post__author__avatar"></Avatar>
                    <p>{props.post.author}</p>
                </div>

                <div className="post__content">
                    <p>
                        {props.post.postBody}

                    </p>
                </div>

                <div className="post__footer">
                    <div className="post__footer__reactionGroup">
                        <IconButton>
                            {props.post.isLiked?
                            (<ThumbUpIcon className="post__color__blue" />):
                            (<ThumbUpIcon className="" />)}
                            
                        </IconButton>
                        <IconButton>
                        {props.post.isDisliked?
                            (<ThumbDownIcon className="post__color__red" />):
                            (<ThumbDownIcon className="" />)}
                        </IconButton>


                    </div>
                    <div className="post__footer__comments">
                        <a href="#">Comments ({props.post.comments.length})</a>
                    </div>

                </div>
                <hr />
                {/* <div className="post__commentsSection">
                            <CommentsSection comments={props.post.comments}/>

                </div> */}
            </div>

        </div>
    );
};

export default Post;