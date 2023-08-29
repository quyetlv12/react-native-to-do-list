import { View, Text, Image } from "react-native";
import React from "react";
import TextCpn from "./text";

const EmptyData = () => {
  return (
    <View className="flex flex-1 items-center justify-center mt-[5%] h-full">
      <Image
        source={require("../assets/empty-icon.png")}
        className="w-72 h-72 mb-3"
      />
      <TextCpn content={"Không có dữ liệu nào ở đây !"} className={"mt-5"} />
    </View>
  );
};

export default EmptyData;
