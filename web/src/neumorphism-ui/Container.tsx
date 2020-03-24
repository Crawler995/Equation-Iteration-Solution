import styled from 'styled-components';
import { color } from './config';

const Container = styled.div`
  overflow: hidden;
  background-color: ${color.backgroundColor};
  color: ${color.grey};
  height: 100vh;
  padding: 15px;
`;

export default Container;
