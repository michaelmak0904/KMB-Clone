import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { GOOGLE_MAPS_APIKEY } from "@env"
import MapView, { Marker } from 'react-native-maps';
import { busStops } from '../data/BusStop'

const ETAScreen = ({ route }) => {

  console.log("Cuurent Route is", route.params.route)

  //Current Location store in redux
  const current_latitude = 22.3200
  const current_longitude = 114.2084

  const bus_route = route.params.route
  const bus_direction = route.params.direction == "I" ? "inbound" : "outbound"
  const [selectedItem, setSelectedItem] = useState(null)
  //seq , stop_name
  const [routeStops, setRouteStops] = useState([])
  const [ETA, setETA] = useState([])
  const [distance, setDistance] = useState(null)

  const getRouteStops = async () => {
    fetch('https://data.etabus.gov.hk/v1/transport/kmb/route-stop/' + bus_route + '/' + bus_direction + '/1')
      .then((response) => response.json())
      .then((responseJson) => {
        const routeStopResult = responseJson.data
        const tmpRouteStops = []
        routeStopResult.map((RouteStop) => (
          busStops.filter(function (item) {
            return item.stop == RouteStop.stop
          }).map((stop) => {
            const tmp = {}
            tmp.stop = stop.stop
            tmp.seq = RouteStop.seq
            tmp.name = stop.name_tc
            tmp.lat = stop.lat
            tmp.long = stop.long
            tmpRouteStops.push(tmp)
          })
        ))
        setRouteStops(tmpRouteStops)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const getETA = (stop_id) => {
    // /v1/transport/kmb/eta/A60AE774B09A5E44/40/1
    fetch('https://data.etabus.gov.hk/v1/transport/kmb/eta/' + stop_id + '/' + bus_route + '/1')
      .then((response) => response.json())
      .then((responseJson) => {
        setETA(responseJson.data)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const getTimediff = (eta_time) => {
    let next = new Date(eta_time)
    let now = new Date()
    return Math.floor((next.getTime() - now.getTime()) / 60000)
  }

  const getTravelTime = async (destination) => {
    //destinations=40.659569%2C-73.933783&origins=40.6655101%2C-73.89188969999998&mode=walking&key=AIzaSyBZ0YHoBPjAmkcsgvWnch3MW4rllsH_5RI
    fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=
      ${current_latitude},${current_longitude}&destinations=${destination.lat},${destination.long}&key=${GOOGLE_MAPS_APIKEY}`)
      .then((res) => res.json())
      .then((data) => {
        setDistance(data.rows[0].elements[0].distance.text)
      })
  }

  useEffect(() => {
    console.log(route)
    getRouteStops()

    // routeStops.map((routeStop) => (
    //   getStopDetails(routeStop.stop)
    //   setStopList()
    // ))
  },[]);

  return (
    <View className="flex-col h-full">
      <View className="h-1/2">
        <MapView
          className="flex-1"
          // mapType="mutedStandard"
          rotateEnabled={false}
          initialRegion={{
            latitude: 22.3200,
            longitude: 114.2084,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >

        </MapView>
      </View>
      <ScrollView className="h-1/2 border-t-8 border-t-[#EE3338] pt-4">
        {routeStops?.map((stop) => (
          <View className="flex-row border-b-2 border-gray-200 px-2" key={stop.seq}>
            <View className="w-1/4 border-r-4 border-[#EE3338]">
              {/* Distance between current location and stop location */}
              {
                stop.seq == selectedItem ?
                  <View className="justify-center items-center flex-1">
                    <Text className="font-normal text-lg">{distance}</Text>
                  </View>
                  :
                  null
              }
            </View>
            <TouchableOpacity className="flex-1 flex-col px-4 py-2" onPress={() => (
              setSelectedItem(stop.seq),
              getETA(stop.stop),
              getTravelTime(stop)
            )}>
              <Text className="font-semibold text-lg">{stop.seq}.{stop.name}</Text>
              <Text className="text-md font-light my-1">車資:$4.6</Text>
              {
                stop.seq == selectedItem ?
                  ETA.filter(function (item) {
                    return item.dir == route.params.direction
                  }).map((ETAItem) => (
                    getTimediff(ETAItem.eta) <= 0 ?
                      <View className="flex-row my-1 ml-12 flex-1" key={ETAItem.eta_seq}>
                        <Text className="text-lg font-medium text-sky-800">
                          已到達
                        </Text>
                      </View>
                      :
                      <View className="flex-row my-1 ml-12" key={ETAItem.eta_seq}>
                        <Text className="text-lg font-medium text-sky-800 w-10">
                          {getTimediff(ETAItem.eta)}
                        </Text>
                        <Text className="text-lg flex-1 "> 分鐘</Text>
                      </View>
                  ))
                  : null
              }
            </TouchableOpacity >
          </View >
        ))
        }
      </ScrollView >
    </View >
  )
}

export default ETAScreen