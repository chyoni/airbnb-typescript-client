import React from "react";
import styled from "styled-components";
import { Heart } from "./Icons";
import { Link } from "react-router-dom";

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

interface IProps {
  id: string;
  thumbNail: string;
  caption: string;
  location: string;
  likeCount: number;
}

const GridPost: React.SFC<IProps> = ({
  id,
  thumbNail,
  caption,
  location,
  likeCount
}) => {
  return (
    <Link key={id} to={`/detail/${id}`}>
      <Post>
        <HostingPic src={thumbNail} />
        <HostingMeta>
          <Location>{location}</Location>
          <Caption>{caption}</Caption>
          <LikeColumn>
            <Heart />
            <LikeCount>{`(${likeCount})`}</LikeCount>
          </LikeColumn>
        </HostingMeta>
      </Post>
    </Link>
  );
};

export default GridPost;
