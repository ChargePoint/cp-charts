import { FC, ReactElement } from 'react';

const SIZE = 32;

const CPChartShape: FC<{
  fill: string;
  type: string;
  strokeDasharray?: string | undefined;
}> = ({ fill, type, strokeDasharray }) => {
  const map: Record<string, ReactElement> = {
    circle: (
      <path
        type="circle"
        fill={fill}
        d=" M 25, 50
            a 25,25 0 1,1 50,0
            a 25,25 0 1,1 -50,0
          "
      />
    ),
    line: (
      <line
        strokeWidth={3}
        strokeDasharray={strokeDasharray}
        stroke={fill}
        x1={0}
        y1={6}
        x2={SIZE}
        y2={6}
      />
    ),
    diamond: (
      <path
        type="diamond"
        fill={fill}
        d="M0,-6.580370064762462L3.7991784282579624,0L0,6.580370064762462L-3.7991784282579624,0Z"
      />
    ),
    square: (
      <path
        type="square"
        fill={fill}
        d="M-3.5355339059327378,-3.5355339059327378h7.0710678118654755v7.0710678118654755h-7.0710678118654755Z"
      />
    ),
  };

  return map[type];
};

export default CPChartShape;
