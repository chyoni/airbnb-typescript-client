import React from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Loader from "src/Components/Loader";
import { useQuery } from "react-apollo-hooks";
import { Heart } from "src/Components/Icons";

const Container = styled.div`
  margin: 0 auto;
  max-width: 1540px;
  margin-top: 50px;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 340px;
  grid-gap: 20px;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 375px;
  min-height: 340px;
  margin-bottom: 10px;
`;

const HostingPic = styled<any>("div")`
  background-image: url(${props => props.src});
  border-radius: 5px;
  width: 360px;
  height: 270px;
  background-position: center;
  background-size: cover;
`;

const HostingMeta = styled.div`
  margin-top: 10px;
  width: 375px;
`;

const Caption = styled.span`
  display: block;
  font-size: 17px;
  font-weight: 600;
  max-width: 375px;
`;

const Location = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.theme.greyColor};
  margin-bottom: 9px;
  max-width: 375px;
`;
const LikeColumn = styled.div`
  display: flex;
  align-items: center;
  margin-top: 7px;
  max-width: 375px;
  svg {
    width: 8px;
    height: 8px;
    fill: ${props => props.theme.greenColor};
  }
`;
const LikeCount = styled.span`
  font-size: 12px;
  margin-left: 4px;
  color: ${props => props.theme.greyColor};
`;

const SEE_FEED = gql`
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

const Feed: React.SFC = () => {
  const { data, loading } = useQuery(SEE_FEED);
  console.log(data);
  return loading ? (
    <Loader />
  ) : (
    data && data.seeFeed && (
      <Container>
        <Grid>
          {data.seeFeed.map(post => (
            <Link key={post.id} to={`/detail/${post.id}`}>
              <Post>
                <HostingPic src={post.thumbNail} />
                <HostingMeta>
                  <Location>{post.location}</Location>
                  <Caption>{post.caption}</Caption>
                  <LikeColumn>
                    <Heart />
                    <LikeCount>{`(${post.likeCount})`}</LikeCount>
                  </LikeColumn>
                </HostingMeta>
              </Post>
            </Link>
          ))}
        </Grid>
      </Container>
    )
  );
};

export default Feed;
