import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
import API from "../../utils/API";
import { Input, FormBtn } from "../../components/Form";
import { Container, Col, Row } from "../../components/Grid";
import { List, ListItem } from "../../components/List";


class Search extends Component {
    state = {
        books: [],
        bookSearch: ""
    };

    handleInput = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    saveBook = req => {
        this.state.books.map(book => {
            let newBook = book.volumeInfo;
            console.log(book.id);
            API.saveBook({
                title: newBook.title, 
                author: newBook.authors,
                description: newBook.description,
                link: newBook.infoLink,
                image: newBook.imageLinks.thumbnail
            })
            .then(res => {
                console.log(res);
                return res;
            })
            .catch(err => console.log(err))
        });    
    };

    handleSubmitBook = event => {
        event.preventDefault();
        API.getBooks(this.state.bookSearch)
        .then(res => {
            console.log(res.data.items);
            this.setState({ 
                books: res.data.items
            });
        })
        .then(response => {
            console.log(response);
            this.saveBook();
        })
        .catch(err => console.log(err))
    };

    render() {
        return (
            <div>
                <Navbar />
                <Jumbotron
                    message="Search for Books"
                />
                <Container>
                    <Row>
                        <Col size="md-12">
                            <form>
                                <Container>
                                    <Row>
                                        <Col size="xs-9 sm-10">
                                            <Input 
                                                name="bookSearch"
                                                value={this.state.bookSearch}
                                                onChange={this.handleInput}
                                                placeholder="Search for book by title"
                                            />
                                        </Col>
                                        <Col size="xs-3 sm-2">
                                            <FormBtn onClick={this.handleSubmitBook}></FormBtn>
                                        </Col>
                                    </Row>
                                </Container>
                            </form>
                        </Col>
                    </Row>
                    <br></br>
                    <Container>
                    <h4>Search Results:</h4>
                    <br></br>
                    {this.state.books.length ? (
                        <Row>
                        <Col size="xs-12">
                            <List>
                                {this.state.books.map(book => (
                                    <ListItem 
                                        key={book.id}
                                        id={book.id}
                                        title={book.volumeInfo.title}
                                        author={book.volumeInfo.authors}
                                        description={book.volumeInfo.description}
                                        image={book.volumeInfo.imageLinks.thumbnail}
                                        link={book.volumeInfo.infoLink}
                                        buttonName="Save Book"
                                        click={this.handleSaveBook}>
                                    </ListItem>
                                ))}
                            </List>
                        </Col>
                    </Row>
                    ) : (
                        <h5>Please Search for a Book</h5>
                    )}
                    </Container>
                </Container>
            </div>
        )
    };
};

export default Search;