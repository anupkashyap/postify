import { Alert, Button, Modal } from '@mui/material';
import './App.css';
import Feed from './Components/Feed';
import Header from './Components/Header';
import React from 'react';
import NewPost from './Components/NewPost';
import Login from './Components/Login';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      newPostModalOpen: false,
      loginDialogOpen: false,
      feedData: [],
      unFilteredData: [],
      isFiltered: false,
      filteredAuthor: ''
    }

  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    fetch("https://severless-socialmedia.anupkashyap.workers.dev/posts", {
      "method": "GET",
      "Referrer-Policy": "no-referrer"
    })
      .then(response => response.json())
      .then(json => {
        this.setFeedData(json.sort((a, b) => {
          return new Date(b.timeStamp) - new Date(a.timeStamp);
        }));
      })
      .catch(err => console.log(err));
  }
  unFilterData = () => {
    this.setState({ ...this.state, feedData: this.state.unFilteredData, isFiltered: false, filteredAuthor: '' });
  }
  openNewPostDialog = () => this.setState({ ...this.state, newPostModalOpen: true });
  closeNewPostDialog = () => this.setState({ ...this.state, newPostModalOpen: false });
  setFeedData = (data) => this.setState({ ...this.state, feedData: data, unFilteredData: data }, () => console.log(this.state));
  filterByAuthor = (author) => {
    var filteredPosts = this.state.feedData.filter(x => x.author == author);
    this.setState({ ...this.state, feedData: filteredPosts, isFiltered: true, filteredAuthor: author });
  }
  likePost = (id) => this.setState({
    ...this.state,
    feedData: this.state.feedData.map(x => {
      if (x.id == id) {
        x.isLiked = x.isLiked
      }
      return x;
    }),
    unFilterData: this.state.unFilteredData.map(x => {
      if (x.id == id) {
        x.isLiked = x.isLiked
      }
      return x;
    })
  });

  dislikePost = (id) => {
    this.setState({
      ...this.state,
      feedData: this.state.feedData.map(x => {
        if (x.id == id) {
          x.isDisliked = x.isDisliked
        }
        return x;
      }),
      unFilterData: this.state.unFilteredData.map(x => {
        if (x.id == id) {
          x.isDisliked = x.isDisliked
        }
        return x;
      })
    });
    console.log("Dislike");
  }



  render() {
    return (
      <div className="App">
        <Header openNewPostDialog={this.openNewPostDialog} openLoginDialog={this.openLoginDialog} />
        <div>
          {this.state.isFiltered ?
            (<Alert
              action={
                <Button color="inherit" size="small" onClick={this.unFilterData}>
                  UNFILTER
                </Button>
              }
            >
              Showing posts by {this.state.filteredAuthor}
            </Alert>)
            : ''}

        </div>
        <Feed data={this.state.feedData} reload={this.fetchData} filterByAuthor={this.filterByAuthor} likePost={this.likePost} dislikePost={this.dislikePost} />
        <Modal
          open={this.state.newPostModalOpen}
        >
          <NewPost currentUser={this.state.currentUser} closeNewPostDialog={this.closeNewPostDialog} reload={this.fetchData} />
        </Modal>

      </div>
    );
  }
}
