import { gql } from "apollo-boost";

export const REQUEST_SECRET = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email) {
      ok
      error
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $firstName: String!
    $lastName: String!
  ) {
    createAccount(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
    ) {
      ok
      error
    }
  }
`;
export const SEE_FEED = gql`
  query seeFeed {
    seeFeed {
      id
      thumbNail
      caption
      location
      likeCount
      commentCount
    }
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($email: String!, $loginSecret: String!) {
    confirmSecret(email: $email, loginSecret: $loginSecret) {
      ok
      error
      token
    }
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

export const MY_PROFILE = gql`
  query myProfile {
    myProfile {
      id
      username
      avatar
      firstName
      lastName
      fullName
      hostings {
        id
        thumbNail
        caption
        location
        likes {
          id
          user {
            id
            username
            avatar
            fullName
          }
        }
        comments {
          id
          text
          user {
            id
            username
            avatar
            fullName
            createdDate
            createdTime
          }
        }
        isLiked
        likeCount
        commentCount
        maxPeopleCount
        checkIn
        checkOut
        price
        createdDate
        createdTime
      }
      reservations {
        id
        post {
          id
          thumbNail
          caption
          location
        }
        guestCount
        arriveAt
        leaveAt
        createdDate
        createdTime
      }
    }
  }
`;
