import React, { Component, Fragment } from 'react';
import BlogFeed from './BlogFeed';
import * as blogsService from '../services/blogs';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogList: []
        };
    }

    async componentDidMount() {

        try {
            let data1 = await blogsService.all();
            this.setState({
                blogList: await data1
            });
        } catch (error) {
            console.log(error);
        }



    }
     async componentDidUpdate(){        
         if(this.props.location.state&& this.props.location.state.fromPost){
            try {
                let data1 = await blogsService.all();
                this.setState({
                    blogList: await data1
                });
            } catch (error) {
                console.log(error);
            }
    
         }
     }



    render() {
        return (
            <Fragment>
                <main role="main">

                    <BlogFeed blogs={this.state.blogList} />

                </main>

                <footer className="container">
                </footer>
            </Fragment>
        );
    }
}

export default Home;