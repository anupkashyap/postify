import { Modal} from '@mui/material';
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
      loginDialogOpen:false,
      feedData: []
    }
    
  }
  componentDidMount(){
    this.fetchData();
  }
  fetchData=()=> {
    fetch("https://severless-socialmedia.anupkashyap.workers.dev/posts", {
      "method": "GET",
      "Referrer-Policy": "no-referrer"
    })
      .then(response => response.json())
      .then(json => {
        this.setFeedData(json.sort((a,b)=>{
          return new Date(a.timeStamp) -new Date(b.timeStamp);
        }));
      })
      .catch(err => console.log(err));
  }
  openNewPostDialog = () => this.setState({ ...this.state, newPostModalOpen: true });
  closeNewPostDialog = () => this.setState({ ...this.state, newPostModalOpen: false });
  setFeedData = (data) => this.setState({ ...this.state, feedData: data },()=>console.log(this.state));
  
  render() {
    return (
      <div className="App">
        <Header openNewPostDialog={this.openNewPostDialog} openLoginDialog={this.openLoginDialog}/>
        <Feed data={this.state.feedData} />
        <Modal
          open={this.state.newPostModalOpen}
        >
          <NewPost currentUser={this.state.currentUser} closeNewPostDialog={this.closeNewPostDialog} reload={this.fetchData}/>
        </Modal>
        
      </div>
    );
  }
}
