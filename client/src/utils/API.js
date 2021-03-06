import axios from "axios";
export default {
    
    getBooks: function(query) {
        return axios.get(`/api/books/${query}`)
    },
    getBook: function(id) {
        return axios.get(`/api/books/${id}`);
    },
    saveBook: function(bookData) {
        console.log(bookData);
        return axios.post("/api/books", bookData);
    },
    deleteBook: function(id) {
        return axios.delete(`/api/books/${id}`);
    }
};