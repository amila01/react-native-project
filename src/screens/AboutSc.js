import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Text, Image, Touchable, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';



export default function AboutScreen() {
  const nav = useNavigation()


  return (
    <SafeAreaView style={styles.wc_mainSafe}>
      <View style={styles.wc_view}>
        <Text style={[styles.wc_header, {fontSize: wp(12)}]} >About Us</Text>
        <Text style={[styles.wc_slogan,{fontSize: wp(4)}]} >
          Team Siripala Allways go ahead
        </Text>
      </View>
      <View style={styles.wc_img} >
        {/* <Image source={require('../../assets/images/welcome.png')} style={{width:wp(75), height:wp(75)}} /> */}
      </View>
      <ImageBackground
              source={require('../../assets/images/backgroundimg.jpg')} // Replace with your image path
              style={
                [styles.cont1, {height: hp(50)}]
                // Adjust as needed
              }>
                <View style={styles.cont2}>
                    <Text style={styles.cont3}>Team Members</Text>
                    <Text style={styles.cont4}>Amila Silva</Text>
                    <Text style={styles.cont4}>Supun Lakshan</Text>
                    <Text style={styles.cont4}>Pradeep Kaliyawansha</Text>
                    <Text style={styles.cont4}>Asiri Vidanage</Text>
                    <Text style={styles.cont4}>MAF Saroth</Text>
                </View>
              </ImageBackground>
      <Button style={styles.wc_btn} mode="contained" onPress={() => {nav.navigate('Welcome')}}>
        Back To Home
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    cont1:{
        display:"flex",
        alignItems:"center",
        marginTop:10
    },
    cont2:{
        opacity:1,
        alignItems:"center"
    },
    cont3:{
        fontSize:30,
        fontWeight:"bold",
        borderColor:"green",
    },
    cont4:{
        fontSize:20,
        fontWeight:"400",
        borderColor:"green",
    },
  wc_mainSafe:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'spaceAround',
    backgroundColor: '#fff',
  },
  wc_view:{
    backgroundColor: '#63cc65',
    padding:50
  },
  wc_header:{
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: wp(10),
  },
  wc_slogan:{
    textAlign: 'center', 
    letterSpacing: 1, 
    color: '#d9d9d9', 
    fontWeight: '600',
  },
  wc_img:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wc_btn:{
    marginTop:50,
    backgroundColor:"#36894d",
    margin:5
  }
})