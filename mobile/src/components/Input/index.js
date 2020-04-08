import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import PropTypes from 'prop-types';

import { Container, InputField } from './styles';

const Input = ({ style, icon, fontColor, ...rest }, ref) => {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(255, 255, 255, 0.6)" />}
      <InputField {...rest} ref={ref} fontColor={fontColor} />
    </Container>
  );
};

// InputField.propTypes = {
//   icon: PropTypes.string,
//   style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
// };

// InputField.defaultProps = {
//   icon: null,
//   style: {},
// };

export default forwardRef(Input);
