import { View, Text, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LocationMarkerIcon, PencilIcon, MenuIcon } from 'react-native-heroicons/outline';
import { buses, favourite_locations } from '../data'
import { FlatListSlider } from 'react-native-flatlist-slider';
import BusRow from '../components/BusRow';
import LocationRow from '../components/LocationRow';

const FavouriteScreen = () => {

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity className="m-2">
                    <MenuIcon color="#FFF" size={36} />
                </TouchableOpacity>

            ),
            headerRight: () => (
                <TouchableOpacity className="m-2">
                    <PencilIcon color="#FFF" size={28} />
                </TouchableOpacity>
            ),
            title: '收藏',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: "#EE3338"
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    }, []);

    return (
        <View className="flex-1">
            <View className="h-2/3 flex">
                <View className="bg-gray-300 py-1 flex-row items-center pl-2">
                    <LocationMarkerIcon color="gray" />
                    <Text className="ml-2">
                        收藏車站
                    </Text>
                </View>
                <ScrollView>
                    {buses?.map((bus) => (
                        <BusRow
                            // key , id , route , to , station , estimated_time
                            key={bus.id}
                            id={bus.id}
                            route={bus.route}
                            to={bus.to}
                            station={bus.station}
                            estimated_time={bus.estimated_time}
                        />
                    ))}
                </ScrollView>
            </View>
            <View className="h-1/3 flex">
                <View className="bg-gray-300 py-1 flex-row items-center pl-2">
                    <LocationMarkerIcon color="gray" />
                    <Text className="ml-2">
                        收藏地點
                    </Text>
                </View>
                <ScrollView>
                    {favourite_locations?.map((location) => (
                        <LocationRow
                            //id,    name,    type,    lat,    long
                            key={location.id}
                            id={location.id}
                            name={location.name}
                            type={location.type}
                            lat={location.lat}
                            long={location.long}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

export default FavouriteScreen