import styled from "styled-components";
import { KitLink } from "@chargepoint/cp-toolkit";
import { StoryWrapper, List, Item, Info, Title } from "../components/Styled";

export default {
  title: "Introduction",
};

export const Intro = () => {
  return (
    <StoryWrapper>
      <h1>Introduction</h1>
      <p>
        <b>cp-charts</b> contains storybook examples, recipes, utilities, and
        components that can be used to render various types of charts.
      </p>
      <p>
        <h2>3rd Party Tools used</h2>
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
                <KitLink href="https://d3js.org/">https://d3js.org/</KitLink>
                D3 Utilies used:
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
    </StoryWrapper>
  );
};
