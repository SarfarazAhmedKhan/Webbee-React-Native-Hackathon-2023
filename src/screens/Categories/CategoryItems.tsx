import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import FlatListWrapper from '../../components/FlatListWrapper';
import {Button} from 'react-native-paper';
import Navigator from '../../navigations/navigator';
import {useDispatch, useSelector} from 'react-redux';
import {CategoryData, RootState} from '../../utils';
import CategoryItemCard from '../../components/Category/CategoryItemCard';
import {useRoute} from '@react-navigation/native';
import colors from '../../theme/colors';
import {setCategoryItems} from '../../redux/slices/categorySlice';

type CategoryItemProps = {};

function CategoryItems({}: CategoryItemProps): JSX.Element {
  const route = useRoute();
  const dispatch = useDispatch();

  const selectedCategoryItems = useSelector((state: RootState) =>
    state.categorySlice.categoryItems?.filter(
      (item: any) => item.categoryName == route.name,
    ),
  );

  const allCategoryItems = useSelector(
    (state: RootState) => state.categorySlice.categoryItems,
  );

  const selectedCategory = useSelector((state: RootState) =>
    state.categorySlice.categories?.find(
      (item: any) => item.categoryName == route.name,
    ),
  );

  const onRemoveCategoryItem = (data: CategoryData) => {
    let array: CategoryData[] = [...allCategoryItems];
    array = array.filter((item, key) => item.id != data.id);
    dispatch(setCategoryItems(array));
  };

  const onEditCategoryItem = (item: any, index: number) => {
    Navigator.navigate('Add Category Items', {
      data: item,
      screenName: 'EDIT',
      editIndex: index,
      id: item.id,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatListWrapper
        data={selectedCategoryItems}
        emptyText="No category items found"
        renderItem={({item, index}) => (
          <CategoryItemCard
            handleEditCategoryItem={() => onEditCategoryItem(item, index)}
            fields={item.fields}
            editable={false}
            title={item.titleField ?? 'UNAMED FIELD'}
            handleRemoveCategoryItem={() => onRemoveCategoryItem(item)}
          />
        )}
      />
      <Button
        mode="contained"
        buttonColor={colors.blue}
        onPress={() =>
          Navigator.navigate('Add Category Items', {
            data: selectedCategory,
            screenName: 'ADD',
          })
        }>
        {'ADD NEW ITEM'}
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

export default CategoryItems;
