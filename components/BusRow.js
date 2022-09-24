import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ExclamationCircleIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { setRouteDetails } from "../slices/navSlice"

const BusRow = ({
    id,
    route,
    to,
    station,
    direction,
    estimated_time
}) => {

    const navigation = useNavigation()
    const [ETA, setETA] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        let next = new Date(estimated_time);

        let now = new Date()

        setETA(Math.floor((next.getTime() - now.getTime()) / 60000))
    }, [])

    return (
        <>
            <TouchableOpacity onPress={() => (dispatch(setRouteDetails({
                id: id,
                route: route,
                to: to,
                direction: direction,
                station: station
            })), navigation.navigate('Route', {
                id: id,
                route: route,
                to: to,
                direction: direction,
                station: station
            }))}
                className="flex-row items-center space-x-5 h-20 border-b border-gray-500" >
                <Text className="text-2xl pl-2 w-20 font-bold">{route}</Text>
                {/* route */}
                <View className="flex-1">
                    <Text className="text-2xl font-bold">{to}</Text>
                    <Text className="text-md text-gray-400">{station}</Text>
                    {/* to,station */}
                </View>
                {
                    estimated_time ?
                        ETA && ETA > 0 ?
                            <View className="flex-col items-center  mr-5  text-center">
                                <Text className="text-2xl font-medium text-center text-sky-700">{ETA}</Text>
                                <Text className="text-xs  font-medium text-gray-400  text-center">分鐘</Text>
                            </View>
                            :
                            <View className="flex-col items-center  mr-5  text-center">
                                <Text className="text-2xl font-medium text-center text-sky-700">已到達</Text>
                            </View>
                        :
                        <View className="flex-col items-center  mr-5  text-center">
                            <ExclamationCircleIcon color="blue" size={30} />
                        </View>
                }
            </TouchableOpacity >
        </>
    )
}

export default BusRow