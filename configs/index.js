import { styled } from "nativewind"
import { View , Text} from "react-native"

export const HOME = 'Trang chủ'
export const SAVED = 'Đã lưu'
export const SETTING = 'Cài đặt'
export const LIGHT_THEME = 'light'
export const DARK_THEME = 'dark'
export const DARK_COLOR ='#282A3A'
export const ViewMain = styled(View, `p-5 bg-white dark:bg-[${DARK_COLOR}] h-screeN`);

export const toastConfig = {
    'success': (internalState) => (
      <View className="w-[90%] h-[100px] bg-green-600">
        <Text>{internalState.text1}</Text>
        <Text>{internalState?.text2}</Text>
      </View>  
    ),
    'error': () => {
        <View style={{ height: 60, width: '100%', backgroundColor: 'pink' }}>
        <Text>{internalState.text1}</Text>
      </View>  
    },
    'info': () => {
        <View style={{ height: 60, width: '100%', backgroundColor: 'pink' }}>
        <Text>{internalState.text1}</Text>
      </View>  
    },
    'any_custom_type': () => {}
  }