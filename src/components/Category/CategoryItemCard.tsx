import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import {StyleSheet, View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors';
import {FieldProps} from '../../utils';
import FlatListWrapper from '../FlatListWrapper';
import TextWrapper from '../TextWrapper';
interface CategoryItemCardProps {
  title: string;
  fields: FieldProps[];
  handleRemoveCategoryItem?: () => void;
  handleChangeFieldValue?: (
    newName: string,
    type: string,
    index: number,
    checked?: boolean,
    date?: Date,
  ) => void;
  handleAddNewField?: (newName: string) => void;
  handleEditCategoryItem?: () => void;
  editable: boolean;
  action?: boolean;
}

const CategoryItemCard: React.FC<CategoryItemCardProps> = ({
  title = 'Card Title',
  fields,
  editable = false,
  action = true,
  handleChangeFieldValue,
  handleRemoveCategoryItem,
  handleEditCategoryItem,
}) => {
  const date = new Date();
  const RightContent = () => {
    return action ? (
      <Icon onPress={handleEditCategoryItem} name="edit" size={26} />
    ) : (
      <></>
    );
  };

  const handleNumericChange = (
    value: string,
    item: FieldProps,
    index: number,
  ) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    handleChangeFieldValue?.(
      item.type == 'Number' ? numericValue : value,
      item.type,
      index,
    );
  };

  return (
    <Card style={styles.container}>
      <Card.Title title={title} right={RightContent} />
      <Card.Content>
        <FlatListWrapper
          data={fields}
          renderItem={({item, index}) => {
            return item.type == 'Text' || item.type == 'Number' ? (
              <TextInput
                label={item.name}
                editable={editable}
                mode="outlined"
                value={item.attributeValue}
                onChangeText={value =>
                  handleNumericChange?.(value, item, index)
                }
              />
            ) : item.type == 'Checkbox' ? (
              <View style={styles.flexRow}>
                <CheckBox
                  disabled={!editable}
                  value={item?.checked ?? false}
                  onValueChange={newValue =>
                    handleChangeFieldValue?.('', item.type, index, newValue)
                  }
                />
                <TextWrapper
                  style={[{left: 10}]}
                  variant="h5"
                  color={colors.black}>
                  {item.name}
                </TextWrapper>
              </View>
            ) : item.type == 'Date' ? (
              <View style={styles.flexRow}>
                <TextWrapper variant="h5" color={colors.black}>
                  {`${item.name} :`}
                </TextWrapper>
                <DateTimePicker
                  disabled={!editable}
                  value={item?.date ? new Date(item.date) : date}
                  display="default"
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      handleChangeFieldValue?.(
                        '',
                        item.type,
                        index,
                        false,
                        selectedDate,
                      );
                    }
                  }}
                />
              </View>
            ) : (
              <></>
            );
          }}
        />
        {action && (
          <Button
            mode="outlined"
            icon={'delete'}
            style={styles.btn}
            onPress={handleRemoveCategoryItem}>
            Removed
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  categoryTxt: {
    marginBottom: 6,
  },
  btn: {
    marginTop: 8,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CategoryItemCard;
