import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  RefreshControl,
  FlatList,
  FlatListProps,
  View,
  Text,
} from 'react-native';
import colors from '../theme/colors';
import TextWrapper from './TextWrapper';

interface FlatListWrapperProps<ItemT> extends FlatListProps<ItemT> {
  childStyle?: any; // You can replace 'any' with a more specific type if needed
  onRefresh?: () => void;
  contentInsetAdjustmentBehavior?: 'automatic';
  emptyText?: string; // New prop to define the empty data message
}

function FlatListWrapper<ItemT>({
  childStyle = styles.childStyle,
  onRefresh = () => {},
  emptyText = 'No data available', // Default message for empty data
  ...props
}: FlatListWrapperProps<ItemT>): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);

  const onRefreshLoad = useCallback(() => {
    setRefreshing(true);
    onRefresh();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [onRefresh]);

  return (
    <FlatList
      {...props}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={childStyle}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefreshLoad} />
      }
      keyExtractor={(item, index) => `${item}-${index}`}
      ListEmptyComponent={() => (
        <View style={styles.emptyListContainer}>
          <TextWrapper
            variant="h4"
            color={colors.black}
            style={[styles.emptyText]}>
            {emptyText}
          </TextWrapper>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  childStyle: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingVertical: 16,
  },
  itemSeparator: {
    height: 5,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.gray, // Adjust color as needed
  },
});

export default FlatListWrapper;
