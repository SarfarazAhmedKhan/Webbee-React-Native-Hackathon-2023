import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import CategoryCard from '../../components/Category/CategoryCard';
import FlatListWrapper from '../../components/FlatListWrapper';
import Navigator from '../../navigations/navigator';
import {useDispatch, useSelector} from 'react-redux';
import {CategoryData, RootState} from '../../utils';
import colors from '../../theme/colors';
import {
  setCategories,
  setCategoryItems,
} from '../../redux/slices/categorySlice';
import {dimensions} from '../../theme/dimensions';

type ManageCategoriesProps = {};

function ManageCategories({}: ManageCategoriesProps): JSX.Element {
  const selectedCategories = useSelector(
    (state: RootState) => state.categorySlice.categories,
  );
  const selectedCategoryItem = useSelector(
    (state: RootState) => state.categorySlice.categoryItems,
  );
  const dispatch = useDispatch();
  const onEditCategoryItem = (item: any, index: number) => {
    Navigator.navigate('Add Category', {
      data: item,
      screenName: 'EDIT',
      editIndex: index,
      id: item.id,
    });
  };
  const onRemoveCategoryItem = (category: CategoryData, index: number) => {
    let categories = [...selectedCategories];
    categories = categories.filter((item, key) => key != index);
    let categoryItems = [...selectedCategoryItem];
    categoryItems = categoryItems.filter(
      (item, key) => item.categoryName != category.categoryName && index != key,
    );
    dispatch(setCategories(categories));
    dispatch(setCategoryItems(categoryItems));
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatListWrapper
        numColumns={dimensions.isTAB ? 2 : 1}
        data={selectedCategories}
        emptyText="No categories to display"
        renderItem={({item, index}) => (
          <CategoryCard
            editable={false}
            title={item.categoryName}
            fields={item.fields}
            fieldTitle={item.titleField}
            handleEditCategory={() => onEditCategoryItem(item, index)}
            handleRemoveCategory={() => onRemoveCategoryItem(item, index)}
          />
        )}
      />
      <Button
        style={{margin: 16}}
        mode="contained"
        buttonColor={colors.blue}
        onPress={() =>
          Navigator.navigate('Add Category', {
            data: {},
            screenName: 'ADD',
          })
        }>
        {'ADD NEW CATEGORY'}
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

export default ManageCategories;
