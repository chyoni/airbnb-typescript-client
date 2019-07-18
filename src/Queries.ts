import { gql } from "apollo-boost";

export const IS_LOGGEDIN = gql`
  {
    isLoggedIn @client
  }
`;

export const SEE_POST_LOGOUT = gql`
  query seeFullPost($postId: String!) {
    seeFullPost(postId: $postId) {
      ok
      error
      post {
        id
        thumbNail
        caption
        location
        host {
          id
          avatar
          username
        }
        likeCount
        commentCount
        comments {
          id
          text
          user {
            id
            username
            avatar
          }
          createdDate
          createdTime
        }
        maxPeopleCount
        checkIn
        checkOut
        price
        createdDate
        createdTime
      }
    }
  }
`;

export const SEE_POST_LOGIN = gql`
  query seeFullPost($postId: String!) {
    seeFullPost(postId: $postId) {
      ok
      error
      post {
        id
        thumbNail
        caption
        location
        host {
          id
          avatar
          username
          isSelf
        }
        isLiked
        likeCount
        commentCount
        comments {
          id
          text
          user {
            id
            username
            avatar
          }
          createdDate
          createdTime
        }
        maxPeopleCount
        checkIn
        checkOut
        price
        createdDate
        createdTime
      }
    }
  }
`;
