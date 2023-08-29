import { useEffect, useState } from "react";

import { styled } from "nativewind";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ViewMain } from "../configs";
import List from "../components/list";
import { Services } from "../services";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useIsFocused } from "@react-navigation/native";
import { isArrayEmpty } from "../utility";
import TextCpn from "../components/text";
import EmptyData from "../components/emptyData";

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

const Saved = () => {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const getTask = async () => {
    const res = await Services.getSavedTask();
    if (res.status === 200) {
      setData(res.data);
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
          const res = await Services.deleteSavedTask(item.id);
          if (res.status === 200) {
            //update task
            const resUpdateTask = await Services.updateTask(item.id, {
              ...item,
              saved: false,
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
  useEffect(() => {
    getTask();
  }, [isFocused]);

  return (
    <ViewMain className="p-5">
      <SafeAreaView>
        {!isArrayEmpty(data) ? (
          <List data={data} handleDeleteTask={handleDeleteTask} />
        ) : (
          <EmptyData />
        )}
      </SafeAreaView>
    </ViewMain>
  );
};

export default Saved;
