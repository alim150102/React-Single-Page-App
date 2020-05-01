import React from 'react'
import Axios from 'axios'
import Post from '../../components/Post/Post'
import './Posts.css'

class Posts extends React.Component{
    state ={
        posts : [],
        selectedId : null,
        error : false
    }

    componentDidMount(){
        Axios.get(`/posts`)
        .then(response => {
            const updatePosts = response.data.slice(0, 4)
            .map(post => {
                return{
                    ...post,author : 'ali'
                }
            })
            this.setState({posts : updatePosts})
            console.log(updatePosts)
        }).catch(error => {
            this.setState({error : true})
        })
    }

    postSelectHandler = id =>{
        this.setState({selectedId : id})
    }

    render(){
        let posts = <p style={{textAlign : "center"}}>Somthing Went Wrong</p>

        if (!this.state.error) {
             posts = this.state.posts.map(post => {
                return <Post 
                key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={()=> this.postSelectHandler(post.id)}
                />
            })
        
        }

        return(
            <div>
                <section className="Posts">
                    {posts}
                </section>
            </div>
        )
    }
}

export default Posts