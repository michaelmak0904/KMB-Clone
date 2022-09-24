import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'

const SearchRow = ({
    id,
    code,
    to
}) => {
    return (
        <TouchableOpacity className="flex-row items-center space-x-5 h-16 border-b border-gray-500">
            <View className="flex-1 ml-3 flex-row items-center">
                <Text className="w-12 text-lg">{code}</Text>
                <View className='pl-2 flex-row items-center'>
                    <Text className="mr-2 text-sm">往</Text>
                    <Text className="text-lg font-bold">{to}</Text>
                </View>
            </View>
            <View className="items-center  mr-5  text-center">
                <ArrowRightIcon color='#000000' />
            </View>
        </TouchableOpacity >
    )
}

export default SearchRow