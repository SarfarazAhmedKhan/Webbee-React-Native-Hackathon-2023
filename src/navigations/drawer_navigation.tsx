import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import AddCategoryItem from '../screens/Categories/AddCategoryItem';
import AddNewCategory from '../screens/Categories/AddNewCategory';
import CategoryItems from '../screens/Categories/CategoryItems';
import ManageCategories from '../screens/Categories/ManageCategories';
import Dashboard from '../screens/Dashboard';
import {RootState} from '../utils';
import {NAVIGATION_CONSTANT, navigationRef} from './navigator';

const {
  ADD_CATEGORY,
  MANAGE_CATEGORIES,
  CATEGORIES_ITEMS,
  ADD_CATEGORY_ITEMS,
  CATEGORY,
  DASHBOARD,
} = NAVIGATION_CONSTANT;

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const screenOptions = {
  headerShown: true,
  animationEnabled: false,
};

export default function DrawerNavigation(): JSX.Element {
  const categories = useSelector(
    (state: RootState) => state.categorySlice.categories,
  );

  const ManageCategoryStack = () => (
    <Stack.Navigator
      initialRouteName={MANAGE_CATEGORIES}
      screenOptions={screenOptions}>
      <Stack.Screen name={MANAGE_CATEGORIES} component={ManageCategories} />
      <Stack.Screen name={ADD_CATEGORY} component={AddNewCategory} />
    </Stack.Navigator>
  );

  const ManageCategoryItemStack = ({route}) => {
    const {name} = route;

    return (
      <Stack.Navigator screenOptions={screenOptions}>
        {/* Use categoryName prop to dynamically set the screen name */}
        <Stack.Screen
          name={name} // Use the categoryName prop as the screen name
          component={CategoryItems}
        />
        <Stack.Screen
          name={NAVIGATION_CONSTANT.ADD_CATEGORY_ITEMS} // Use the categoryName prop as the screen name
          component={AddCategoryItem}
        />
        {/* ... other screens */}
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator initialRouteName={DASHBOARD}>
        <Drawer.Screen name={DASHBOARD} component={Dashboard} />
        {categories.map(category => (
          <Drawer.Screen
            key={category.categoryName}
            name={category.categoryName} // Use categoryName as the screen name
            options={{title: category.categoryName, headerShown: false}} // Set title for the screen
            component={(props: any) => (
              <ManageCategoryItemStack {...props} category={category} />
            )}
          />
        ))}
        <Drawer.Screen
          options={{headerShown: false}}
          name={CATEGORY}
          component={ManageCategoryStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
