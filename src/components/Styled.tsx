import { ThemeConstants, ThemeColors } from "@chargepoint/cp-toolkit";
import styled from "styled-components";

const { spacing, fontSize, fontWeight } = ThemeConstants;

// styled components for Storybook
export const StoryWrapper = styled.div`
  padding: ${spacing.absolute.s}px;
`;

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const Item = styled.div`
  color: ${ThemeColors.dark_gray};
  margin-bottom: ${spacing.absolute.m}px;
`;
export const Info = styled.div`
  color: ${ThemeColors.gray};
`;

export const Title = styled.div`
  color: ${ThemeColors.dark_gray};
  font-weight: ${fontWeight.bold};
`;
