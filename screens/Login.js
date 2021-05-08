import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {Button} from 'react-native-elements';
import {setUserData} from '../Storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Sizes} from '../components/const';

const Login = ({navigation}) => {
  Sizes;
  const {width} = Sizes;
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const passwordRef = useRef();
  const [Loading, setLoading] = useState(false);

  const HandleSubmit = () => {
    console.log(UserName, Password);
    var formData = {username: UserName, password: Password};
    if (UserName.length > 0 && Password.length > 0) {
      setLoading(true);
    }
    fetch('http://omba-app.ambicionestechnology.com/api/account/login', {
      body: JSON.stringify(formData),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        console.log('response', response);
        return response.json();
      })
      .then(responseJson => {
        // Some Code if fetching is successful
        console.log(responseJson);
        setLoading(false);
        if (responseJson.status) {
          if (responseJson.title === 'Unauthorized') {
            Alert.alert(responseJson?.title, 'Invalid username or Password');
          }
        } else {
          setUserData(responseJson).then(() => {
            navigation.reset({
              routes: [{name: 'HomeScreen'}],
            });
          });
        }
      })
      .catch(error => {
        console.log(error);
        setLoading(false);

        // Some Code if fetching is failed
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          background: '#f0f0f0',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 45,
                fontWeight: 'bold',
                marginTop: 60,
              }}>
              Log in
            </Text>
          </View>
          <KeyboardAvoidingView>
            <View
              style={{
                backgroundColor: '#fff',
                width: width * 0.9,
                marginTop: 30,
                padding: 10,
              }}>
              <Input
                placeholder="UserName"
                value={UserName}
                onChangeText={value => setUserName(value)}
                inputStyle={{color: 'black'}}
                containerStyle={{marginBottom: 10}}
                clearButtonMode={'while-editing'}
                returnKeyLabel={'next'}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  passwordRef.current.focus();
                }}
                leftIcon={<Icon name="user" size={24} color="black" />}
              />
              <Input
                placeholder="Password"
                value={Password}
                inputStyle={{color: 'black'}}
                containerStyle={{marginBottom: 10}}
                textContentType={'password'}
                autoCompleteType={'password'}
                clearButtonMode={'while-editing'}
                returnKeyLabel={'done'}
                returnKeyType={'done'}
                onChangeText={value => setPassword(value)}
                secureTextEntry={true}
                ref={passwordRef}
                onSubmitEditing={HandleSubmit}
                leftIcon={<Icon name="lock" size={24} color="black" />}
              />
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginVertical: 20,
              }}>
              <TouchableOpacity>
                <Text style={{color: '#1a66ff', fontSize: 16}}>
                  Register Now
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{color: '#958d9e', fontSize: 16}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          width: width,
          bottom: 0,
          marginVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          title="Log in"
          onPress={HandleSubmit}
          loading={Loading}
          buttonStyle={{
            width: width * 0.9,
            height: 60,
            backgroundColor: '#6236ff',
          }}
          titleStyle={{fontSize: 25}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;