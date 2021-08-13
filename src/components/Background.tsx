import React from 'react'
import { useWindowDimensions } from 'react-native'
import { View } from 'react-native'

const Background = () => {

    const { width, height } = useWindowDimensions();

    return (
        <View
            style={{
                position:'absolute',
                top: -(height*0.568),
                backgroundColor: '#5856D6',
                width: width*2,
                height: height*2,
                transform: [
                    { rotate: '-70deg' }
                ]
            }}
        /> 
    )
}

export default Background
