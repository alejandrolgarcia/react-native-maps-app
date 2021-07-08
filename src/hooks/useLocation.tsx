import Geolocation from '@react-native-community/geolocation';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Location } from '../interfaces/interfaces';

export const useLocation = () => {

    const [ hasLocation, setHasLocation ] = useState(false);
    const [routeLines, setRouteLines] = useState<Location[]>([]);

    const [initialPosition, setInitialPosition] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });

    const [userLocation, setUserLocation] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });

    const watchId = useRef<number>();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    /**
     * Obtener posición actual del dispositivo
     */
    useEffect(() => {          
        getCurrentLocation()
            .then( location => {

                if (!isMounted.current) return;

                setInitialPosition(location);
                setUserLocation(location);
                setRouteLines( routes => [ ...routes, location ]);
                setHasLocation(true);
            });

    }, []);

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise( (resolve, reject) => {

            Geolocation.getCurrentPosition(
                ({ coords }) => {

                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });

                },
    
                (err) => reject({ err }), 
                { 
                    enableHighAccuracy: true,
                    // timeout: 20000,
                    // maximumAge: 3600000
                }
            );
        });
    }

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({ coords }) => {

                if (!isMounted.current) return;

                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }

                setUserLocation( location );
                setRouteLines( routes => [ ...routes, location ]);
            },

            (err) => console.log({ err }), 
            { 
                enableHighAccuracy: true,
                // timeout: 20000,
                // maximumAge: 3600000,
                distanceFilter: 10
            }
        );
    }

    const stopFollowUserLocation = () => {
        if (watchId.current) 
            Geolocation.clearWatch(watchId.current);
    }

    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        stopFollowUserLocation,
        userLocation,
        routeLines
    }
}
