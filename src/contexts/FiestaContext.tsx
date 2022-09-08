import type { SkFont } from '@shopify/react-native-skia/lib/typescript/src';
import React, { createContext, useContext, useRef } from 'react';
import {
  Balloons as _Balloons,
  Hearts as _Hearts,
  Stars as _Stars,
  EmojiPopper as _EmojiPopper,
  PopperHandler,
} from '../components';

export enum FiestaAnimations {
  Hearts = 'Hearts',
  Balloons = 'Balloons',
  Stars = 'Stars',
  EmojiPopper = 'EmojiPopper',
}

interface RunFiestaAnimationParams {
  animation: FiestaAnimations;
}

interface FiestaProviderProps {
  font?: SkFont;
}

interface FiestContextType {
  runFiestaAnimation(params: RunFiestaAnimationParams): void;
}

export const FiestaContext = createContext<FiestContextType>({
  runFiestaAnimation: () => {},
});

export const FiestaProvider: React.FC<FiestaProviderProps> = ({
  children,
  font,
}) => {
  const balloonsRef = useRef<PopperHandler>(null);
  const heartsRef = useRef<PopperHandler>(null);
  const emojiPopperRef = useRef<PopperHandler>(null);
  const starsRef = useRef<PopperHandler>(null);

  const runFiestaAnimation = ({ animation }: RunFiestaAnimationParams) => {
    switch (animation) {
      case FiestaAnimations.Balloons:
        balloonsRef.current?.start();
        break;
      case FiestaAnimations.Hearts:
        heartsRef.current?.start();
        break;
      case FiestaAnimations.Stars:
        starsRef.current?.start();
        break;
      case FiestaAnimations.EmojiPopper:
        if (font) {
          emojiPopperRef.current?.start();
        } else {
          throw new Error(
            'This animation cannot be executed without a font, please set a font in the Fiesta provider.'
          );
        }
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
      <_Stars autoPlay={false} ref={starsRef} />

      {font ? (
        <_EmojiPopper autoPlay={false} ref={emojiPopperRef} font={font} />
      ) : null}

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
