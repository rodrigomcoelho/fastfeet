import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Button({
  children,
  loading,
  style,
  loadingColor,
  ...rest
}) {
  return (
    <Container {...rest} style={style}>
      {loading ? (
        <ActivityIndicator size="small" color={loadingColor} />
      ) : (
        <>{children}</>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  loadingColor: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Button.defaultProps = {
  loading: false,
  loadingColor: '#fff',
  style: {},
};
