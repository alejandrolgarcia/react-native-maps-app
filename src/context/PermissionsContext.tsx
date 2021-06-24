import React, { useState, createContext, useEffect } from 'react';
import { AppState, Platform } from 'react-native';
import { PERMISSIONS, PermissionStatus, request, check, openSettings } from 'react-native-permissions';


export interface PermissionState {
    locationStatus: PermissionStatus;
}

/**
 * Estado inicial
 */
export const permissionInitState: PermissionState = {
    locationStatus: 'unavailable',
}

/**
 * Crear context
 */
type PermissionsContextProps = {
    permissions: PermissionState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
}

export const PermissionsContext = createContext({} as PermissionsContextProps);

/**
 * Crear provider
 */
export const PermissionsProvider = ({ children }: any ) => {

    const [ permissions, setPermissions ] = useState( permissionInitState);

    useEffect(() => {

        AppState.addEventListener('change', state => {

            if ( state !== 'active' ) return;

            checkLocationPermission();

        });
        
    }, []);

    const askLocationPermission = async () => {

        let permissionStatus: PermissionStatus;

        if (Platform.OS === 'ios') {

            // permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
            permissionStatus = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );

        } else {

            // permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
            permissionStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );

        }

        if ( permissionStatus === 'blocked' ) {
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });


    }
    const checkLocationPermission = async () => {
        let permissionStatus: PermissionStatus;

        if (Platform.OS === 'ios') {

            // permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
            permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );

        } else {

            // permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
            permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );

        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });
    }

    return (
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission,
        }}>
            { children }
        </PermissionsContext.Provider>
    )
}
