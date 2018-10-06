import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import * as authorService from '../../services/author'


class CreateAcct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            name: '',
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    componentDidMount() {


    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
            let author = {};
            author.name = this.state.name;
            author.email = this.state.email;
            author.password = this.state.password;
            author.bio = 'WordsWordsWordsWordsWordsWordsWordsWordsWordsWordsWordsWordsWordsWordsWordsWordsWordsWordsWordsWords';
            let results = await authorService.insert(author);
            this.setState({ redirect: true });

        } catch (error) {
            console.log(error);
        }
    }

    handleNameChange(e) {
        let value = e.target.value;
        this.setState({ name: value });
    }

    handleEmailChange(e) {
        let value = e.target.value;
        this.setState({ email: value });
    }

    handlePasswordChange(e) {
        let value = e.target.value;
        this.setState({ password: value });
    }



    render() {
        const { redirect } = this.state;

        if (redirect) {
            return (
                <Redirect to={'/login'} />
            );
        }

        return (
            <Fragment>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input id="name" className="form-control" type="text" onChange={this.handleNameChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input id="email" className="form-control" type="email" onChange={this.handleEmailChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input id="password" className="form-control" type="password" onChange={this.handlePasswordChange} required />
                            </div>
                            <input type="submit" value="Create" className="btn btn-primary btn-block" />
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default CreateAcct;