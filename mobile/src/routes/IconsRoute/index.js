import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const DeliveryIcon = ({ color }) => (
  <Icon name="reorder" size={20} color={color} />
);

export const ProfileIcon = ({ color }) => (
  <Icon name="account-circle" size={20} color={color} />
);

DeliveryIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

ProfileIcon.propTypes = {
  color: PropTypes.string.isRequired,
};
