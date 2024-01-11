import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, IconButton, MD3Colors} from 'react-native-paper';

export default function WelcomeScreen() {
  const nav = useNavigation();

  return (
    <SafeAreaView style={styles.wc_mainSafe}>
      <View style={styles.wc_view}>
        <TouchableOpacity onPress={()=>nav.navigate('About')} style={styles.about}>
          <Text style={styles.aboutTxt}>i</Text>
        </TouchableOpacity>
        <Text style={[styles.wc_header, {fontSize: wp(12)}]}>Welcome</Text>
        <Text style={[styles.wc_slogan, {fontSize: wp(4)}]}>
          The Future is here, powered by AI.
        </Text>
      </View>
      <View style={styles.wc_img}>
        <Image
          source={require('../../assets/images/welcome.png')}
          style={{width: wp(75), height: wp(75)}}
        />
      </View>
      {/* <TouchableOpacity onPress={()=>nav.navigate('Home')} className="bg-emerald-600 mx-5 p-4 rounded-2xl" >
        <Text style={{fontSize: wp(6)}} className="text-center font-bold to-white text-2xl" >
            Get Started
        </Text>
      </TouchableOpacity> */}
      <Button
        style={styles.wc_btn}
        mode="contained"
        onPress={() => {
          nav.navigate('Home');
        }}>
        Join Chat
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wc_mainSafe: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'spaceAround',
    backgroundColor: '#fff',
  },
  wc_view: {
    backgroundColor: '#63cc65',
    padding: 50,
    display:"flex"
  },
  wc_header: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  wc_slogan: {
    textAlign: 'center',
    letterSpacing: 1,
    color: '#d9d9d9',
    fontWeight: '600',
  },
  wc_img: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wc_btn: {
    marginTop: 50,
    backgroundColor: '#36894d',
    margin: 5,
  },
  about: {
    right:40,
    top:-35,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
  },
  aboutTxt:{
    color:"#63cc65"
  }
});
