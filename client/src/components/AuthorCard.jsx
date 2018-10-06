import React, { Component, Fragment } from 'react';
import Card from './Card';
import * as authorService from '../services/author'
class AuthorCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authors: []
        }
    }
    async componentDidMount() {
        try {
            let data = await authorService.all();
            data = await data.map((item) => {
                item.date = new Date(item['_created']);
                delete item["_created"];
                return (item);
            });
            this.setState({
                authors: data
            });
        } catch (error) {

        }

    }

    render() {
        let { authors } = this.state;
        let h1 = <h1 className='display-4'>Authors</h1>;
        let list = authors.map((author) => {
            return (
                <div className='list-group col-md-6 mb-4'>
                    <li className="list-group-item shadow" key={author.date}>
                    <div className="d-flex flex-row align-items-center mb-2">
                        <img class=" card card-img-left" src="http://via.placeholder.com/100x100" alt="Thumbnail [100x150]"></img>
                        <h3 className="mx-2 d-inline">{author.name}</h3>
                        </div>
                        <div className="d-flex flex-column">                            
                            <p>{author.name}'s Bio:</p>
                            <p>{author.bio}</p>
                        </div>
                    </li>
                </div>
            );
        });
        let ul = <ul className="row">{list} </ul>;


        return (
            <Fragment>
                < Card header={h1} body={ul} />
            </Fragment>
        );
    }


}

export default AuthorCard;