import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Mainpage from "./Mainpage";
import Searchpage from "./Searchpage";
import { Route} from "react-router-dom";

class BooksApp extends React.Component {    
    state = {
        books: []
    };
    componentDidMount() {
        BooksAPI.getAll().then(books => {
                this.setState({books});
            });
    }
    moveShelf = (book, shelf) => {
        BooksAPI.update(book, shelf);
        BooksAPI.getAll().then(books => {
                this.setState({books});
            });
    };
    render() {
        return (
            <div className="app">
                <Route
                    exact
                    path="/"
                    render={() => (<Mainpage books={this.state.books} moveShelf={this.moveShelf}/>)}/>
                <Route
                    exact
                    path="/search"
                    render={() => (<Searchpage moveShelf={this.moveShelf} books={this.state.books}/>)}/>
            </div>
        );
    }
}

export default BooksApp;
