import styled from 'styled-components/native';

import OriginalButton from '~/components/Button';
// import OriginalInput from '~/components/Input';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const BackgroundHeader = styled.View`
  width: 100%;
  height: 90px;
  background-color: #7d40e7;
`;

export const InputContainer = styled.View`
  margin-top: -70px;
  margin-right: 20px;
  margin-left: 20px;
  height: 300px;

  padding: 20px 20px;

  background-color: #fff;
  border-radius: 4px;

  flex-direction: row;
  align-items: flex-start;

  elevation: 1;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
`;

export const ProblemInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
  multiline: true,
})`
  flex: 1;
  font-size: 16px;
  line-height: 21px;
  color: #111;
  align-items: flex-start;
`;

export const Button = styled(OriginalButton)`
  margin: 20px;
`;
