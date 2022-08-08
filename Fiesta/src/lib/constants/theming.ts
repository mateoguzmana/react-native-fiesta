export const palette = {
  red: 'rgba(238, 17, 131, 1)',
  blue: 'rgba(0, 0, 255, 1)',
  green: 'rgba(0, 255, 0, 1)',
  yellow: 'rgba(255, 255, 0, 1)',
  purple: 'rgba(255, 0, 255, 1)',
  orange: 'rgba(255, 165, 0, 1)',
  pink: 'rgba(255, 192, 203, 1)',
  black: 'rgba(0, 0, 0, 0.8)',
  golden: 'rgba(245, 229, 27, 0.5)',
  gray: 'rgba(246, 243, 245, 0.5)',
};

const DefaultTheme = [
  palette.red,
  palette.blue,
  palette.green,
  palette.yellow,
  palette.purple,
  palette.orange,
  palette.pink,
];

const DarkTheme = [...new Array(7).fill(palette.black)];

export const FiestaThemes = {
  default: DefaultTheme,
  dark: DarkTheme,
};
