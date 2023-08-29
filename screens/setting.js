import React from 'react'
import { FlatList, SafeAreaView, Switch, Text, View } from 'react-native'
import { withExpoSnack } from 'nativewind';
import { useColorScheme } from 'nativewind'
import { DARK_THEME, ViewMain } from '../configs'
import TextCpn from '../components/text';


const Setting = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const Settings = [
    {
      id : 1,
      name : 'Chế độ sáng/tối'
    }
  ]
  return (
    <ViewMain>
      <SafeAreaView>
        <FlatList data={Settings} className="h-full py-2 px-3" renderItem={({item}) => (
          <View className="flex flex-row justify-between items-center px-2 py-5">
            <TextCpn content={item.name} />
            <Switch onChange={toggleColorScheme} value={colorScheme === DARK_THEME ? true : false}/>
          </View>
        )} />
      </SafeAreaView>
    </ViewMain>
  )
}

export default Setting