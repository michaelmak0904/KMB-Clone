import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LocationMarkerIcon, AcademicCapIcon, ArrowRightIcon, ExclamationCircleIcon, HomeIcon, OfficeBuildingIcon } from 'react-native-heroicons/outline'
import { location_type } from "../enum/LocationType"

const LocationRow = ({
    id,
    name,
    type,
    lat,
    long
}) => {
    return (
        <TouchableOpacity className="flex-row items-center space-x-5 h-20 border-b border-gray-500">
            <View className="flex-1 ml-3 flex-row items-center">
                {(() => {
                    switch (type) {
                        case location_type.home:
                            return <HomeIcon color="#000" />
                        case location_type.work:
                            return <OfficeBuildingIcon color="#000" />
                        case location_type.school:
                            return <AcademicCapIcon color="#000" />
                        default:
                            return <LocationMarkerIcon color="#000" />
                    }
                })()}
                <View className='pl-2'>
                    <Text className="text-lg font-bold">{type}</Text>
                    <Text>{name}</Text>
                </View>
            </View>

            <View className="items-center  mr-5  text-center">
                <ArrowRightIcon color='#000000' />
            </View>
        </TouchableOpacity >
    )
}

export default LocationRow