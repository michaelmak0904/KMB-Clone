import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import {
    MenuIcon, ChatIcon
} from "react-native-heroicons/outline";
import { FlatListSlider } from 'react-native-flatlist-slider';
import BusRow from '../components/BusRow';

const HomeScreen = () => {

    // const [buses, setBuses] = useState([]);
    const navigation = useNavigation()

    // key , id , route , to , station , estimated_time    
    const buses = [
        {
            id: 1,
            route: "59M",
            to: "荃灣站",
            station: "屯門碼頭總站",
            estimated_time: 2
        },
        {
            id: 2,
            route: "259D",
            to: "鯉魚門村",
            station: "屯門市中心",
            estimated_time: 6
        },
        {
            id: 3,
            route: "59X",
            to: "旺角東站",
            station: "屯門碼頭總站",
            estimated_time: 18
        },
        {
            id: 4,
            route: "59M",
            to: "荃灣站",
            station: "屯門碼頭總站",
            estimated_time: 2
        },
        {
            id: 5,
            route: "259D",
            to: "鯉魚門村",
            station: "屯門市中心",
            estimated_time: 6
        },
        {
            id: 6,
            route: "59X",
            to: "旺角東站",
            station: "屯門碼頭總站",
            estimated_time: 18
        },
        {
            id: 7,
            route: "59M",
            to: "荃灣站",
            station: "屯門碼頭總站",
            estimated_time: 2
        },
        {
            id: 8,
            route: "259D",
            to: "鯉魚門村",
            station: "屯門市中心",
            estimated_time: 6
        },
        {
            id: 9,
            route: "59X",
            to: "旺角東站",
            station: "屯門碼頭總站",
            estimated_time: 18
        },
        {
            id: 10,
            route: "59M",
            to: "荃灣站",
            station: "屯門碼頭總站",
            estimated_time: 2
        },
        {
            id: 11,
            route: "259D",
            to: "鯉魚門村",
            station: "屯門市中心",
            estimated_time: 6
        },
        { 
            id: 12,
            route: "59X",
            to: "旺角東站",
            station: "屯門碼頭總站",
            estimated_time: 18
        },
    ]


    const images = [
        {
            image: 'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            desc: 'Silent Waters in the mountains in midst of Himilayas',
        }
    ]

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity>
                    <MenuIcon size={32} />
                </TouchableOpacity>

            ),
            headerRight: () => (
                <TouchableOpacity>
                    <ChatIcon size={32} />
                </TouchableOpacity>
            ),
        })
    }, []);

    return (
        <View className="flex-1">

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

