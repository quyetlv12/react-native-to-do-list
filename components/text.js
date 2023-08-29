import { Text } from 'react-native'
const TextCpn = ({content , className , textDark ='text-white'}) => {
  return (
    <Text className={`text-[16px] font-bold text-black dark:${textDark} ${className}`}>{content}</Text>
  )
}
export default TextCpn