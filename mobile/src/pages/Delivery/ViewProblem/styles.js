import styled from 'styled-components/native';

export const Scroll = styled.View`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
`;

export const BackgroundHeader = styled.View`
  width: 100%;
  height: 90px;
  background-color: #7D40E7;
`;

export const WindowTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 12px;
  margin-top: -65px;
`;


export const Title = styled.Text`
  font-size: 16px;
  color: #999;
  flex: 1;
`;

export const Date = styled.Text`
  font-size: 12px;
  color: #C1C1C1;
`;

export const ContentList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  width: 100%;
`;

export const Block = styled.View`
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #fff;

  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;


  border-radius: 4px;

  elevation: 1;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
`;


