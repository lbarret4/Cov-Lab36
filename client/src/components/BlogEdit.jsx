
import React, { Component, Fragment } from 'react';
import Tags from './Tags';
import { Redirect } from 'react-router-dom';
import * as blogsService from '../services/blogs';
import * as blogtagsService from '../services/blogtags';
import * as userService from '../services/user';
class BlogEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        if (this.props.edit) {
            this.state.title = null;
            this.state.content = null;

        }
        this.handlesEdit = this.handlesEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlesClose = this.handlesClose.bind(this);
    }

    componentDidMount(){
        if (this.props.edit && this.props.blog && this.state.title === null && this.state.content === null) {
            this.setState({
                title: this.props.blog.title,
                content: this.props.blog.content
            })
        }

    }

    handleSubmit(e) {

        let tags = []
        let blog = {};
        for (let item of e.target) {
            if (item.type === 'checkbox' && item.checked && item.name !== 'other') tags.push(item.id);
            if (item.type === 'text' && item.name !== 'otherText') blog.title = item.value;
            if (item.type === 'textarea') blog.content = item.value;
        }
        e.preventDefault();
        if (this.props.edit) {
            this.edit([...tags], blog, this.props.id);
            this.setState({
                redirect: true
            });
        } else {
            this.post([...tags], blog);
            this.props.history.replace('/',{ fromPost: true })
        }
        
      

    }

    handlesEdit(e) {
        let target = e.target;
        if (target.type === 'text') {
            this.setState({
                title: target.value
            });
        } else if (target.type === 'textarea') {
            this.setState({
                content: target.value
            });
        }
    }

    handlesClose(e) {
        e.preventDefault();
        if (!this.props.edit) {
            this.props.history.push('/');
        }

    }
    async post(tags, blog) {
        alert('submitted post');
        try {
            let res1 = await userService.me();
            blog.authorid = await res1.id;
            let res2 = await blogsService.insert(blog);
            let id = await res2.id;            
           
            
            tags.forEach(async (element) => {
                let blogTag = {};
                blogTag.blogid = id;
                blogTag.tagid = element;
                let res3 = await blogtagsService.insert(blogTag);
            });
        } catch (error) {
            console.log(error);
        }




    }

    async edit(tags, blog, id) {
        alert('submitted changes to post');
        try {
            let res1 = await blogsService.update(id, blog);
            await blogtagsService.destroy(id);
            tags.forEach(async (element) => {
                let blogTag = {};
                blogTag.blogid = id;
                blogTag.tagid = element;
                let res2 = await blogtagsService.insert(blogTag);
            });

        } catch (error) {

        }

    }




    render() {
        let closeBtn;
        let titleInput;
        let textareaInput;
        let saveBtn;
        if (this.props.edit) {
            closeBtn = <button type="button" className="close" data-toggle="modal" data-target="#blogModal">
                <span ariaHidden="true" >&times;</span>
            </button>;
            saveBtn = <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#blogModal">Save changes</button>;
            titleInput = <input type="text" className="form-control" id="blog_title" placeholder="Blog Title" value={this.state.title} onChange={this.handlesEdit} />;
            textareaInput = <textarea className="form-control" placeholder="Blog" value={this.state.content} onChange={this.handlesEdit} />;

        } else {
            closeBtn = <button type="button" className="close" onClick={this.handlesClose}>
                <span ariaHidden="true">&times;</span>
            </button>;
            saveBtn = <button type="submit" className="btn btn-primary" >Submit post</button>;
            titleInput = <input type="text" className="form-control" id="blog_title" placeholder="Blog Title" />;
            textareaInput = <textarea className="form-control" placeholder="Blog" />;
        }

        return (
            <Fragment>
                {this.state.redirect ? <Redirect push to="/" /> : ' '}

                <div className="modal-content my-1">
                    <div className="modal-header">
                        <h5 className="modal-title">{`${(this.props.edit? "Edit":"Post")} a blog`}</h5>
                        <span>{closeBtn}</span>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                {titleInput}
                            </div>
                            <div className="form-group">
                                {textareaInput}

                            </div>
                            <Tags edit={this.props.edit} tags={this.props.tags} />
                            <div className="modal-footer">
                                {saveBtn}
                            </div>

                        </form>


                    </div>
                </div>
            </Fragment>
        );

    }
}

export default BlogEdit;