import styled from 'styled-components';

interface IProps {
  span: number;
}

const Col = styled.div`
  float: left;
  width: 100%;
  padding: 0px 20px 20px 20px;

  @media screen and (min-width: 920px) {
    width: ${(props: IProps) => (props.span / 24) * 100 + '%'};
    padding: 4px 20px;
  }
`;

export default Col;
