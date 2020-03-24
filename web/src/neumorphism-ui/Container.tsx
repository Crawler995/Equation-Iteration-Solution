import styled from 'styled-components';
import { color } from './config';

const Container = styled.div`
  position: relative;
  background-color: ${color.backgroundColor};
  color: ${color.grey};
  min-height: 100vh;
  padding: 15px;
`;

export default Container;
