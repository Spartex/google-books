import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
import API from "../../utils/API";
import { Container, Col, Row } from "../../components/Grid";
import { List } from "../../components/List"; 

class Saved extends Component {
    state = {
        book: {}
      };

    deleteBook = id => {
    API.deleteBook(id)
        .then(res => this.loadPage())
        .catch(err => console.log(err));
    };

    loadPage = () => {
        window.location.reload();
    }

    render() {
        return (
            <div>
                <Navbar />
                <Jumbotron 
                    message="Saved Books"
                />
                <Container>
                    <h4>Saved Books:</h4>
                    <br></br>
                    {this.state.book.length ? (
                        <Row>
                            <Col size="xs-12">
                                <List>
                                
                                </List>
                            </Col>
                        </Row>
                    ) : (
                        <h5>No Books Have Been Saved Yet. Pleases Select a Book to Save.</h5>
                    )}
                    
                </Container>
            </div>
        )
    }
}

export default Saved;