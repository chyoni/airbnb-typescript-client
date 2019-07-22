import React from "react";
import styled from "styled-components";
import Theme from "src/Styles/Theme";
import { Close } from "./Icons";
import Input from "./Input";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
`;

const Popup = styled.div`
  border: ${Theme.boxBorder};
  background-color: ${Theme.whiteColor};
  border-radius: 10px;
  margin-top: 150px;
  width: 350px;
  height: 200px;
`;

const Header = styled.div`
  padding: 10px;
  display: flex;
  width: 100%;
  align-items: center;
  border-bottom: ${Theme.boxBorder};
`;
const TitleBox = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CloseBox = styled.div`
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Title = styled.span`
  font-size: 16px;
  font-weight: 600;
  font-family: "Sunflower", sans-serif;
  color: ${Theme.blackColor};
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 100%;
  div {
    &:first-child {
      margin-bottom: 10px;
    }
  }
`;
const Column = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Price = styled.span`
  font-size: 15px;
  font-weight: 600;
  margin-right: 15px;
`;
const PriceInput = styled(Input)`
  padding: 5px;
  &::placeholder {
    font-size: 14px;
  }
`;
const Unit = styled.span`
  font-size: 14px;
  color: ${Theme.greyColor};
`;
const RefetchButton = styled.div`
  width: 60px;
  padding: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Theme.blackColor};
  opacity: 0.8;
  color: ${Theme.whiteColor};
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;

interface IProps {
  closePop: () => void;
  handleRefetch: () => void;
  priceGte: any;
  priceLte: any;
}

const PricePopUp: React.SFC<IProps> = ({
  closePop,
  handleRefetch,
  priceGte,
  priceLte
}) => {
  return (
    <Background>
      <Popup>
        <Header>
          <TitleBox>
            <Title>가격 설정</Title>
          </TitleBox>
          <CloseBox onClick={closePop}>
            <Close />
          </CloseBox>
        </Header>
        <Body>
          <Column>
            <Price>최소 가격 👉</Price>
            <PriceInput
              width={"140px"}
              placeholder={"최소 가격(EX:1000)"}
              value={priceGte.valueState}
              onChange={priceGte.onChange}
            />
            <Unit>원</Unit>
          </Column>
          <Column>
            <Price>최대 가격 👉</Price>
            <PriceInput
              width={"140px"}
              placeholder={"최대 가격(EX:50000)"}
              value={priceLte.valueState}
              onChange={priceLte.onChange}
            />
            <Unit>원</Unit>
          </Column>
          <Column>
            <RefetchButton onClick={handleRefetch}>검색</RefetchButton>
          </Column>
        </Body>
      </Popup>
    </Background>
  );
};

export default PricePopUp;
