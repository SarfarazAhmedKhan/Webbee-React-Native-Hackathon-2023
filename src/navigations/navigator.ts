import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

// Define your root navigation params type here
type RootStackParamList = {
  // Your navigation routes and params here
  'Add Category': {} | undefined;
  'Add Category Items': {} | undefined;
  'Manage Categories': {} | undefined;
  // ... other routes
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

function navigate(
  name: keyof RootStackParamList,
  params?: RootStackParamList[keyof RootStackParamList],
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

function push(
  route: keyof RootStackParamList,
  params?: RootStackParamList[keyof RootStackParamList],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(route, params));
  }
}

function replace(
  route: keyof RootStackParamList,
  params?: RootStackParamList[keyof RootStackParamList],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(route, params));
  }
}

function pop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop());
  }
}

function popToTop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
}

const Navigator = {
  navigate,
  goBack,
  push,
  replace,
  pop,
  popToTop,
};

export const NAVIGATION_CONSTANT = {
  DASHBOARD: 'Dashboard',
  CATEGORY: 'Manage Categories',
  CATEGORY_ITEMS: 'Categories Items',
  MANAGE_CATEGORIES: 'Manage Categories',
  CATEGORIES_ITEMS: 'Category Items',
  ADD_CATEGORY: 'Add Category',
  ADD_CATEGORY_ITEMS: 'Add Category Items',
  DRAWER_NAV: 'DrawerNavigation',
};

export default Navigator;
