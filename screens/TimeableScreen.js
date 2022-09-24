import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Timeable } from '../data/Schedule'

const TimeableScreen = ({ route }) => {
  const bus_route = "";
  const bus_to = "";

  const [busSchedule, setBusSchedule] = useState([])

  useEffect(() => {
    Timeable?.filter(function (item) {
      return item.route == bus_route;
    }).map((schedule) => (
      setBusSchedule(schedule.schedule)
    ))
  }, [])

  return (
    <View className="flex-1 h-full bg-white ">
      <ScrollView>
        <View className="flex-1 bg-gray-200 py-2 px-4">
          <Text className="text-lg font-semibold">{bus_route}往{bus_to}</Text>
        </View>
        <View className=" ">
          {busSchedule.map((item) => (
            <View className="my-4 px-10 flex-col" key={bus_route + item.day}>
              <Text className="font-medium">
                {item.day}
              </Text>
              <View>
                {item.time.map((period) => (
                  <View className="flex-row border-b-2 my-2 border-gray-100" key={bus_route + item.day + period.range}>
                    <Text className="w-1/2">{period.range}</Text>
                    <Text className="flex-1 font-medium">{period.minutes}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default TimeableScreen