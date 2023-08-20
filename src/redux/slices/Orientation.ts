import { createSlice } from '@reduxjs/toolkit';
import { dimensions } from '../../theme/dimensions';

interface OrientationState {
  rotaion: string;
}
const Orientation = createSlice({
  name: 'Orientation',
  initialState: {
    rotaion:
      dimensions.WIDTH(100) > dimensions.HEIGHT(100) ? 'landscape' : 'portrait',
  } as OrientationState,
  reducers: {
    updateOrientation: (state, action: string) => {
      state.rotaion = action;
    },
  },
});

const {actions, reducer} = Orientation;

export const {updateOrientation} = actions;

export default reducer;
