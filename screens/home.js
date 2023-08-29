import { useCallback, useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Input from "../components/input";
import TextCpn from "../components/text";
import { DARK_THEME, ViewMain } from "../configs";
import { Services } from "../services";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useColorScheme } from "nativewind";
import List from "../components/list";
import { useIsFocused } from "@react-navigation/native";
import { isArrayEmpty } from "../utility";
import EmptyData from "../components/emptyData";
const Home = () => {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const { colorScheme } = useColorScheme();
  const getTask = async () => {
    const res = await Services.getAllTodo();
    if (res.status === 200) {
      setData(res.data);
    }
  };
  const [inputValue, setInputValue] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getTask();
    }, 2000);
  }, []);
  const handleAddTask = async () => {
    const res = await Services.addTask({ name: inputValue });
    if (res.status === 201) {
      getTask();
      setInputValue("");
      Toast.show({
        type: "success",
        text1: "Thông báo",
        text2: "Thêm mới thành công !",
      });
    }
  };
  const handleDeleteTask = (item) => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn xoá task này !", [
      {
        text: "Huỷ",
        onPress: () => {},
      },
      {
        text: "Xoá",
        onPress: async () => {
          const res = await Services.deleteTask(item.id);
          if (res.status === 200) {
            if (item.saved) {
              await Services.deleteSavedTask(item.savedId);
            }
            getTask();
            Toast.show({
              type: "success",
              text1: "Thông báo",
              text2: "Thao tác thành công !",
            });
          }
        },
      },
    ]);
  };
  const handleSaveTask = async (item) => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn lưu task này !", [
      {
        text: "Huỷ",
        onPress: () => {},
      },
      {
        text: "Lưu",
        onPress: async () => {
          const newData = {
            name: item.name,
            taskId: item.id,
          };
          const resSaveTask = await Services.savedTask(newData);
          if (resSaveTask.status === 201) {
            const resUpdateTask = await Services.updateTask(item.id, {
              ...item,
              saved: true,
              savedId: resSaveTask.data.id,
            });
            if (resUpdateTask.status === 200) {
              getTask();
              Toast.show({
                type: "success",
                text1: "Thông báo",
                text2: "Thao tác thành công !",
              });
            }
          }
        },
      },
    ]);
  };
  const handleEditTask = () => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn cập nhật task này !", [
      {
        text: "Huỷ",
        onPress: () => {},
      },
      {
        text: "Cập nhật",
        onPress: async () => {
          const newData = {
            ...itemSelect,
            name: inputValue,
          };
          const resUpdateTask = await Services.updateTask(
            itemSelect.id,
            newData
          );
          if (resUpdateTask.status === 200) {
            getTask();
            setInputValue("");
            setIsEdit(false);
            Toast.show({
              type: "success",
              text1: "Thông báo",
              text2: "Thao tác thành công !",
            });
          }
        },
      },
    ]);
  };
  const handleSelectTagEdit = async (item) => {
    await setIsEdit(true);
    await setItemSelect(item);
    await setInputValue(item.name);
  };
  useEffect(() => {
    getTask();
  }, [isFocused]);

  return (
    <ViewMain className="p-5">
      <SafeAreaView>
        <View className="flex flex-row justify-between items-center border-[1px] h-10 border-blue-500 dark:border-white px-2 rounded-2xl">
          <Input
            placeholder="Nhập công việc cần làm ..."
            placeholderTextColor="white"
            value={inputValue}
            onChangeText={setInputValue}
            width="w-[90%]"
            className={'text-red-500'}
          />
          {inputValue && (
            <View>
              {isEdit ? (
                <TouchableOpacity
                  className="rounded-full pr-5 focus:bg-red-500"
                  onPress={handleEditTask}
                >
                  <Text>
                    <Ionicons
                      name="checkmark-sharp"
                      color={"green"}
                      size={30}
                    />
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="rounded-full pr-5 focus:bg-red-500"
                  onPress={handleAddTask}
                >
                  <Text>
                    <Ionicons
                      name="add"
                      color={colorScheme === DARK_THEME ? "#fff" : "#000"}
                      size={30}
                    />
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        {!isArrayEmpty(data) ? (
          <List
            refreshControl={
              <RefreshControl
                title="Đang tải lại dữ liệu ..."
                size="large"
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            data={data}
            handleDeleteTask={handleDeleteTask}
            handleSelectTagEdit={handleSelectTagEdit}
            handleSaveTask={handleSaveTask}
          />
        ) : (
          <EmptyData />
        )}
      </SafeAreaView>
    </ViewMain>
  );
};

export default Home;
