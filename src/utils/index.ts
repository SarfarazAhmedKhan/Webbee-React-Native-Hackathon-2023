export const addParams = (obj = {}) => {
  const paramArr = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return paramArr.length ? `?${paramArr.join('&')}` : '';
};

export const getFontSize = (variant: string) => {
  let fontSize;
  switch (variant) {
    case 'h1':
      fontSize = 30;
      break;
    case 'h2':
      fontSize = 27;
      break;
    case 'h3':
      fontSize = 24;
      break;
    case 'h4':
      fontSize = 20;
      break;
    case 'h5':
      fontSize = 16;
      break;
    case 'h6':
      fontSize = 14;
      break;
    case 'h7':
      fontSize = 12;
      break;
    default:
      throw new Error(
        '`variant` prop must contain any one of the values from h1, h2, h3, h4, h5, h6, h7',
      );
  }
  return fontSize;
};

export type FieldProps = {
  type: string;
  name: string;
  index: number;
  checked?: boolean;
  date?: Date;
  attributeValue: string;
};

export type CategoryData = {
  categoryName: string;
  fields: FieldProps[];
  titleField: string;
  id?: string;
};

export interface RootState {
  Orientation: any;
  categorySlice: {
    categories: CategoryData[];
    categoryItems: CategoryData[];
  };
}

export const getAttributes = ['Text', 'Checkbox', 'Date', 'Number'];
