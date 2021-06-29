import Geolocation from '@react-native-community/geolocation';
import { useState } from 'react';
import { useEffect } from 'react';
import { Location } from '../interfaces/interfaces';

export const useLocation = () => {

    const [ hasLocation, setHasLocation ] = useState(false);
    const [initialPosition, setInitialPosition] = useState<Location>({
        latitude: 0,
        longitud: 0,
    });
    /**
     * Obtener posición actual del dispositivo
     */
    useEffect(() => {
        Geolocation.getCurrentPosition(
            ({ coords }) => {

                setInitialPosition({
                    latitude: coords.latitude,
                    longitud: coords.longitude
                });

                setHasLocation(true);

            },

            (err) => console.log({ err }), { enableHighAccuracy: true }
        );
    }, []);

    return {
        hasLocation,
        initialPosition
    }
}
