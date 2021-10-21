import React from 'react';
import './../Styles/Post.css'

import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { deepOrange } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import CommentsSection from './CommentsSection';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Button } from '@mui/material';
import { render } from '@testing-library/react';


export default class Post extends React.Component {

    constructor() {
        super();
        this.state = {
            isLiked: false,
            isDisliked: false
        }
    }
    onLikeClick=()=>{
        this.setState({...this.state,isLiked:!this.state.isLiked})
    }
    onDislikeClick=()=>{
        this.setState({...this.state,isDisliked:!this.state.isDisliked})
    }
    confirmDeleteOptions = {
        title: 'Delete post',
        message: 'Are you sure you want to delete the post?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => this.deletePost()
            },
            {
                label: 'No',
            }
        ],
        overlayClassName: "overlay-custom-class-name"
    };

    deletePost = () => {
        fetch("https://severless-socialmedia.anupkashyap.workers.dev/posts", {
            "method": "DELETE",
            "headers": {
                "content-type": "application/json"
            },
            "body": "{\"id\":\"" + this.props.post.id + "\"}"
        })
            .then(response => {
                if (response.ok) {
                    this.props.reload();
                }
                else {
                    //Error Toast
                }
            });
    }
    render() {
        return (
            <div className="post">
                <div className="post__container">
                    <div className="post__header">
                        <h3>{this.props.post.title}</h3>
                    </div>
                    <div className="post__author">
                        <Avatar sx={{ bgcolor: deepOrange[500] }} className="post__author__avatar"></Avatar>
                        <Button onClick={() => this.props.filterByAuthor(this.props.post.author)}>
                            <p>{this.props.post.author}</p>
                        </Button>

                    </div>

                    <div className="post__content">
                        <p>
                            {this.props.post.postBody}

                        </p>
                    </div>

                    <div className="post__footer">
                        <div className="post__footer__reactionGroup">
                            <IconButton onClick={this.onLikeClick}>
                                {this.state.isLiked ?
                                    (<ThumbUpIcon className="post__color__blue" />) :
                                    (<ThumbUpIcon className="" />)}

                            </IconButton>
                            <IconButton onClick={this.onDislikeClick}>
                                {this.state.isDisliked ?
                                    (<ThumbDownIcon className="post__color__red" />) :
                                    (<ThumbDownIcon className="" />)}
                            </IconButton>


                        </div>
                        <div className="post__footer__comments">
                            <IconButton onClick={() => confirmAlert(this.confirmDeleteOptions)}>
                                <DeleteIcon />
                            </IconButton>
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

}