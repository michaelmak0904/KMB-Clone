import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import {
    MenuIcon, ChatIcon
} from "react-native-heroicons/outline";
import { FlatListSlider } from 'react-native-flatlist-slider';
import BusRow from '../components/BusRow';
import LeftMenu from '../components/LeftMenu';
import { buses, club_news } from '../data'
import * as Location from 'expo-location';
import findNearestLocation from 'map-nearest-location';
import { stoplist } from '../data/StopList'

const HomeScreen = () => {
    //const [stopId, setStopId] = useState()

    const [myLocation, setMyLocation] = useState({})

    //const [stopList, setStopList] = useState([])

    const [routeDetails, setrouteDetails] = useState();

    // {
    //     "stop":"1D944152BA58ABF3",
    //     "name_en":"WU PIK HOUSE WU KING ESTATE",
    //     "name_tc":"湖景邨湖碧樓",
    //     "name_sc":"湖景邨湖碧楼",
    //     "lat":"22.373681",
    //     "long":"113.964085"
    //  },

    //https://data.etabus.gov.hk/

    function getNearStopList(stopId) {
        fetch('https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/' + stopId)
            .then((response) => response.json())
            .then((responseJson) => {
                setrouteDetails(responseJson.data)
            })
            .catch((error) => {
                console.error(error);
            })
    }

    useEffect(() => {
        (async () => {
            getNearStopList("216AEF6F6541ECF1")

            return

            console.log("Start Get Current Location")

            //Check if has permission to access location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            //Get the Current Position
            console.log("Get the Current Position")
            let location = await Location.getCurrentPositionAsync({});
            myLocation.lat = location.coords.latitude
            myLocation.lng = location.coords.longitude

            //Parse the lat and long from string to float for findNearestLocation process
            //console.log("Parse the lat and long from string to float for findNearestLocation process")
            // stoplist.map((stop) => {
            //     console.log(stop)
            //     stop_location = {}
            //     stop_location.lat = parseFloat(stop.lat)
            //     stop_location.lng = parseFloat(stop.long)

            //     locations.push(stop_location)
            // })

            //Get the nearest location stop
            console.log("myLocation", myLocation)
            const nearestLocation = findNearestLocation(myLocation, stoplist);
            console.log("nearestLocation", nearestLocation)

            getNearStopList(nearestLocation.location.stop)

            // stoplist
            //     .find(item =>
            //         item.lat == nearestLocation.location.lat &&
            //         item.lng == nearestLocation.location.lng)
            //     .map((stop) => {
            //         console.log("STOP ID :" + stop.stop)
            //         //stop.stop is bus stop id
            //         getNearStopList(stop.stop)
            //     })

        })();
    }, []);

    const [counter, setcounter] = useState([]);
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
            {/* <LeftMenu /> */}
            <FlatListSlider
                data={club_news}
                height={200}
                timer={5000}
                onPress={item => alert(JSON.stringify(item))}
                animation
            />

            <ScrollView>

                {routeDetails?.filter(function (item) {
                    return item.service_type == 1;
                }).map((bus) => (
                    < BusRow
                        // key , id , route , to , station , estimated_time
                        key={bus.route + bus.seq + bus.service_type + bus.dir + bus.eta_seq}
                        id={bus.seq}
                        route={bus.route}
                        to={bus.dest_tc}
                        station={bus.rmk_tc}
                        direction={bus.dir}
                        estimated_time={bus.eta ? bus.eta : 0}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default HomeScreen

