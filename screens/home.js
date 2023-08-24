import { styled } from "nativewind";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Services } from "../services";
import HttpClient from "../apis/axiosClient";

export const ViewMain = styled(View, "p-[3%]");
export const InputStyled = styled(
  TextInput,
  "rounded-2xl p-5 border-2 border-blue-500"
);
const Home = () => {
  const [data, setData] = useState([]);

  const getTask = async () => {
    const res = await Services.getAllTodo();
    if (res.status === 200) {
      setData(res.data);
    }
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getTask()
    }, 2000);
  }, []);
  const handleAddTask = async () => {
    const res = await Services.addTask({name : inputValue})
    if (res.status === 201) {
      onRefresh()
      setInputValue('')
    }
  }
  const handleDeleteTask = (item) => {
    Alert.alert('Thông báo' , 'Bạn có chắc chắn muốn xoá task này !'  , [
      {
        text : 'Huỷ' ,
        onPress : () => {}
      },
      {text: 'Xoá', onPress: async () => {
        const res = await Services.deleteTask(item.id)
        if (res.status === 200) {
          onRefresh()
        }
      }},
    ])
  };
  const handelEditTask = async (item) => {
    Alert.alert('Thông báo' , 'Bạn có chắc chắn muốn lưu task này !'  , [
      {
        text : 'Huỷ' ,
        onPress : () => {}
      },
      {text: 'Lưu', onPress: async () => {
        const newData = {
          name : item.name,
          taskId : item.id
        }
        const resSaveTask = await Services.savedTask(newData)
        if (resSaveTask.status === 201) {
          const resUpdateTask = await Services.updateTask(item.id ,{...item , saved : true})
          if (resUpdateTask.status === 200) {
            onRefresh()
          }
        }
      }},
    ])
   
  };
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    getTask();
  }, []);

  return (
    <ViewMain>
      <SafeAreaView className=" relative">
        <View className="flex-row justify-end items-center rounded-full border-2 border-blue-500">
          <TextInput
            placeholder="Nhập công việc cần làm ..."
            placeholderTextColor="gray"
            value={inputValue}
            onChangeText={setInputValue}
            className="pl-6 h-10 flex-1 text-base"
          />
          {
            inputValue && <TouchableOpacity className="rounded-full pr-5 focus:bg-red-500" onPress={handleAddTask}>
            <Text>
              <Ionicons name="add" color={"#000"} size={30} />
            </Text>
          </TouchableOpacity>
          }
       
        </View>
      </SafeAreaView>
      <SafeAreaView>
        <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
          className="h-full py-2"
          data={data}
          renderItem={({ item }) => (
            <View className="flex flex-row justify-between items-center p-4">
              <Text className="border-gray-300 w-3/4">{item.name}</Text>
              <View className="flex flex-row gap-2 justify-end items-center">
                <TouchableOpacity onPress={() => handleDeleteTask(item)}>
                  <Text>
                    <Ionicons name="trash" size={20} color={"red"} />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handelEditTask(item)}>
                  <Text>
                    <Ionicons name="create" size={20} color={"blue"} />
                  </Text>
                </TouchableOpacity>
                {
                  !item.saved && <TouchableOpacity onPress={() => handelEditTask(item)}>
                  <Text>
                    <Ionicons name="save" size={20} color={"red"} />
                  </Text>
                </TouchableOpacity>
                }
              
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </ViewMain>
  );
};

export default Home;
