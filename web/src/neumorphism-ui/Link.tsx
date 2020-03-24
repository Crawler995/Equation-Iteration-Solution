import styled from 'styled-components';
import { color } from './config';

const Link = styled.a`
  transition: color 0.2s;

  &:link,
  &:visited {
    color: ${color.darkGrey};
  }

  &:hover {
    color: ${color.primaryColor};
  }
`;

export default Link;
