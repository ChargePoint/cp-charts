import { ThemeColors } from '@chargepoint/cp-toolkit';
import { FC } from 'react';

export interface PulsingSVGCircleProps {
  x: number;
  y: number;
  radius: number;
  fill: string;
}

const PulsingSVGCircle: FC<PulsingSVGCircleProps> = ({
  x,
  y,
  radius = 4,
  fill = ThemeColors.red_50,
}) => {
  return (
    <>
      <circle
        cx={x}
        cy={y}
        fill="none"
        r={radius}
        stroke={fill}
        strokeWidth="2"
      >
        <animate
          attributeName="r"
          from={radius / 1.5}
          to={radius * 1.5}
          dur="1.5s"
          begin="0s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="1"
          to="0"
          dur="1.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={x} cy={y} fill={fill} r={radius / 1.5} />
    </>
  );
};

export default PulsingSVGCircle;
