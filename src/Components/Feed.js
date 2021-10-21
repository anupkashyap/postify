import Post from './Post';
import React from 'react';
export default class Feed extends React.Component {
    constructor(props) {
        super();
        this.state = { data: props.data }
    }


    //Update compoenent when the data is refreshed
    componentWillReceiveProps(props) {
        this.setState({ ...this.state, data: props.data })
    }


    render() {
        return (
            <div>
                
                {this.state.data.map(post =>
                    <div>
                        <Post post={post} reload={this.props.reload} filterByAuthor={this.props.filterByAuthor} key={post.id} />
                    </div>)}
            </div>

        );
    }
}