import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

export const Header = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 34px;
`;

export const UserInfo = styled.View`
  margin-left: 12px;
  flex-direction: column;
  flex: 1;
`;

export const Welcome = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const UserName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  line-height: 29px;
  color: #444;
`;

export const ActionContainer = styled.View`
  align-items: baseline;
  flex-direction: row;
  margin-top: 22px;
`;

export const DeliveryText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  line-height: 29px;
  color: #444;
  flex: 1;
`;

export const ActionOption = styled.Text`
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  color: ${(props) => (props.show ? '#7D40E7' : '#999')};
  text-decoration: ${(props) => (props.show ? 'underline' : 'none')};
  margin-left: 15px;
`;

export const ContentList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#999',
})`
  margin: 30px 0;
`;
