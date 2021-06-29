import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useLocation } from '../hooks/useLocation'
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab';



export const Map = () => {

    const { hasLocation, initialPosition} = useLocation();

    if ( !hasLocation  ) {
        return <LoadingScreen />
    }

    return (
        <>
            <MapView
                style={{ flex: 1 }}
                // provider={ PROVIDER_GOOGLE }
                showsUserLocation
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitud,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >

                {/* <Marker
                    image={ require('../assets/custom-marker.png') }
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title="Este es el título"
                    description="Esta es la descripción"
                /> */}

            </MapView>

            <Fab
                iconName="star-outline"
                onPress={ () => console.log('Hola Fab') }
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,

                }}
            />
            
        </>
    )
}
