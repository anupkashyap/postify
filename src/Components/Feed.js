import { ThermostatOutlined } from '@mui/icons-material';
import React, { Suspense, lazy } from 'react';
const Post= lazy(()=> import('./Post'));

export default class Feed extends React.Component {
    constructor(props){
        super();
        
        this.state={data:props.data}
        console.log("Feed Component Constructor")
        console.log(props.data);
    }

    componentWillReceiveProps(props){
        this.setState({...this.state,data:props.data})
    }
    

    render() {
        // const data = [
        //     {
        //         "id": 1,
        //         "title": "This is a post ",
        //         "postBody": "Many parents worry about how exposure to technology might affect toddlers developmentally. We know our preschoolers are picking up new social andcognitive skills at a stunning pace, and we don’t want hours spent glued to an iPad to impede that. \n\nBut adolescence is an equally important period of rapid development, and too few of us are paying attention to how our teenagers’ use of technology—much more intense and intimate than a 3-year-old playing with dad’s iPhone—is affecting them. In fact, experts worry that the social media and text messages that have become so integral to teenage life are promoting anxiety and lowering self-esteem.",
        //         "author": "Captain America",
        //         "timestamp": "12Nov2021",
        //         "isLiked": false,
        //         "isDisliked": false,
        //         "comments": [
        //             {
        //                 "comment": "This is a comment",
        //                 "author": "Iron Man",
        //                 "timestamp": "12Nov2021"
        //             },
        //             {
        //                 "comment": "This is another comment",
        //                 "author": "Iron Man",
        //                 "timestamp": "12Nov2021"
        //             }
        //         ]
        //     },
        //     {
        //         "id": 1,
        //         "title": "This is another post ",
        //         "postBody": "fsdfsdfsdf dfsdfsd dsfsdf dfdsfsdf sdfdsfds dfsdfds",
        //         "author": "Doctor Strange",
        //         "timestamp": "12Nov2021",
        //         "isLiked": true,
        //         "isDisliked": false,
        //         "comments": [
        //             {
        //                 "comment": "This is a comment",
        //                 "author": "Iron Man",
        //                 "timestamp": "12Nov2021"
        //             },
        //             {
        //                 "comment": "This is another comment",
        //                 "author": "Iron Man",
        //                 "timestamp": "12Nov2021"
        //             }
        //         ]
        //     }
        // ];
        return (
            <div>
                {this.state.data.length==0?
                (
                    <h2>No posts!</h2>
                ):''}

                {console.log(this.state)}
                {this.state.data.map(post =>
                <Suspense fallback={<h1>Loading...</h1>}>
                     <div>
                        <Post post={post} reload={this.props.reload} filterByAuthor={this.props.filterByAuthor} likePost={this.props.likePost} dislikePost={this.props.dislikePost}/>
                    </div>
                </Suspense>
                   

                )}
            </div>

        );
    }
}