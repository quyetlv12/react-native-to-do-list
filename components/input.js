import {TextInput } from "react-native";
import React from "react";
import { styled ,useColorScheme } from "nativewind";
import { DARK_THEME } from "../configs";
const InputStyle = styled(TextInput , 'h-20 text-dark dark:text-white w-full rounded-lg')
const Input = ({ placeholder, value, onChangeText , width = 'w-full' , className }) => {
const {colorScheme} = useColorScheme()
  return (
    <InputStyle
      placeholder={placeholder}
      placeholderTextColor={colorScheme === DARK_THEME ? '#fff' : '#000'}
      value={value}
      onChangeText={onChangeText}
      className={`${width} ${className}`}
      style={{ color: colorScheme === DARK_THEME ? '#fff' : '#000'}}
    />
  );
};

export default Input;
