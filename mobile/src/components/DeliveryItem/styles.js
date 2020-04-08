import styled from 'styled-components/native';

export const Container = styled.View`
  height: 169px;
  width: 100%;
  margin-bottom: 28px;
  border-radius: 4px;
  border: 1px solid #0000001a;
  box-shadow: 0px 0px 3px red;
`;

export const Status = styled.View`
  padding: 15px;
  flex: 1;
`;

export const DeliveryTitle = styled.View`
  flex-direction: row;
`;

export const DeliveryNumber = styled.Text`
  color: #7d40e7;
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
  margin-left: 10px;
`;

export const Details = styled.View`
  height: 64px;
  background-color: #f8f9fd;

  justify-content: center;
  align-items: center;
`;

export const DetailsContent = styled.View`
  align-items: flex-end;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

export const DatailsDate = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: #999;
`;

export const DetailsInfo = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #444;
`;

export const DetailsView = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #7d40e7;
`;
