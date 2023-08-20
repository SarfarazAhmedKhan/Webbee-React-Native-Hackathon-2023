import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, CategoryData} from '../../utils';
import CategoryItemCard from '../../components/Category/CategoryItemCard';
import FlatListWrapper from '../../components/FlatListWrapper';
import {Button} from 'react-native-paper';
import colors from '../../theme/colors';
import Navigator from '../../navigations/navigator';
import {setCategoryItems} from '../../redux/slices/categorySlice';

function Dashboard(): JSX.Element {
  const selectedCategoryItems = useSelector(
    (state: RootState) => state.categorySlice.categoryItems,
  );
  const selectedCategories = useSelector(
    (state: RootState) => state.categorySlice.categories,
  );
  const dispatch = useDispatch();
  const categorizedItems: {[categoryName: string]: CategoryData[]} =
    selectedCategoryItems?.reduce((result: any, item: CategoryData) => {
      const {categoryName} = item;
      if (!result[categoryName]) {
        result[categoryName] = [];
      }
      result[categoryName].push(item);
      return result;
    }, {});

  const onEditCategoryItem = (item: any, index: number) => {
    Navigator.navigate(item.categoryName, {
      screen: 'Add Category Items',
      initial: false,
      params: {
        data: item,
        screenName: 'EDIT',
        editIndex: index,
        id: item.id,
      },
    });
  };

  const onAddCategoryItem = (categoryName: any) => {
    let selectedCategory = selectedCategories.find(
      (item: any) => item.categoryName == categoryName,
    );
    Navigator.navigate(categoryName, {
      screen: 'Add Category Items',
      initial: false,
      params: {
        data: selectedCategory,
        screenName: 'ADD',
      },
    });
  };

  const onRemoveCategoryItem = (data: CategoryData) => {
    let array: CategoryData[] = [...selectedCategoryItems];
    array = array.filter((item, key) => item.id != data.id);
    dispatch(setCategoryItems(array));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatListWrapper
        data={Object.keys(categorizedItems)}
        keyExtractor={(categoryName: string) => categoryName}
        emptyText="No categories found"
        renderItem={({item: categoryName}: {item: string}) => (
          <View key={categoryName}>
            <View style={styles.containerRow}>
              <Text style={styles.categoryTitle}>{categoryName}</Text>
              <Button
                mode="contained"
                buttonColor={colors.blue}
                onPress={() => onAddCategoryItem(categoryName)}>
                {'ADD NEW ITEM'}
              </Button>
            </View>
            <FlatListWrapper
              data={categorizedItems[categoryName]}
              keyExtractor={(item: CategoryData, index: number) =>
                index.toString()
              }
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
          </View>
        )}
        ListFooterComponent={
          Object.keys(categorizedItems).length == 0 ? (
            <Button
              style={{margin: 16}}
              mode="contained"
              buttonColor={colors.blue}
              onPress={() =>
                Navigator.navigate('Manage Categories', {
                  screen: 'Add Category',
                  initial: false,
                  params: {
                    data: {},
                    screenName: 'ADD',
                  },
                })
              }>
              {'ADD A CATEGORY'}
            </Button>
          ) : (
            <></>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Dashboard;
