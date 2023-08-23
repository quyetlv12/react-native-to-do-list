import { styled } from 'nativewind'
import React, { useState } from 'react'
import { Button, FlatList, SafeAreaView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'

export const ViewMain = styled(View, 'p-[3%]')
export const InputStyled = styled(TextInput, 'rounded-lg p-5 border-2 border-blue-500')
const Home = () => {
  const handelAlert = () => {
    alert('hello')
  }
  const [inputValue, setInputValue] = useState('')
  return (
    <ViewMain>
      <SafeAreaView className="flex flex-row items-center p-4">
        <TouchableWithoutFeedback >
          <InputStyled
            focusable
            className="w-[80%]"
            onChangeText={setInputValue}
            value={inputValue}
            placeholder="Nhập việc cần làm ..."
            keyboardType="default"
          />
        </TouchableWithoutFeedback>
        <Button title='Thêm' onPress={handelAlert} className="w-[10%] text-center bg-blue-500"   color="#f194ff" />
      </SafeAreaView>
     
      <SafeAreaView>
        <FlatList
          className="h-full"
          data={[
            { key: 'Devin' },
            { key: 'Dan' },
            { key: 'Dominic' },
            { key: 'Jackson' },
            { key: 'quyet' },
            { key: 'le' },
            { key: 'van' },
          
          ]}
          renderItem={({ item }) => <View className="flex flex-row justify-between items-center p-4">
            <Text className="border-gray-300 w-3/4">{item.key}</Text>
            <Text className="border-gray-300 w-1/4 text-right">13333</Text>
          </View>}
        />
      </SafeAreaView>
    </ViewMain>
  )
}

export default Home