import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import EqualityInput from './EquationInput';
import { Row, Col } from './layout';
import { Container } from './neumorphism-ui';
import Header from './neumorphism-ui/Header';
import ResultShow from './ResultShow';
import { Step } from './types';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    box-sizing: border-box;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }
`;

function App() {
  const [solutionSteps, setSolutionSteps] = useState([] as Step[]);

  return (
    <div className="App">
      <GlobalStyle />
      <Container>
        <Header
          title="EQUATION ITERATION SOLUTION"
          author="Zhang Qinglong 1120172135"
          link="https://github.com/Crawler995"
        />

        <Row>
          <Col span={12}>
            <EqualityInput onSubmitSuccess={(msg) => {
              setSolutionSteps([]);
              setSolutionSteps(msg);
            }} />
          </Col>
          <Col span={12}>
            <ResultShow solutionSteps={solutionSteps} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
