import { KitLink } from '@chargepoint/cp-toolkit';
import { StoryWrapper, List, Item, Info, Title } from '../components/Styled';

export default {
  title: 'Introduction',
};

export function Intro() {
  return (
    <StoryWrapper>
      <h1>cp-charts</h1>
      <h2>Introduction</h2>
      <p>
        <b>cp-charts</b> contains useful utilties and example stories.
        <ul>
          <li>build various types of charts using recharts</li>
          <li>learn to style and use custom components with recharts </li>
          <li>learn how to use d3-utilities to simplify working with data</li>
        </ul>
        <blockquote>
          <b>cp-charts needs contributors!</b>
        </blockquote>
        <h3>3rd Party Libraries used</h3>
        <List>
          <li>
            <Item>
              <Title>ReCharts</Title>
              <Info>
                A composable charting library built on React components
              </Info>
              <KitLink href="https://recharts.org/en-US/">
                https://recharts.org/en-US/
              </KitLink>
            </Item>
          </li>
          <li>
            <Item>
              <Title>D3</Title>
              <Info>
                In addition to Recharts being built on top of D3, cp-charts has
                examples how to use several utilities in D3.
                <br />
                <KitLink href="https://d3js.org/">https://d3js.org/</KitLink>
                <h4>D3 Utilies used:</h4>
                <ul>
                  <li>d3-scale</li>
                  <li>d3-scale-chromatic</li>
                  <li>d3-array</li>
                </ul>
              </Info>
            </Item>
          </li>
        </List>
      </p>
      <h4>Maintainers</h4>
      <ul>
        <li>
          <span>Frank Young </span>
          <a href="mailto:frank.young@chargepoint.com?subject=cp-charts">
            frank.young@chargepoint.com
          </a>
        </li>
      </ul>
    </StoryWrapper>
  );
}
