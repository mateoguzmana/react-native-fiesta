import React, {
  createContext,
  type ReactNode,
  useContext,
  useRef,
} from 'react';
import type { SkFont } from '@shopify/react-native-skia';
import {
  Balloons as _Balloons,
  Hearts as _Hearts,
  Stars as _Stars,
  EmojiPopper as _EmojiPopper,
  type PopperHandler,
  type StartPopperParams,
} from '../components';

export enum FiestaAnimations {
  Hearts = 'Hearts',
  Balloons = 'Balloons',
  Stars = 'Stars',
  EmojiPopper = 'EmojiPopper',
  Fireworks = 'Fireworks',
}

interface RunFiestaAnimationParams extends StartPopperParams {
  animation: FiestaAnimations;
}

interface FiestaProviderProps {
  children?: ReactNode;
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

  const runFiestaAnimation = ({
    animation,
    ...options
  }: RunFiestaAnimationParams) => {
    switch (animation) {
      case FiestaAnimations.Balloons:
        balloonsRef.current?.start({ ...options });
        break;
      case FiestaAnimations.Hearts:
        heartsRef.current?.start({ ...options });
        break;
      case FiestaAnimations.Stars:
        starsRef.current?.start({ ...options });
        break;
      case FiestaAnimations.Fireworks:
        throw new Error(
          'Fireworks are not supported yet in the Fiesta context, please use them as a component.'
        );
      case FiestaAnimations.EmojiPopper:
        if (font) {
          emojiPopperRef.current?.start({ ...options });
        } else {
          throw new Error(
            'This animation cannot be executed without a font, please set a font in the Fiesta provider.'
          );
        }
        break;
      default:
        balloonsRef.current?.start({ ...options });
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

  return { runFiestaAnimation };
};
