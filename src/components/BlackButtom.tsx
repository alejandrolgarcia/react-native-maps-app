import React from 'react';
import { StyleSheet, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';

interface Props {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export const BlackButtom = ({ title, onPress, style = {} }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={ 0.8 }
            onPress={ onPress }
            style={{
                ...style as any,
                ...styles.blackButtom
            }}
        >
            <Text style={ styles.textButtom }>{ title }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    blackButtom: {
        height: 45,
        width: 200,
        backgroundColor: 'black',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        elevation: 6
    },

    textButtom: {
        color: 'white',
        fontSize: 18
    }
});