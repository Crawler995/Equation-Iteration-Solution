import React from 'react';
import { createGlobalStyle } from 'styled-components';
import EqualityInput from './EquationInput';
import { Row, Col } from './layout';
import { Container } from './neumorphism-ui';
import Header from './neumorphism-ui/Header';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    box-sizing: border-box;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Container>
        <Header>EQUATION ITERATION SOLUTION</Header>

        <Row>
          <Col span={12}>
            <EqualityInput />
          </Col>
          <Col span={12}>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
