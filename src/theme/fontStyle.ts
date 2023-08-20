import {StyleSheet, ViewStyle} from 'react-native';
import colors from './colors';
import {dimensions} from './dimensions';

const {WIDTH} = dimensions;

type StyleFunction = (fontSize?: number) => {
  fontSize: number;
};

const createRegularStyle: StyleFunction = (
  fontSize = 4,
  fontColor = colors.black,
) => ({
  fontSize: WIDTH(fontSize),
  fontFamily: 'Roboto-Regular',
  color: fontColor,
});

const ConstStyle: {
  txt: ViewStyle;
  regular: ReturnType<StyleFunction>;
} = {
  txt: {
    borderWidth: 1,
    backgroundColor: colors.red,
    flex: 1,
    marginHorizontal: 2,
    marginVertical: 10,
  },
  regular: createRegularStyle(),
};

export default StyleSheet.create(ConstStyle);
