import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const BusRow = ({
    id,
    route,
    to,
    station,
    estimated_time
}) => {
    return (
        <TouchableOpacity className="flex-row items-center space-x-5 h-20 border-b border-gray-500">
            <Text className="text-2xl pl-1 w-20 font-bold">{route}</Text>
            {/* route */}
            <View className="flex-1">
                <Text className="text-2xl font-bold">{to}</Text>
                <Text className="text-xl">{station}</Text>
                {/* to,station */}
            </View>
            <View>
                <Text className="text-2xl font-bold p-5 text-sky-900">{estimated_time}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default BusRow