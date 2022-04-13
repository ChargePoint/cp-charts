import { keyframes } from 'styled-components';

export const pulseRed = keyframes`
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
    }
    
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
    }
`;

export const pulseBlue = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(52, 172, 224, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(52, 172, 224, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(52, 172, 224, 0);
  }
`;
