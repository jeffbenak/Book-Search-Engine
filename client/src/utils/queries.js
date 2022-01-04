import gql from 'graphql-tag';

export const GET_SINGLE_USER = gql`
{
    getSingleUser {
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
`;
