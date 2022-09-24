import { View, Text, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MenuIcon, PencilIcon } from 'react-native-heroicons/outline';
import { club_news, favourite_locations } from "../data"
import LocationRow from '../components/LocationRow';

const ClubScreen = () => {
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
      title: '會員',
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
    <ScrollView>
      {club_news?.map((news) => (
        <TouchableOpacity className="h-48"
          key={news.id}>
          <Image
            className="flex-1"
            source={{
              uri: news.image
            }} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default ClubScreen