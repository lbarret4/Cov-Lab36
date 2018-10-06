import React, { Component, Fragment } from 'react';
import Card from './Card';
import * as blogsService from '../services/blogs';
import * as blogtagsService from '../services/blogtags';
import BlogEdit from './BlogEdit';
import { isLoggedIn } from '../services/user';
import IndeterminateProgress from './utilities/indeterminateProgress';
import { Redirect } from 'react-router-dom';



class BlogCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blog: {},
            tags: [],
            hasLoaded: false
        };
        this.handlesDelete = this.handlesDelete.bind(this);
    }


    async componentDidMount() {
        let id = this.props.match.params.id;
        try {
            let [data1, data2] = await Promise.all([blogsService.one(id), blogtagsService.one(id)]);
            this.setState({
                blog: await data1,
                tags: await data2,
                hasLoaded :true
            });
        } catch (error) {
            console.log(error);
        }



    }

    async handlesDelete(e) {
        e.preventDefault();
        let id = this.props.match.params.id;
        try {
            let results = await blogsService.destroy(id);
            this.props.history.replace('/')
        } catch (error) {
            console.log(error);
        }

    }

    render() {
        let { blog, tags, hasLoaded } = this.state;
      
        if (!hasLoaded) {
            return <IndeterminateProgress />;
        } 


        let Btn = (<Fragment><button type="button" class="btn btn-outline-danger mx-1" onClick={this.handlesDelete}>Delete</button><button type="button" class="btn btn-outline-primary mx-1" data-toggle="modal" data-target="#blogModal">Edit</button></Fragment>);
        let tagList = tags.map((tag, index) => {
            if (tags.length !== 0) {
                return (
                    <label className={`badgeMod badge-info mx-2 my-1`} key={tag['_created']}>{tag.name}</label>);
            } else {
                return;
            }
        });
        let header = (
            <div className='row'>
                <div className='col'></div>
                <div className='col'> {blog.title}</div>
                <div className='col d-flex justify-content-end'>{isLoggedIn() ? Btn : ''}</div>
            </div>);
        let body = (<Fragment>
            <span className="text-right  text-muted d-block">
                { blog.date ? `${blog.date.toLocaleDateString()} by ${blog.author}`:''}</span>
            {blog.content}
        </Fragment>);
        let footer = (tagList.length !== 0 ? <Fragment><span className="d-block col-12"> Tags:</span> <span className="ml-2 form-inline">{tagList}</span></Fragment> : '');

        return (
            <Fragment>
                < Card header={header} body={body} footer={footer} />
                <div class="modal fade" id="blogModal" tabindex="-1" role="dialog" aria-labelledby="chirpsModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <BlogEdit edit={true} blog={blog} tags={tagList} location={this.props.location} id={this.props.match.params.id} />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default BlogCard;