import React from 'react';
import { useContext } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';
import { PermissionsContext } from '../context/PermissionsContext';

export const PermissionsScreen = () => {

    const { permissions, askLocationPermission } = useContext( PermissionsContext );

    return (
        <View style={ styles.container }>

            <Text>PermissionsScreen</Text>

            <Button
                title="Permiso GPS"
                onPress={ askLocationPermission }
            />

            <Text>
                { JSON.stringify( permissions, null, 5 ) }
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
