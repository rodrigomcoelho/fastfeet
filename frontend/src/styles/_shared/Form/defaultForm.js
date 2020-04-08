import styled from 'styled-components';

export const Content = styled.div`
  margin-top: 27px;
  background-color: #fff;
  width: 100%;
  padding: 30px;
  display: ${props => (props.grid ? 'grid' : 'flex')};
  ${props =>
    props.gridColumns
      ? `grid-template-columns: repeat(${props.gridColumns}, 1fr)`
      : 'flex-direction:  column'};
`;

export const Label = styled.div`
  color: #444444;
  font-weight: bold;
  margin-top: 18px;
  margin-bottom: 8px;
`;

export const View = styled.div`
  max-width: 100%;

  ${props => (props.grid ? ` display: grid;` : '')}
  ${props =>
    props.gridSizeColumn
      ? `grid-template-columns: ${props.gridSizeColumn};`
      : ''}
  ${props => (props.columnGap ? `column-gap:${props.columnGap}px; ` : '')}
`;
