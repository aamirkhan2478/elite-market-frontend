import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DrawerIcon = ({src}) => {
  return (
    <Image source={src} style={styles.image}/>
  )
}

export default DrawerIcon

const styles = StyleSheet.create({
    image:{
        width:20,
        height:20,
    }
})