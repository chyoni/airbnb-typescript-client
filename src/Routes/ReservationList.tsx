import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { MY_PROFILE } from "src/Queries.queries";
import { myProfile } from "src/types/api";
import Loader from "src/Components/Loader";
import ReservationCard from "src/Components/ReservationCard";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;
const ReservationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ReservationList: React.SFC = () => {
  const { data, loading } = useQuery<myProfile, null>(MY_PROFILE);

  console.log(data);
  if (loading) {
    return <Loader />;
  } else {
    return (
      <Wrapper>
        <ReservationContainer>
          {data &&
            data.myProfile &&
            data.myProfile.reservations &&
            data.myProfile.reservations.map(reserve => (
              <ReservationCard
                key={reserve.id}
                reserveId={reserve.id}
                postId={reserve.post.id}
                thumbNail={reserve.post.thumbNail}
                caption={reserve.post.caption}
                location={reserve.post.location}
                arriveAt={reserve.arriveAt}
                leaveAt={reserve.leaveAt}
                createdDate={reserve.createdDate}
                createdTime={reserve.createdTime}
                guestCount={reserve.guestCount}
                username={reserve.user.username}
              />
            ))}
        </ReservationContainer>
      </Wrapper>
    );
  }
};

export default ReservationList;
