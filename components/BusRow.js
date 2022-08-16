import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ExclamationCircleIcon } from 'react-native-heroicons/outline'



const BusRow = ({
    id,
    route,
    to,
    station,
    estimated_time
}) => {
    return (
        <TouchableOpacity className="flex-row items-center space-x-5 h-20 border-b border-gray-500">
            <Text className="text-2xl pl-2 w-20 font-bold">{route}</Text>
            {/* route */}
            <View className="flex-1">
                <Text className="text-2xl font-bold">{to}</Text>
                <Text className="text-xl">{station}</Text>
                {/* to,station */}
            </View>

            {estimated_time ?
                <View className="flex-col items-center  mr-5  text-center">
                    <Text className="text-2xl font-medium text-center text-sky-700">{estimated_time}</Text>
                    <Text className="text-xs  font-medium text-gray-400  text-center">分鐘</Text>
                </View>
                :
                <View className="flex-col items-center  mr-5  text-center">
                    <ExclamationCircleIcon color="blue" size={30} />
                </View>
            }


        </TouchableOpacity >
    )
}

export default BusRow