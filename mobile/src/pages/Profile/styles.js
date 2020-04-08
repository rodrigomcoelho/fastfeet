import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  align-items: center;
  padding: 60px 35px 60px 35px;
`;

export const Content = styled.View`
  width: 100%;
`;

export const Preview = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Avatar = styled.Image`
  height: 136px;
  width: 136px;
  border-radius: 68px;
`;

export const Body = styled.View``;

export const FieldName = styled.Text`
  margin-top: 15px;
  font-size: 12px;
  line-height: 26px;
  color: #666;
`;

export const FieldValue = styled.Text`
  font-size: 22px;
  line-height: 29px;
  font-weight: bold;
  color: #444;
`;

export const LogoutButton = styled(Button)`
  background-color: #e74040;
  margin-top: 30px;
`;
