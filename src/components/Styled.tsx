import { ThemeConstants, ThemeColors } from '@chargepoint/cp-toolkit';
import styled, { css } from 'styled-components';

const { spacing, fontWeight } = ThemeConstants;

// styled components for Storybook
export const StoryWrapper = styled.div`
  padding: ${spacing.absolute.m}px;
  color: ${({ theme }) => theme.page.header.text};
`;

export const List = styled.ul<{ type?: string }>`
  list-style-type: ${({ type }) => type ?? 'none'};
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
  color: ${ThemeColors.gray_70};
  margin-bottom: ${spacing.absolute.m}px;
`;
export const Info = styled.div`
  color: ${ThemeColors.gray_50};
`;

export const Title = styled.div`
  color: ${ThemeColors.gray_70};
  font-weight: ${fontWeight.bold};
`;

export const ControlBar = styled.div`
  form {
    display: flex;
    width: 100%;
    > div {
      width: 250px;
      margin-right: ${spacing.absolute.m}px;
    }
  }
  padding: ${spacing.absolute.s}px;
  margin-bottom: ${spacing.absolute.s}px;
`;

export const Spacer = styled.div<{ orientation?: string; size: number }>`
  ${({ orientation, size }) =>
    orientation === 'vertical'
      ? css`
          height: ${size}px;
        `
      : css`
          width: ${size}px;
        `}
`;

export const Table = styled.table`
  border: 0;
`;
