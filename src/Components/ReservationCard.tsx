import React from "react";
import styled from "styled-components";
import Theme from "src/Styles/Theme";
import { Link } from "react-router-dom";
import Button from "src/Components/Button";
import { useMutation } from "react-apollo-hooks";
import { cancelReservation, cancelReservationVariables } from "src/types/api";
import { CANCEL_RESERVE } from "src/Queries.queries";
import { toast } from "react-toastify";

const ReservationBox = styled.div`
  display: flex;
  margin-bottom: 25px;
  padding: 10px;
  border: ${props => props.theme.boxBorder};
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;
const ReserveImage = styled<any>("div")`
  background-image: url(${props => props.thumbNail});
  background-position: center;
  background-size: cover;
  height: 300px;
  width: 300px;
  margin-right: 15px;
`;
const ReserveInfo = styled.div`
  display: flex;
  flex-direction: column;
  div {
    &:last-child {
      margin-top: 25px;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const InfoTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${Theme.titleColor};
  margin-right: 10px;
`;
const InfoContent = styled.span`
  font-size: 15px;
`;
const Caption = styled.span`
  font-size: 18px;
  font-weight: 600;
`;
const Location = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${Theme.greyColor};
`;
const ThankCard = styled.span`
  font-size: 25px;
  color: ${Theme.redColor};
  font-weight: 600;
  margin-top: 50px;
`;

interface IProps {
  reserveId: string;
  postId: string;
  thumbNail: string;
  caption: string;
  location: string;
  arriveAt: string;
  leaveAt: string;
  createdDate: string | null;
  createdTime: string | null;
  guestCount: number;
  username: string;
}

const ReservationCard: React.SFC<IProps> = ({
  reserveId,
  postId,
  thumbNail,
  caption,
  location,
  arriveAt,
  leaveAt,
  createdDate,
  createdTime,
  guestCount,
  username
}) => {
  const cancelReserveMutation = useMutation<
    cancelReservation,
    cancelReservationVariables
  >(CANCEL_RESERVE);
  const todayDate = new Date();
  const [today] = todayDate.toISOString().split("T");
  const handleCancel = async (): Promise<void> => {
    const [
      cancelMutationFn,
      { loading: cancelLoading }
    ] = cancelReserveMutation;
    const { data: cancelData } = await cancelMutationFn({
      variables: { id: reserveId }
    });
    if (!cancelLoading && cancelData) {
      if (cancelData.cancelReservation.ok) {
        toast.success("예약 취소가 정상 처리되었습니다 😊");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(cancelData.cancelReservation.error);
      }
    } else {
      toast.error("잠시 후 다시시도해주세요 😥");
    }
  };
  return (
    <ReservationBox key={reserveId}>
      <Link to={`/detail/${postId}`}>
        <ReserveImage thumbNail={thumbNail} />
      </Link>
      <ReserveInfo>
        <Column>
          <InfoTitle>숙소명👉</InfoTitle>
          <Caption>{caption}</Caption>
        </Column>
        <Column>
          <InfoTitle>숙소 위치👉</InfoTitle>
          <Location>{location}</Location>
        </Column>
        <Column>
          <InfoTitle>체크인 ㅡ 체크아웃👉</InfoTitle>
          <InfoContent>{`${arriveAt} ㅡ ${leaveAt}`}</InfoContent>
        </Column>
        <Column>
          <InfoTitle>예약 날짜👉</InfoTitle>
          <InfoContent>{`D: ${createdDate} T: ${createdTime}`}</InfoContent>
        </Column>
        <Column>
          <InfoTitle>게스트 인원👉</InfoTitle>
          <InfoContent>{`${guestCount}명`}</InfoContent>
        </Column>
        <Column>
          <InfoTitle>예약자👉</InfoTitle>
          <InfoContent>{username}</InfoContent>
        </Column>
        <ThankCard>💖 WoniBnB에서 감사함을 전합니다 💖</ThankCard>
        {Date.parse(arriveAt) > Date.parse(today) ? (
          <Button
            text={"예약 취소"}
            onClick={handleCancel}
            width={"100px"}
            color={Theme.redColor}
          />
        ) : (
          <Button
            text={"후기 작성"}
            onClick={handleCancel}
            width={"100px"}
            color={Theme.greenColor}
          />
        )}
      </ReserveInfo>
    </ReservationBox>
  );
};

export default ReservationCard;
