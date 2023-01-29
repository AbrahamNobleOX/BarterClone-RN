  
import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

export const iconNumbers = 4;
export const paddingHorizontal = 48;
export const DURATION = 100;
export const PADDING = 16;
export const SEGMENT = PixelRatio.roundToNearestPixel(width / iconNumbers);
export const ICON_SIZE = SEGMENT - paddingHorizontal;
export const WIDTH = width;
export const HEIGHT = height;

export const Colors = {
  primary: "#21315A",
  border: "#3F5AAE",
};