import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import {
    MenuIcon, ChatIcon
} from "react-native-heroicons/outline";
import { FlatListSlider } from 'react-native-flatlist-slider';
import BusRow from '../components/BusRow';
import LeftMenu from '../components/LeftMenu';
import buses from '../data'

const HomeScreen = () => {

    // const [buses, setBuses] = useState([]);
    const navigation = useNavigation()

    const images = [
        {
            image: 'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            desc: 'Silent Waters in the mountains in midst of Himilayas',
        }
    ]

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity className="m-2">
                    <MenuIcon color="#FFF" size={36} />
                </TouchableOpacity>

            ),
            headerRight: () => (
                <TouchableOpacity className="m-2">
                    <ChatIcon color="#FFF" size={36} />
                </TouchableOpacity>
            ),
            title: 'APP 1933',
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
            <LeftMenu />
            <FlatListSlider
                data={images}
                height={200}
                timer={5000}
                onPress={item => alert(JSON.stringify(item))}
                animation
            />

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
    )
}

export default HomeScreen

