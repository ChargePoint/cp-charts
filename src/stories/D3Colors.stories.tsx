import React from "react";
import { ThemeColors, ThemeConstants } from "@chargepoint/cp-toolkit";
import styled from "styled-components";
import { scaleOrdinal } from "d3-scale";
import {
  schemeCategory10,
  schemeTableau10,
  schemeDark2,
} from "d3-scale-chromatic";
import { CPChartColors } from "../common/theme";
const { spacing, fontSize } = ThemeConstants;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const ColorStory = styled.div`
  font-family: Roboto;

  h2 {
    font-size: ${fontSize.h2};
  }
  pre {
    background: ${ThemeColors.faint_gray};
    padding: ${spacing.absolute.m}px;
  }
  margin-bottom: ${spacing.absolute.l}px;
`;
const ColorSwatchContainer = styled.div`
  display: flex;
  gap: ${spacing.absolute.xs}px;
`;

const ColorSwatch = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  height: 30px;
  width: 30px;
`;

export default {
  title: "D3/Colors",
  component: ColorStory,
};

export const Categorical = () => {
  const keys = [
    "key1",
    "key2",
    "key3",
    "key4",
    "key5",
    "key6",
    "key7",
    "key8",
    "key9",
    "key10",
  ];

  const scale1 = scaleOrdinal(schemeCategory10);
  const domain1 = scale1.domain(keys);

  const scale2 = scaleOrdinal(schemeTableau10);
  const domain2 = scale2.domain(keys);

  const scale3 = scaleOrdinal(schemeDark2);
  const domain3 = scale3.domain(keys);

  const scale4 = scaleOrdinal([
    CPChartColors.darkGray,
    CPChartColors.turquiseBlue,
    CPChartColors.lightGreen,
    CPChartColors.orange,
    CPChartColors.lightPurple,
    CPChartColors.fault,
    CPChartColors.lightGray,
  ]);
  const domain4 = scale4.domain(keys);

  return (
    <>
      <ColorStory>
        <h2>Using d3-scale to dynamically generate chart colors</h2>
      </ColorStory>
      <ColorStory>
        <h3>schemeCategory10</h3>
        <ColorSwatchContainer>
          {keys.map((key) => (
            <ColorSwatch color={domain1(key)} />
          ))}
        </ColorSwatchContainer>
      </ColorStory>
      <ColorStory>
        <h3>schemeTableau10</h3>
        <ColorSwatchContainer>
          {keys.map((key) => (
            <ColorSwatch color={domain2(key)} />
          ))}
        </ColorSwatchContainer>
      </ColorStory>
      <ColorStory>
        <h3>schemeDark2</h3>
        <ColorSwatchContainer>
          {keys.map((key) => (
            <ColorSwatch color={domain3(key)} />
          ))}
        </ColorSwatchContainer>
      </ColorStory>
      <ColorStory>
        <h3>cpChartColors</h3>
        <ColorSwatchContainer>
          {keys.map((key) => (
            <ColorSwatch color={domain4(key)} />
          ))}
        </ColorSwatchContainer>
      </ColorStory>
    </>
  );
};
