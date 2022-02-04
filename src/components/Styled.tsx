import { ThemeConstants, ThemeColors } from "@chargepoint/cp-toolkit";
import styled from "styled-components";

const { spacing, fontSize, fontWeight } = ThemeConstants;

// styled components for Storybook
export const StoryWrapper = styled.div`
  padding: ${spacing.absolute.m}px;
`;

export const List = styled.ul<{ type?: string }>`
  list-style-type: ${({ type }) => type ?? "none"};
  margin: ${spacing.absolute.m}px 0;
  padding: 0;
`;

export const ListItem = styled.li`
  padding: ${spacing.absolute.xs}px;
  margin-left: ${spacing.absolute.l}px;
`;

export const SectionHeader = styled.div`
  margin-bottom: ${spacing.absolute.m}px;
`;

export const Group = styled.div`
  margin-bottom: ${spacing.absolute.m}px;
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

export const ControlBar = styled.div`
  padding: ${spacing.absolute.s}px;
  margin-bottom: ${spacing.absolute.s}px;
  > * {
    max-width: 250px;
    margin-right: ${spacing.absolute.m}px;
  }
`;
