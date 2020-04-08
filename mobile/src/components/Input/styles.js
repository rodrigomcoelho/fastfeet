import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 20px;
  height: 46px;
  background-color: #fff;
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const InputField = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 15px;
  color: #999;
`;
