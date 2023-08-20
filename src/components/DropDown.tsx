import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import colors from '../theme/colors';
import { dimensions } from '../theme/dimensions';
import TextWrapper from './TextWrapper';

const {WIDTH} = dimensions;

interface DropDownProps {
  opened?: boolean;
  children: React.ReactNode;
  title: string;
  menuList: string[];
  onSelect: (item: string) => void;
  isSelectionReflect?: boolean;
  titleStyle?: any;
  triggerStyle?: any;
}

function DropDown({
  opened = true,
  menuList = [],
  title = 'Title',
  onSelect,
  isSelectionReflect = false,
  titleStyle,
  children,
  ...props
}: DropDownProps): JSX.Element {
  const [selectedItem, setSelectedItem] = useState('TEXT');

  return (
    <Menu>
      <MenuTrigger
        disabled={menuList.length == 0}
        customStyles={{
          triggerTouchable: {
            underlayColor: 'white',
            activeOpacity: 1,
          },
        }}>
        {children}
      </MenuTrigger>
      <MenuOptions
        optionsContainerStyle={{
          marginTop: WIDTH(5),
          borderRadius: WIDTH(3),
          paddingBottom: WIDTH(2.5),
        }}>
        {menuList.map((item, index) => {
          return (
            <>
              <MenuOption
                key={index}
                style={styles.menuOption}
                onSelect={() => {
                  setSelectedItem(item);
                  onSelect && onSelect(item);
                }}>
                <TextWrapper
                  variant="h5"
                  color={colors.black}
                  style={[
                    {
                      marginLeft: WIDTH(3),
                      color:
                        selectedItem === item ? colors.new_blue : colors.black,
                    },
                  ]}>
                  {item}
                </TextWrapper>
              </MenuOption>
              <Divider />
            </>
          );
        })}
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: WIDTH(3.5),
  },
});

export default DropDown;
