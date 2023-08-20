import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {
  addCategoryItems,
  setCategoryItems,
} from '../../redux/slices/categorySlice';
import Navigator from '../../navigations/navigator';
import CategoryItemCard from '../../components/Category/CategoryItemCard';
import {FieldProps, RootState} from '../../utils';
import {useSelector} from 'react-redux';
import colors from '../../theme/colors';

function AddCategoryItem({route}: any): JSX.Element {
  const [fields, setFields] = useState(route.params.data.fields);
  const dispatch = useDispatch();
  const selectedCategoryItems = useSelector(
    (state: RootState) => state.categorySlice.categoryItems,
  );
  const onAddCategoryItem = () => {
    let payload = {
      categoryName: route.params.data.categoryName,
      fields,
      titleField: route.params.data.titleField,
      id: Math.random().toString(4),
    };
    dispatch(addCategoryItems(payload));
    Navigator.goBack();
  };

  const onEditCategoryItem = () => {
    let payload = {
      categoryName: route.params.data.categoryName,
      fields,
      titleField: route.params.data.titleField,
      id: route.params.id,
    };
    let array = [...selectedCategoryItems];
    let index = array.findIndex(item => item.id == route.params.id);
    array[index] = {...payload};
    dispatch(setCategoryItems(array));
    Navigator.goBack();
  };

  const onChangeFieldValue = (
    fieldName: string,
    type: string,
    index: number,
    checked?: boolean,
    date?: Date,
  ) => {
    let array: FieldProps[] = [...fields];
    if (type == 'Checkbox') {
      array[index] = {...array[index], checked: checked};
    }
    if (type == 'Date') {
      array[index] = {...array[index], date: date};
    } else {
      array[index] = {...array[index], attributeValue: fieldName};
    }
    setFields(array);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <CategoryItemCard
          action={false}
          editable={true}
          title={route.params.data.titleField}
          fields={fields}
          handleChangeFieldValue={onChangeFieldValue}
        />
      </View>
      <Button
        mode="contained"
        buttonColor={colors.blue}
        style={{marginVertical: 16}}
        onPress={() =>
          route.params.screenName == 'ADD'
            ? onAddCategoryItem()
            : onEditCategoryItem()
        }>
        {`${route.params.screenName} CATEGORY ITEM`}
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
});

export default AddCategoryItem;
