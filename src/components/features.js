import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React from 'react'
import { View, Text,StyleSheet, Image } from 'react-native';
import { Avatar } from 'react-native-paper';

export default function Features() {
  return (
    <View style={{height:hp(60)}} >
        <Text style={[styles.fc_headerTxt,{fontSize:wp(6.5)}]} >Features</Text>
        <View style={[styles.fc_mainView, styles.fc_ViewColor1]} >
            <View style={styles.fc_view}>
                <Image style={{width:hp(4), height:hp(4)}} source={require('../../assets/images/chatgptIcon.png')} />
                <Text style={[styles.fc_title,{fontSize:wp(4.8)}]} >ChatGPT</Text>
            </View>
            <Text style={[styles.fc_subText,{fontSize:wp(3.8)}]} classname="text-gray-700 font-medium" >
            Engage in a captivating conversation with ChatGPT
            </Text>
        </View>
        <View style={[styles.fc_mainView, styles.fc_ViewColor2]} >
            <View style={styles.fc_view}>
                <Image style={{width:hp(4), height:hp(4)}} source={require('../../assets/images/dalleIcon.png')} />
                <Text style={[styles.fc_title,{fontSize:wp(4.8)}]} >DALL E</Text>
            </View>
            <Text style={[styles.fc_subText,{fontSize:wp(3.8)}]} classname="text-gray-700 font-medium" >
            Explore creative possibilities with DALL-E's image generation
            </Text>
        </View>
        <View style={[styles.fc_mainView, styles.fc_ViewColor3]} >
            <View style={styles.fc_view}>
                <Image style={{width:hp(4), height:hp(4)}} source={require('../../assets/images/smartaiIcon.png')} />
                <Text style={[styles.fc_title,{fontSize:wp(4.8)}]} >Smart AI</Text>
            </View>
            <Text style={[styles.fc_subText,{fontSize:wp(3.8)}]} classname="text-gray-700 font-medium" >
            Experience the brilliance of a smart AI companion
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({

    fc_headerTxt:{
        fontWeight: '600', 
        color: '#4a5568',
        paddingTop:10,
        paddingBottom:10
    },
    fc_mainView:{
        padding: 16, 
        borderRadius: 16,
        marginBottom:10
    },
    fc_view:{
        display:'flex',
        flexDirection:'row',
    },
    fc_title:{
        fontWeight: 'bold',
        color: '#4a5568',
        marginLeft:5
    },
    fc_subText:{
        color: '#4a5568', 
        fontWeight: '500',
    },
    fc_ViewColor1:{
        backgroundColor: '#a3e4d7', 
    },
    fc_ViewColor2:{
        backgroundColor: '#c9b0dd', 
    },
    fc_ViewColor3:{
        backgroundColor: '#a7f3f3', 
    },
})