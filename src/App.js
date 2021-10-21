import { Alert, Button, Modal } from '@mui/material';
import './App.css';
import Feed from './Components/Feed';
import Header from './Components/Header';
import React from 'react';
import NewPost from './Components/NewPost';
import Config from './Config';

export default class App extends React.Component {
  constructor() {
    super();
    //Default state
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

  //API Call
  fetchData = () => {
    fetch(Config.api, {
      "method": "GET",
    })
      .then(response => response.json())
      .then(json => this.setFeedData(json))
      .catch(err => console.log(err));
  }

  //Helpers
  unFilterData = () => this.setState({ ...this.state, feedData: this.state.unFilteredData, isFiltered: false, filteredAuthor: '' });
  openNewPostDialog = () => this.setState({ ...this.state, newPostModalOpen: true });
  closeNewPostDialog = () => this.setState({ ...this.state, newPostModalOpen: false });
  setFeedData = (data) => this.setState({ ...this.state, feedData: data, unFilteredData: data }, () => console.log(this.state));
  filterByAuthor = (author) => {
    var filteredPosts = this.state.feedData.filter(x => x.author == author);
    this.setState({ ...this.state, feedData: filteredPosts, isFiltered: true, filteredAuthor: author });
  }

  render() {
    return (
      <div className="App">
        <Header openNewPostDialog={this.openNewPostDialog} openLoginDialog={this.openLoginDialog} />
        <div>
          {this.state.isFiltered ?
            (
              <div className="app__alertContainer">
                < Alert className="app__alert"
                  action={
                    <Button color="inherit" size="small" onClick={this.unFilterData}>
                      UNFILTER
                    </Button>
                  }
                >
                  Showing posts by {this.state.filteredAuthor}
                </Alert>
              </div>)
            : ''}

        </div>
        {/* Post Feed */}
        <Feed data={this.state.feedData} reload={this.fetchData} filterByAuthor={this.filterByAuthor} />
        <Modal open={this.state.newPostModalOpen}>
          <NewPost currentUser={this.state.currentUser} closeNewPostDialog={this.closeNewPostDialog} reload={this.fetchData} />
        </Modal>

      </div>
    );
  }
}
