import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import colors from '../../theme/colors';
import {dimensions} from '../../theme/dimensions';
import {FieldProps, RootState, getAttributes} from '../../utils';
import DropDown from '../DropDown';
import FlatListWrapper from '../FlatListWrapper';
import TextWrapper from '../TextWrapper';

interface CategoryCardProps {
  title: string;
  fields: FieldProps[];
  titleFieldArray?: string[];
  fieldTitle: string;
  handleCategoryNameChange?: (newName: string) => void;
  handleSetTitleField?: (newName: string) => void;
  handleChangeFieldValue?: (
    newName: string,
    type: string,
    index: number,
  ) => void;
  handleAddNewField?: (newName: string) => void;
  handleRemoveField?: (index: number) => void;
  handleRemoveCategory?: () => void;
  handleEditCategory?: () => void;
  editable: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title = 'Card Title',
  fields,
  fieldTitle = 'UNAMED FIELD',
  titleFieldArray = [],
  handleCategoryNameChange,
  handleChangeFieldValue,
  handleRemoveCategory,
  handleAddNewField,
  handleRemoveField,
  editable = false,
  handleEditCategory,
  handleSetTitleField,
}) => {
  const rotaion = useSelector((state: RootState) => state.Orientation.rotaion);

  const RightContent = () => {
    return !editable ? (
      <Icon onPress={handleEditCategory} name="edit" size={20} />
    ) : (
      <></>
    );
  };

  return (
    <Card
      style={[
        styles.container,
        {
          width:
            !editable && dimensions.isTAB
              ? dimensions.WIDTH(100) / 2.15
              : dimensions.WIDTH(92),
        },
      ]}>
      <Card.Title
        title={title}
        subtitle={
          <DropDown
            opened={editable}
            title="TEXT"
            menuList={titleFieldArray}
            onSelect={value => handleSetTitleField?.(value)}>
            <TextWrapper
              variant="h5"
              style={[styles.subTitle]}
              color={
                colors.dark_blue
              }>{`TITLE FIELD: ${fieldTitle}`}</TextWrapper>
          </DropDown>
        }
        right={RightContent}
      />
      <Card.Content>
        <TextInput
          label="Category Name"
          mode="outlined"
          editable={editable}
          value={title}
          onChangeText={handleCategoryNameChange}
        />
        <FlatListWrapper
          style={{maxHeight: editable ? dimensions.WIDTH(35) : 'auto'}}
          data={fields}
          renderItem={({item, index}) => (
            <View style={styles.fieldContainer}>
              <View style={{flex: 1}}>
                <TextInput
                  label="Field"
                  editable={editable}
                  mode="outlined"
                  value={item.name}
                  onChangeText={
                    value => handleChangeFieldValue?.(value, 'name', index) // Notice the use of optional chaining
                  }
                />
              </View>
              <View style={styles.fieldInnerDiv}>
                <Card style={styles.fieldTxtDiv}>
                  <DropDown
                    opened={editable}
                    title={item.type}
                    isSelectionReflect={true}
                    menuList={editable ? getAttributes : []}
                    onSelect={value =>
                      handleChangeFieldValue?.(value, 'type', index)
                    }>
                    <TextWrapper
                      color={colors.blue}
                      variant="h6"
                      numberOfLines={1}
                      style={[{fontWeight: '600', textAlign: 'center'}]}>
                      {item.type}
                    </TextWrapper>
                  </DropDown>
                </Card>
                {editable && (
                  <Icon
                    onPress={() => handleRemoveField?.(index)}
                    name="delete"
                    size={26}
                    color={colors.black}
                  />
                )}
              </View>
            </View>
          )}
        />
      </Card.Content>
      {editable && (
        <DropDown
          opened={editable}
          title="TEXT"
          menuList={getAttributes}
          onSelect={value => handleAddNewField?.(value)}>
          <Button
            mode="outlined"
            icon={'plus'}
            style={{marginVertical: 10}}
            buttonColor={colors.dark_blue}
            textColor={colors.white}>
            ADD NEW FIELD
          </Button>
        </DropDown>
      )}
      {!editable && (
        <Button
          mode="outlined"
          icon={'delete'}
          onPress={handleRemoveCategory}
          style={{marginVertical: 10}}
          buttonColor={colors.dark_blue}
          textColor={colors.white}>
          REMOVE
        </Button>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dimensions.isTAB
      ? dimensions.WIDTH(100) / 2.15
      : dimensions.WIDTH(92),
    borderRadius: 20,
    padding: 8,
    margin: 16,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  triggerStyle: {
    borderWidth: 2,
    borderColor: colors.purple,
    paddingHorizontal: dimensions.WIDTH(4),
    paddingVertical: dimensions.WIDTH(2),
    borderRadius: 40,
  },
  triggerfieldTxt: {
    color: colors.purple,
    fontSize: 15,
  },
  fieldInnerDiv: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  fieldTxtDiv: {
    paddingHorizontal: dimensions.WIDTH(2),
    paddingVertical: 12,
    marginHorizontal: dimensions.WIDTH(3),
  },
  fieldTxt: {
    color: colors.purple,
    fontSize: 17,
  },
  btn: {
    borderRadius: 5,
    marginTop: 10,
  },
  subTitle: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.dark_blue,
    textDecorationStyle: 'dashed',
  },
});

export default CategoryCard;
