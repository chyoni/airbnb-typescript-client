import React from "react";
import styled from "styled-components";
import Loader from "src/Components/Loader";
import { useQuery } from "react-apollo-hooks";
import { SEE_FEED } from "src/Queries.queries";
import GridPost from "src/Components/GridPost";

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
  @media (min-width: 1530px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 766px) and (max-width: 1529px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 765px) {
    grid-template-columns: repeat(1, 1fr);
  }
  grid-template-rows: 340px;
  grid-gap: 20px;
`;

const Feed: React.SFC = () => {
  const { data, loading } = useQuery(SEE_FEED);
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Grid>
        {data &&
          data.seeFeed &&
          data.seeFeed.map(post => (
            <GridPost
              key={post.id}
              id={post.id}
              thumbNail={post.thumbNail}
              caption={post.caption}
              location={post.location}
              likeCount={post.likeCount}
            />
          ))}
      </Grid>
    </Container>
  );
};

export default Feed;
