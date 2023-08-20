import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, View} from 'react-native';
import CategoryCard from '../../components/Category/CategoryCard';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {
  addCategories,
  setCategories,
  setCategoryItems,
} from '../../redux/slices/categorySlice';
import Navigator from '../../navigations/navigator';
import {useSelector} from 'react-redux';
import {FieldProps, RootState} from '../../utils';
import colors from '../../theme/colors';

function AddNewCategory({route}: any): JSX.Element {
  const {params} = route;
  const [categoryName, setCategoryName] = useState(
    params.screenName == 'ADD' ? 'New Category' : params.data.categoryName,
  );

  const [titleField, setTitleField] = useState(
    params.screenName == 'ADD' ? 'UNNAME FIELD' : params.data.titleField,
  );
  const selectedCategories = useSelector(
    (state: RootState) => state.categorySlice.categories,
  );
  const selectedCategoryItems = useSelector(
    (state: RootState) => state.categorySlice.categoryItems,
  );
  const [fields, setFields] = useState(
    params.screenName == 'ADD'
      ? [
          {
            type: 'Text',
            name: '',
            index: 0,
            attributeValue: '',
          },
        ]
      : params.data.fields,
  );
  const titleFieldArray = fields.map((item: FieldProps) => item.name);

  const dispatch = useDispatch();
  const onChangeName = (categoryName: string) => {
    setCategoryName(categoryName);
  };

  const onFieldValueAdd = (fieldValue: string) => {
    let array: FieldProps[] = [...fields];
    array.push({
      type: fieldValue,
      name: '',
      index: array.length,
      attributeValue: '',
    });
    setFields(array);
  };

  const onFieldValueRemove = (index: number) => {
    let array: FieldProps[] = [...fields];
    array = array.filter((item, key) => key != index);
    setFields(array);
  };

  const onChangeFieldValue = (
    fieldName: string,
    type: string,
    index: number,
  ) => {
    let array: FieldProps[] = [...fields];
    array[index] = {...array[index], [type]: fieldName};
    setFields(array);
  };

  const onAddCategory = () => {
    let checkEmpty = fields?.find((item: FieldProps) => item.name == '');
    if (checkEmpty || fields.length == 0) {
      Alert.alert('Please add fields value');
      return;
    }
    let check = selectedCategories.find(
      item => item.categoryName == categoryName,
    );
    if (check) {
      Alert.alert('Category Already exist');
      return;
    }
    let payload = {
      categoryName,
      fields,
      titleField,
    };

    dispatch(addCategories(payload));
    Navigator.goBack();
  };

  const onEditCategory = () => {
    let checkEmpty = fields?.find((item: FieldProps) => item.name == '');
    if (checkEmpty || fields?.length == 0) {
      Alert.alert('Please add fields value');
      return;
    }
    let payload = {
      categoryName: categoryName,
      fields,
      titleField,
    };
    let data =
      selectedCategoryItems?.filter(
        item => item.categoryName == route.params.data.categoryName,
      ) ?? [];
    let data2 =
      selectedCategoryItems?.filter(
        item => item.categoryName != route.params.data.categoryName,
      ) ?? [];
    let newItemsList = [...data2];
    for (let key in data) {
      let fieldArray = [];
      for (let key2 in fields) {
        let prevField = data[key].fields?.find(
          item =>
            item.name == fields[key2].name && item.type == fields[key2].type,
        );
        if (prevField) {
          fieldArray.push(prevField);
        } else {
          fieldArray.push(fields[key2]);
        }
      }
      let obj = {
        ...data[key],
        categoryName,
        fields: fieldArray,
        titleField,
      };
      newItemsList.push(obj);
    }
    let array = [...selectedCategories];
    array[route.params.editIndex] = {...payload};
    dispatch(setCategories(array));
    dispatch(setCategoryItems(newItemsList));
    Navigator.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <CategoryCard
          titleFieldArray={titleFieldArray}
          editable={true}
          handleCategoryNameChange={onChangeName}
          handleChangeFieldValue={onChangeFieldValue}
          handleAddNewField={onFieldValueAdd}
          handleRemoveField={onFieldValueRemove}
          handleSetTitleField={setTitleField}
          title={categoryName}
          fields={fields}
          fieldTitle={titleField}
        />
      </View>
      <Button
        mode="contained"
        buttonColor={colors.blue}
        style={{margin: 16}}
        onPress={() =>
          params.screenName == 'ADD' ? onAddCategory() : onEditCategory()
        }>
        {`${params.screenName} CATEGORY`}
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default AddNewCategory;
