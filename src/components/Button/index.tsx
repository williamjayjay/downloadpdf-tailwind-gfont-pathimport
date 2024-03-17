import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"
import colors from '@/styles/colors.json'

type Props = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      className=" bg-main-900 w-48 h-14 rounded-lg items-center justify-center "
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.main[50]} size="small" />
      ) : (
        <Text className="font-quattrocentoregular text-xl text-main-50 uppercase " >{title}</Text>
      )}
    </TouchableOpacity>
  )
}
