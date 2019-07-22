import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "src/Queries.queries";
import { searchPost, searchPostVariables } from "src/types/api";
import Loader from "src/Components/Loader";
import GridPost from "src/Components/GridPost";
import Theme from "src/Styles/Theme";
import PricePopUp from "src/Components/PricePopup";
import useInput from "src/Hooks/useInput";

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
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
const RefetchContainer = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PriceSelectButton = styled.div`
  width: 60px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  cursor: pointer;
  border: ${Theme.boxBorder};
  border-radius: 5px;
  color: ${Theme.titleColor};
`;

const Search: React.SFC<RouteComponentProps> = ({ location: { search } }) => {
  const [pricePop, setPricePop] = useState(false);
  const priceGte = useInput("");
  const priceLte = useInput("");
  const [, searchTerm] = search.split("=");
  const term = decodeURI(searchTerm);
  const { data, loading, refetch } = useQuery<searchPost, searchPostVariables>(
    SEARCH,
    {
      variables: { term }
    }
  );
  const handleToggle = () => {
    setPricePop(!pricePop);
  };
  const handleRefetch = async () => {
    await setPricePop(!pricePop);
    refetch({
      term,
      priceGte: parseInt(priceGte.valueState, 10),
      priceLte: parseInt(priceLte.valueState, 10)
    }); // refetch는 컴포넌트 자체를 rerender 하는거 아님 query만 다시 실행하는거 !!!!!!!
  };
  if (loading) {
    return <Loader />;
  } else {
    return (
      <Container>
        <RefetchContainer>
          <PriceSelectButton onClick={handleToggle}>금액</PriceSelectButton>
        </RefetchContainer>
        <Grid>
          {data &&
            data.searchPost &&
            data.searchPost.length > 0 &&
            data.searchPost.map(post => (
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
        {pricePop && (
          <PricePopUp
            closePop={handleToggle}
            handleRefetch={handleRefetch}
            priceGte={priceGte}
            priceLte={priceLte}
          />
        )}
      </Container>
    );
  }
};

export default withRouter(Search);
