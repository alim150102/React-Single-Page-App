import React, { Component } from 'react';

import './FullPost.css';
import Axios from 'axios';

class FullPost extends Component {

    state ={
        loadedPost : null
    }

    componentDidUpdate(prevProps){
        const postId = this.props.id
        if (prevProps.id !== this.props.id) {
            Axios.get(`/posts/${postId}`)
                .then(response => {
                // console.log(response);
                this.setState({loadedPost : response.data})
            })
        }

        // if (postId) {
        //     // let query = !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== postId)
        //     // console.log(query);
            
        //     if (this.state.loadedPost && this.state.loadedPost.id !== postId) {
                 
        //     }   
        // }
        
    }

    deletePostHandler = () => {
        Axios.delete(`/posts/${this.props.id}`)
        .then(response => {
            console.log(response);
            
        })
    }

    render () {
        let post = <p style={{textAlign : "center"}}>Please select a Post!</p>;

        if (this.props.id) {
            post = <p style={{textAlign : "center"}}>Loading...</p>;
        }

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }
        
        return post;
    }
}

export default FullPost;