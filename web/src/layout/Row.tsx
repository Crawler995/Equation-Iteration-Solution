import styled from 'styled-components';

const Row = styled.div`
  margin: 20px 0px;

  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

export default Row;
