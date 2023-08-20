import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { updateOrientation } from '../../src/redux/slices/Orientation';
import { dimensions } from '../theme/dimensions';

function RotationCheck(): JSX.Element {
  const dispatch = useDispatch();

  const orientationUpdate = () => {
    const {width, height} = Dimensions.get('window');
    const newOrientation = width > height ? 'landscape' : 'portrait';
    if (newOrientation === 'landscape') {
      dimensions.WIDTH = heightPercentageToDP;
      dimensions.HEIGHT = widthPercentageToDP;
    } else {
      dimensions.WIDTH = widthPercentageToDP;
      dimensions.HEIGHT = heightPercentageToDP;
    }
    dispatch(updateOrientation(newOrientation));
  };
  useEffect(() => {
    Dimensions.addEventListener('change', orientationUpdate);

    orientationUpdate(); // Initial orientation update

    return () => {
      Dimensions.removeEventListener('change', orientationUpdate);
    };
  }, []);

  return <View />;
}

export default RotationCheck;
