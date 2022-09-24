import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState, createContext } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeftIcon, ChatIcon, MenuIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ETAScreen from './ETAScreen';
import JourneyScreen from './JourneyScreen';
import TimeableScreen from './TimeableScreen';
import NoticeScreen from './NoticeScreen';
import { useIsFocused } from '@react-navigation/native';

const RouteScreen = ({ route }) => {

    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity className="m-2" onPress={() => navigation.goBack()}>
                    <ArrowLeftIcon color="#FFF" size={36} />
                </TouchableOpacity>

            ),
            headerRight: () => (
                <TouchableOpacity className="m-2">
                    <ChatIcon color="#FFF" size={36} />
                </TouchableOpacity>
            ),
            title: route.params.route + "往 " + route.params.to,
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: "#EE3338"
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    });

    const Tab = createMaterialTopTabNavigator();

    //ETAScreen
    //JourneyScreen
    //TimeableScreenb
    //NoticeScreen

    return (
        <Tab.Navigator screenOptions={{}}>
            <Tab.Screen name="ETA" component={ETAScreen} options={{ tabBarLabel: '到站時間', unmountOnBlur: true }}
                />
            <Tab.Screen name="Journey" component={JourneyScreen} options={{ tabBarLabel: '車程' }}

            />
            <Tab.Screen name="Timeable" component={TimeableScreen} options={{ tabBarLabel: '時間表' }}
                />
            <Tab.Screen name="Notice" component={NoticeScreen} options={{ tabBarLabel: '通告' }}
            />
        </Tab.Navigator >

    )
}

export default RouteScreen