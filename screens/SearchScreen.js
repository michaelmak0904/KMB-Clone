import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { MenuIcon, PencilIcon } from 'react-native-heroicons/outline';
import { bus_routes } from '../data'
import SearchRow from '../components/SearchRow';

const SearchScreen = () => {
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
            title: '搜尋',
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
        <View className="flex-1 flex-col">
            <View className="h-20 bg-gray-300 ">
                <TextInput className="flex-1 bg-white text-center text-lg justify-center m-3" keyboardType="number-pad" placeholder='輸入巴士號碼'></TextInput>
            </View>
            <ScrollView>
                {bus_routes?.map((route) => (
                    <SearchRow
                        // key , id , route , to , station , estimated_time
                        key={route.id}
                        id={route.id}
                        code={route.code}
                        to={route.to}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default SearchScreen