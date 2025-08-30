/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#0a7ea4', // Using tintColorLight as primary
    secondary: '#687076', // Using icon color as secondary for now
    light: '#f5f5f5', // A light color
    info: '#17a2b8', // A light blue for info
    danger: '#dc3545', // A red for danger
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#fff', // Using tintColorDark as primary
    secondary: '#9BA1A6', // Using icon color as secondary for now
    light: '#333', // A dark light color
    info: '#17a2b8', // A light blue for info
    danger: '#dc3545', // A red for danger
  },
};
