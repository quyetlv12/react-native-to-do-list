import { View, Text, FlatList, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import TextCpn from './text'
import Ionicons from "react-native-vector-icons/Ionicons";
import { DARK_MODE } from 'nativewind/dist/utils/selector';

const List = ({data , refreshControl = undefined , handleDeleteTask = undefined , handleSelectTagEdit  = undefined, handleSaveTask  = undefined}) => {
  return (
   <FlatList data={data} refreshControl={refreshControl}   className="h-full py-2" renderItem={({ item, index }) => (
    <View
      className={`flex flex-row justify-between items-center rounded-lg mb-2 dark:bg-white p-4 ${
        index + 1 !== data.length
          ? "border-b-[1px] border-gray-200 dark:border-white"
          : null
      }`}
    >
      <TextCpn className="w-3/4" content={item.name} textDark={'text-black'} />
      <View className="flex flex-row gap-2 justify-end items-center">
        {
            handleDeleteTask && <TouchableOpacity onPress={() => handleDeleteTask(item)}>
            <Text>
              <Ionicons name="trash" size={20} color={"red"} />
            </Text>
          </TouchableOpacity>
        }
        {
            handleSelectTagEdit && <TouchableOpacity onPress={() => handleSelectTagEdit(item)}>
            <Text>
              <Ionicons name="create" size={20} color={"blue"} />
            </Text>
          </TouchableOpacity>
        }
        {
            (handleSaveTask && !item.saved)  && (
                <TouchableOpacity onPress={() => handleSaveTask(item)}>
                  <Text>
                    <Ionicons name="save" size={20} color={"red"} />
                  </Text>
                </TouchableOpacity>
              )
        }
      </View>
    </View>
  )} />
  )
}

export default List