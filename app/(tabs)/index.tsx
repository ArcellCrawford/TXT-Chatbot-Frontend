import { Background, Button } from '@react-navigation/elements';
import { Image } from 'expo-image';
import { StyleSheet,KeyboardAvoidingView,FlatList } from 'react-native';
import { TextInput,Text } from 'react-native-paper';
import { View,Platform,TouchableOpacity } from 'react-native';
import { useState,useRef,useEffect } from 'react';
import useSendQuery from '../../hooks/useSendQuery'; // Assuming you have a custom hook for sending queries

export default function HomeScreen() {
  const [messages, setMessages]= useState([{ type: '', text: '' }]);
  // const [re_Messages, setRe_Messages]= useState(['']);
  const [input, setInput] = useState('');
  const { sendQuestion } = useSendQuery(); // Custom hook to send queries to the backend
  const [infoLoaded, setInfoLoaded]= useState(false);
  //FlatLiust reference
  const flatListRef = useRef<FlatList>(null);
//function to send messages to the chat log 
  const handleSendMessage = async () => {
   
    if (input.trim()) {
      const userMessage = { type: 'user', text: input };
      const autoMessage = { type: 'response', text: "thinking..."};

      setMessages([...messages, userMessage, autoMessage]);
      setInput(''); // Clear the input field
      // flatListRef.current?.scrollToEnd({ animated: true });
    
      // send to the backend API
      const query = { chunk: input };
      const response = await sendQuestion(query);
      setInfoLoaded(true);
      const responseMessage = { type: 'response', text: response};


      setMessages([...messages, userMessage, responseMessage]);
      // setRe_Messages([...re_Messages, responseMessage.text]);
      // flatListRef.current?.scrollToEnd({ animated: true });
    }
  };
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
    setInfoLoaded(false)
  }, [messages, infoLoaded]);
  return (
    
  <View style={styles.View}>
    <KeyboardAvoidingView
      style={styles.View2} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
    
         <Image
          source={require('../../assets/images/TXT_Logo.png')}
          style={{ alignSelf: 'center', marginVertical: 10, width: '100%', height: 100 }}
          contentFit='contain'
         />
         {/* Chat Log */}
         <FlatList
      ref={flatListRef}
      data={messages}
      keyExtractor={(item, index) => index.toString()}
      style={{ marginBottom: 85  }}
      renderItem={({ item }) => (
       <View>
         <Text style={ 
          item.type === 'user' && item.text.trim()
          ? styles.messageContainer_User
          : item.type === 'response' && item.text.trim()
          ? styles.messageContainer_Resp
          : styles.emptyMessageText
         }>
          {item.text}
         </Text>
       </View>
      )}
      contentContainerStyle={{ paddingBottom: 'auto' }}
         />
         <TextInput
          style={styles.TextInput}
          placeholder="Ask your question..."
          value={input}
          onChangeText={setInput}
         // onPress={() => setkeyboardUp(true)}
         />
         {/* Button to submit */}
     <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
      <Text>Send</Text> 
     </TouchableOpacity>
    </KeyboardAvoidingView>
  </View>
  );
}

const styles = StyleSheet.create({
  View:{
    display:'flex',
    flexDirection:'column',
    backgroundColor: '#ffffff',
    flex:1
  },
  View2:{
    
    flex:1
  },
  Container:{
    flex:1
  },
  TextInput: {
    position:'absolute',
    top:'84%',
    flex:2,
    width: '100%'
  },
  sendButton:{
    position:'absolute',
    top:'86%',
    flex:2,
    right :'10%'
  },
  messageContainer_User:{
    backgroundColor: '#fd9388',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    alignSelf: 'flex-end',
    width:'auto'
    
  },
  emptyMessageText:{

  },
  messageContainer_Resp:{
    backgroundColor: '#2694a9',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    alignSelf: 'flex-start',
    width:'auto'
    
  }
});
