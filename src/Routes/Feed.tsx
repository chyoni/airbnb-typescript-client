import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "src/Components/Loader";
import { useQuery } from "react-apollo-hooks";
import { Heart } from "src/Components/Icons";
import { SEE_FEED } from "src/Queries.queries";

const Container = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 1279px) {
    max-width: ${props => props.theme.maxWidth};
  }
  @media (max-width: 1278px) {
    max-width: 900px;
  }
`;

const Grid = styled.div`
  display: grid;
  @media (min-width: 1279px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1278px) {
    grid-template-columns: repeat(2, 1fr);
  }
  grid-template-rows: 340px;
  grid-gap: 20px;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 360px;
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
  width: 360px;
`;

const Caption = styled.span`
  display: block;
  font-size: 17px;
  font-weight: 600;
  max-width: 360px;
`;

const Location = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.theme.greyColor};
  margin-bottom: 9px;
  max-width: 360px;
`;
const LikeColumn = styled.div`
  display: flex;
  align-items: center;
  margin-top: 7px;
  max-width: 360px;
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
