import React, { createContext, useContext, useRef } from 'react';
import {
  Balloons as _Balloons,
  Hearts as _Hearts,
  PopperHandler,
} from '../components';

export enum FiestaAnimations {
  Hearts = 'Hearts',
  Balloons = 'Balloons',
}

interface RunFiestaAnimationParams {
  animation: FiestaAnimations;
}

interface FiestContextType {
  runFiestaAnimation(params: RunFiestaAnimationParams): void;
}

export const FiestaContext = createContext<FiestContextType>({
  runFiestaAnimation: () => {},
});

export const FiestaProvider: React.FC = ({ children }) => {
  const balloonsRef = useRef<PopperHandler>(null);
  const heartsRef = useRef<PopperHandler>(null);

  const runFiestaAnimation = ({ animation }: RunFiestaAnimationParams) => {
    switch (animation) {
      case FiestaAnimations.Balloons:
        balloonsRef.current?.start();
        break;
      case FiestaAnimations.Hearts:
        heartsRef.current?.start();
        break;
      default:
        balloonsRef.current?.start();
    }
  };

  return (
    <FiestaContext.Provider
      value={{
        runFiestaAnimation,
      }}
    >
      <_Balloons autoPlay={false} ref={balloonsRef} />
      <_Hearts autoPlay={false} ref={heartsRef} />

      {children}
    </FiestaContext.Provider>
  );
};

export const useFiesta = () => {
  const { runFiestaAnimation } = useContext(FiestaContext);

  return {
    runFiestaAnimation,
  };
};
