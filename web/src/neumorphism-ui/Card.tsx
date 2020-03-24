import styled from 'styled-components';

const cardShadow = `
  7px 7px 15px rgba(55, 84, 170, .15),
  -7px -7px 20px rgba(255, 255, 255, 1),
  0px 0px 4px rgba(255, 255, 255, .2);
`;

const Card = styled.div`
  padding: 40px;
  border-radius: 30px;

  box-shadow: ${cardShadow};
`;

export default Card;
