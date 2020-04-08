import React from 'react';
import PropTypes from 'prop-types';

import wordUpper from '~/libs/singleWordUpper';

import { Container, Avatar, Initials } from './styles';

export default function SmallPicture({ avatar, name }) {
  const { url } = avatar || '';
  const initial = wordUpper(name);
  return (
    <Container>
      {url ? <Avatar src={url} alt={name} /> : <Initials>{initial}</Initials>}
    </Container>
  );
}

SmallPicture.propTypes = {
  avatar: PropTypes.shape({
    url: PropTypes.string,
  }),
  name: PropTypes.string.isRequired,
};

SmallPicture.defaultProps = {
  avatar: {
    url: '',
  },
};
