import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const dimensions = {
  WIDTH: wp,
  HEIGHT: hp,
  isTAB: wp(100) > 400,
};
