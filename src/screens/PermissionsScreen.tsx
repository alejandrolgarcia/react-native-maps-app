import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlackButtom } from '../components/BlackButtom';
import { PermissionsContext } from '../context/PermissionsContext';

export const PermissionsScreen = () => {

    const { permissions, askLocationPermission } = useContext( PermissionsContext );

    return (
        <View style={ styles.container }>

            <Text style={ styles.title }>Se necesita habilitar permisos de GPS para utilizar esta aplicación</Text>

            <BlackButtom
                title="Permiso GPS"
                onPress={ askLocationPermission }
            />

            <Text style={{ marginTop: 20 }}>
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
    },

    title: {
        width: 250,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    }
});
