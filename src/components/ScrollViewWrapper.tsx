import React, {useState, useCallback} from 'react';
import {StyleSheet, RefreshControl, ScrollView} from 'react-native';
import colors from '../theme/colors';

interface ScrollViewWrapperProps {
  children: React.ReactNode;
  childStyle?: any; // You can replace 'any' with a more specific type if needed
  onRefresh?: () => void;
  contentInsetAdjustmentBehavior?: 'automatic';
}

const ScrollViewWrapper: React.FC<ScrollViewWrapperProps> = ({
  children,
  childStyle = styles.childStyle,
  onRefresh = () => {},
  ...props
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefreshLoad = useCallback(() => {
    setRefreshing(true);
    onRefresh();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [onRefresh]);

  return (
    <ScrollView
      {...props}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={childStyle}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefreshLoad} />
      }>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  childStyle: {
    flexGrow: 1,
    backgroundColor: colors.backgroundColor,
  },
});

export default ScrollViewWrapper;
