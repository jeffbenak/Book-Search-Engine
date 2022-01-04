import gql from 'graphql-tag';

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}

`;

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}

`;

export const DELETE_BOOK = gql `
mutation deleteBook($bookId: ID) {
    deleteBook(bookId: $bookId) {
        _id
        username 
        email
        password
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
    }
}

`

export const SAVE_BOOK = gql `
mutation saveBook($bookID: ID, $authors: String!, $description: String!, $image: String, $link: String, $title: String) {
    saveBook(bookID: $bookID, authors: $authors, description: $description, image: $image, link: $link, title: $title) {
        bookId
        authors
        description
        image
        link
        title
    }
}`