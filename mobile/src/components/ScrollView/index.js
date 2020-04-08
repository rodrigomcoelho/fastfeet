import * as React from 'react';
import { ScrollView } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import PropTypes from 'prop-types';

export default function Scroll({ children, style }) {
  const ref = React.useRef(null);

  useScrollToTop(ref);

  return (
    <ScrollView style={style} ref={ref}>
      {children}
    </ScrollView>
  );
}

Scroll.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

Scroll.defaultProps = {
  style: {},
};
