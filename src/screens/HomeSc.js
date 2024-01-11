import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  TouchableWithoutFeedback, 
  Alert
} from 'react-native';
import Voice from '@react-native-voice/voice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Features from '../components/features';
import Tts from 'react-native-tts';
import {apiCall} from '../api/openAi';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs();

export default function HomeScreen() {
  const [result, setResult] = useState('');
  const [check, setCheck] = useState('');
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const scrollViewRef = useRef();
  const [fetchData, setFetchData] = useState(true)

  const speechStartHandler = e => {
    // console.log('speech start event', e);
  };
  const speechEndHandler = e => {
    setRecording(false);
    console.log('speech stop event', e);
  };
  const speechResultsHandler = e => {
    console.log('speech event: ',e);
    const text = e.value[0];
    setResult(text);
    setCheck(text)
  };
  useEffect(()=>{
    console.log("check")
    fetchResponse()
  },[check])

  const speechErrorHandler = e=>{
    // console.log('speech error: ',e);
  }

  
  const startRecording = async () => {
    setFetchData(true)
    console.log('setRecording:',recording)
    setRecording(true);
    console.log('setRecording--------:',recording)
    Tts.stop(); 
    try {
      await Voice.start('en-GB');
    } catch (error) {
      console.log('error', error);
    }
  };

  const stopRecording = async () => {
    try {
      console.log('stopRecording1')
      await Voice.stop();
      setRecording(false);
      fetchResponse();
      console.log('stopRecording2')
    } catch (error) {
      console.log('errors', error);
    }
  };
  const clear = () => {
    Tts.stop();
    setSpeaking(false);
    setLoading(false);
    setMessages([]);
  };

  
  const fetchResponse = async ()=>{
    

    if(result.trim().length>0 && fetchData){
      console.log('inside fetch if')
      setLoading(true);
      setFetchData(false)
      let newMessages = [...messages];
      newMessages.push({role: 'user', content: result.trim()});
      setMessages([...newMessages]);

      // scroll to the bottom of the view
      updateScrollView();

      // fetching response from chatGPT with our prompt and old messages
      apiCall(result.trim(), newMessages).then(res=>{
        console.log('got api data');
        setLoading(false);
        if(res.success){
          setMessages([...res.data]);
          setResult('');
          updateScrollView();
          
          // now play the response to user
          startTextToSpeach(res.data[res.data.length-1]);
          
        }else{
          // Alert.alert('Error', res.msg);
        }
        
      })
    }else{
      console.log('outside fetch')
    }
  }



  const updateScrollView = ()=>{
    setTimeout(()=>{
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    },200)
  }

  const startTextToSpeach = message=>{
    if(!message.content.includes('https')){
      setSpeaking(true);
      // playing response with the voice id and voice speed
      Tts.speak(message.content, {
        iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
        rate: 0.5,
      });
    }
  }
  

  const stopSpeaking = ()=>{
    Tts.stop();
    setSpeaking(false);
  }

  useEffect(() => {

    // voice handler events
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;
    
    // text to speech events
    Tts.setDefaultLanguage('en-IE');
    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-finish', event => {console.log('finish', event); setSpeaking(false)});
    Tts.addEventListener('tts-cancel', event => console.log('cancel', event));

    
    
    return () => {
      // destroy the voice instance after component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);


  return (
    <View style={[styles.hm_mainView]}>
      {/* <StatusBar barStyle="dark-content" /> */}

      {/* Your content here */}

      <SafeAreaView style={styles.hm_safeView}>
        {/* bot icon */}
        
        <View style={styles.hm_img_container}>
          <View style={styles.hm_img}>
            <Image
              source={require('../../assets/images/bot.png')}
              style={{height: hp(8), width: hp(8)}}
            />
          </View>
          <Text style={[styles.msg_header, {fontSize: wp(8)}]}>Hi..I'm Siripala....</Text>
        </View>

        {/* features || message history */}
        {messages.length > 0 ? (
          <View style={styles.msg_main}>
            {/* <View > */}
            <ImageBackground
              source={require('../../assets/images/backgroundimg.jpg')} // Replace with your image path
              style={
                [styles.cont1, {height: hp(77)}]
                // Adjust as needed
              }>
              <ScrollView
                ref={scrollViewRef}
                bounces={false}
                showsVerticalScrollIndicator={false}>
                {messages.map((message, index) => {
                  if (message.role == 'assistant') {
                    if (message.content.includes('https')) {
                      // result is an ai image
                      return (
                        <View key={index}>
                          <View style={styles.cont2}>
                            <Image
                              source={{uri: message.content}}
                              className="rounded-2xl"
                              resizeMode="contain"
                              style={{height: wp(60), width: wp(60)}}
                            />
                          </View>
                        </View>
                      );
                    } else {
                      // chat gpt response
                      return (
                        <View
                          key={index}
                          style={[styles.cont2, {width: wp(70)}]}>
                          <Text style={{fontSize: wp(4)}}>
                            {message.content}
                          </Text>
                        </View>
                      );
                    }
                  } else {
                    // user input text
                    return (
                      <View key={index} style={styles.cont4}>
                        <View style={[styles.cont3, {width: wp(70)}]}>
                          <Text style={{fontSize: wp(4)}}>
                            {message.content}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </ImageBackground>
          </View>
        ) : (
          // </View>
          <Features />
        )}

        {/* recording, clear and stop buttons */}
        <View style={styles.inputs_section}>
          {loading ? (
            <Image
              source={require('../../assets/images/loading.gif')}
              style={{width: hp(10), height: hp(10)}}
            />
          ) : recording ? (
            <TouchableWithoutFeedback onPress={() => { console.log("Stop button pressed"); stopRecording(); }}>
              {/* recording stop button */}
              <Image
                className="rounded-full"
                source={require('../../assets/images/voiceLoading.gif')}
                style={{width: hp(10), height: hp(10)}}
              />
            </TouchableWithoutFeedback>
          ) : (
            <TouchableOpacity onPress={startRecording}>
              {/* recording start button */}
              <Image
                className="rounded-full"
                source={require('../../assets/images/recordingIcon.png')}
                style={{width: hp(10), height: hp(10)}}
              />
            </TouchableOpacity>
          )}
          {
            <TouchableOpacity style={styles.clear_btn} onPress={clear}>
              <Text style={styles.clear_btn_txt}>Clear</Text>
            </TouchableOpacity>
          }
          {speaking && (
            <TouchableOpacity onPress={stopSpeaking} style={styles.speak_btn}>
              <Text style={styles.clear_btn_txt}>Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  cont1: {
    backgroundColor: '#fff', // Replace with the correct color code for neutral-200
    // Equivalent to rounded-3xl
    padding: 16,
    height: '100%',
    resizeMode: 'cover',
  },
  cont2: {
    padding: 8, // Equivalent to p-2
    flex: 1, // Equivalent to flex
    borderRadius: 20, // Equivalent to rounded-2xl
    backgroundColor: '#fff', // Replace with the correct color code for emerald-100
    borderTopLeftRadius: 0,
    marginTop: 15,
    marginBottom: 15,

    
  
  },
  cont3: {
    backgroundColor: '#c1c1c1', // Equivalent to bg-white
    padding: 8, // Equivalent to p-2
    borderRadius: 20, // Equivalent to rounded-xl
    borderTopRightRadius: 0,
    paddingLeft:20
  },
  cont4: {
    flexDirection: 'row', // Equivalent to flex-row
    justifyContent: 'flex-end',
  },

  hm_mainView: {
    flex: 1,
    backgroundUrl: '../../assets/images/backgroundimg.jpg',
    height: 100,
  
  },
  hm_safeView: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginHorizontal: 5,
  },
  hm_img: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  msg_main: {
    flex: 1,
    marginVertical: 8,
  },
  msg_header: {
    color: '#fff', // Equivalent to text-gray-700
    fontWeight: '600', // Equivalent to font-semibold
    marginLeft: 40,
  },
  msg_section: {
    backgroundColor: '#cbd5e0', // Replace with the correct color code for neutral-200
    borderRadius: 12, // Equivalent to rounded-3xl
    padding: 16,
  },
  msg1_view: {
    flexDirection: 'row', // Equivalent to flex-row
    justifyContent: 'center',
    marginBottom: 5,
  },
  msg1_assisnt: {
    backgroundColor: '#c6f6d5', // Replace with the correct color code for emerald-100
    borderRadius: 16, // Equivalent to rounded-xl
    padding: 8, // Equivalent to p-2
    borderTopLeftRadius: 0,
    marginBottom: 5,
  },
  msg1_img: {
    borderRadius: 20,
  },
  msg_txt_colour: {
    color: '#374151',
    padding: 5,
  },
  user_txt: {
    padding: 8,
  },
  msg1_user: {
    flexDirection: 'row', // Equivalent to flex-row
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  msg1_user_view: {
    backgroundColor: '#fff', // Equivalent to bg-white
    borderRadius: 20,
  },
  msg_scrollView: {
    height: 500,
  },
  inputs_section: {
    backgroundColor: '#BEF9BF',
    justifyContent: 'center', // Equivalent to justify-center
    alignItems: 'center',
  },
  rounded_full: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    borderRadius: 25,
  },
  clear_btn: {
    backgroundColor: '#666364', // Replace with the correct color code for neutral-400
    borderRadius: 24, // Equivalent to rounded-3xl
    padding: 15, // Equivalent to p-2
    position: 'absolute', // Equivalent to absolute
    right: 30,
  },
  clear_btn_txt: {
    color: 'white', // Equivalent to text-white
    fontWeight: '600',
  },
  speak_btn: {
    backgroundColor: '#ef4444', // Replace with the correct color code for red-400
    borderRadius: 24, // Equivalent to rounded-3xl
    padding: 15, // Equivalent to p-2
    position: 'absolute', // Equivalent to absolute
    left: 30,
  },
  hm_img_container:{
    display:'flex',
    flexDirection:'row',
    height:100,
    alignItems:'center',
    backgroundColor:'#36894d',

    
  }
});
