import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {Image, Input, Button} from 'react-native-elements';
import {setUserData, setUserMember} from '../Storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Sizes} from '../components/const';
import axios from '../axios';
import DropdownAlert from 'react-native-dropdownalert';
const Register = ({navigation}) => {
  Sizes;
  const {width} = Sizes;
  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [UserName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [Mobile, setMobile] = useState('');
  const [City, setCity] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const LastnameRef = useRef();
  const UserNameRef = useRef();
  const EmailRef = useRef();
  const MobileRef = useRef();
  const CityRef = useRef();
  const PasswordRef = useRef();
  const ConfirmPasswordRef = useRef();
  const [Loading, setLoading] = useState(false);
  const dropDownAlertRef = useRef();
  const HandleSubmit = () => {
    setLoading(true);
    let Error = '';
    if (Firstname === '') {
      Error = 'Firstname is empty';
    } else if (Lastname === '') {
      Error = 'Lastname is empty';
    } else if (UserName === '') {
      Error = 'UserName is empty';
    } else if (Email === '') {
      Error = 'Email is empty';
    } else if (Mobile === '') {
      Error = 'Mobile is empty';
    } else if (Password === '' || ConfirmPassword === '') {
      Error = 'Password is empty';
    } else if (Password !== ConfirmPassword) {
      Error = "Password doesn't match.";
    } else if (Password.length < 4 || Password.length > 8) {
      Error =
        'The field Password must be a string with a minimum length of 4 and a maximum length of 8.';
    } else {
      Error = '';
    }
    console.log(Password.length);
    //   "firstName": "tt",
    //   "lastName": "tt",
    //   "userName": "tt",
    //   "email": "tt@gmail.com",
    //   "mobile": "2345678",
    //   "city": "", //optional
    //   "password": "Sandy@32",

    var formData = {
      firstName: Firstname,
      lastName: Lastname,
      username: UserName,
      email: Email,
      mobile: Mobile,
      city: City,
      password: Password,
      deviceToken: '',
    };
    if (Error !== '') {
      setLoading(false);
      dropDownAlertRef.current.alertWithType('error', 'Error', Error);
    } else {
      console.log('Valid');
      axios({
        url: '/account/register',
        method: 'POST',
        data: formData,
        headers: {'Content-Type': 'application/json'},
      })
        .then(response => {
          // Some Code if fetching is successful
          let responseJson = response.data;
          console.log(responseJson);
          setLoading(false);
          console.log(response);
          if (response.status === 400) {
            if (typeof responseJson === 'string') {
              dropDownAlertRef.current.alertWithType(
                'error',
                'Error',
                responseJson,
              );
            } else {
              responseJson.forEach(e => {
                Error += e.description + ' \n';
              });
              dropDownAlertRef.current.alertWithType('error', 'Error', Error);
            }
          } else if (response.status === 200) {
            setUserData(responseJson).then(() => {
              if (responseJson) {
                axios({
                  url: `/users/GetMembers/${responseJson.id}?pageNumber=1&pageSize=5&predicate=liked`,
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + responseJson.token,
                  },
                }).then(data => {
                  console.log('getMember', data);
                  setUserMember(data.data);
                  navigation.reset({
                    routes: [{name: 'HomeScreen'}],
                  });
                });
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    }
    console.log(formData);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          background: '#f0f0f0',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ScrollView>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{
                marginTop: 15,
                height: 70,
                width: 70,
              }}
              source={require('../assets/Logos/red-croped.png')}
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
              }}>
              Create New Account
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
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <Input
                  placeholder="FirstName"
                  value={Firstname}
                  onChangeText={value => setFirstname(value)}
                  inputStyle={{color: 'black'}}
                  containerStyle={{marginBottom: 5, flex: 0.5}}
                  clearButtonMode={'while-editing'}
                  returnKeyLabel={'next'}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    LastnameRef.current.focus();
                  }}
                />
                <Input
                  placeholder="LastName"
                  value={Lastname}
                  ref={LastnameRef}
                  onChangeText={value => setLastname(value)}
                  inputStyle={{color: 'black'}}
                  containerStyle={{marginBottom: 5, flex: 0.5}}
                  clearButtonMode={'while-editing'}
                  returnKeyLabel={'next'}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    UserNameRef.current.focus();
                  }}
                />
              </View>
              <Input
                placeholder="UserName"
                value={UserName}
                ref={UserNameRef}
                onChangeText={value => setUserName(value)}
                inputStyle={{color: 'black'}}
                containerStyle={{marginBottom: 5}}
                clearButtonMode={'while-editing'}
                returnKeyLabel={'next'}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  EmailRef.current.focus();
                }}
              />
              <Input
                placeholder="Email"
                value={Email}
                ref={EmailRef}
                onChangeText={value => setEmail(value)}
                inputStyle={{color: 'black'}}
                containerStyle={{marginBottom: 5}}
                textContentType={'emailAddress'}
                autoCompleteType={'email'}
                keyboardType={'email-address'}
                clearButtonMode={'while-editing'}
                returnKeyLabel={'next'}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  MobileRef.current.focus();
                }}
              />
              <Input
                placeholder="Mobile"
                value={Mobile}
                ref={MobileRef}
                onChangeText={value => setMobile(value)}
                inputStyle={{color: 'black'}}
                containerStyle={{marginBottom: 5}}
                keyboardType={
                  Platform.OS === 'android' ? 'numeric' : 'number-pad'
                }
                returnKeyLabel={'next'}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  CityRef.current.focus();
                }}
              />
              <Input
                placeholder="City"
                value={City}
                ref={CityRef}
                onChangeText={value => setCity(value)}
                inputStyle={{color: 'black'}}
                containerStyle={{marginBottom: 5}}
                clearButtonMode={'while-editing'}
                returnKeyLabel={'next'}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  PasswordRef.current.focus();
                }}
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
                ref={PasswordRef}
                onSubmitEditing={() => {
                  ConfirmPasswordRef.current.focus();
                }}
              />
              <Input
                placeholder="Confirm Password"
                value={ConfirmPassword}
                inputStyle={{color: 'black'}}
                containerStyle={{marginBottom: 5}}
                textContentType={'password'}
                autoCompleteType={'password'}
                clearButtonMode={'while-editing'}
                returnKeyLabel={'done'}
                returnKeyType={'done'}
                onChangeText={value => setConfirmPassword(value)}
                secureTextEntry={true}
                ref={ConfirmPasswordRef}
                onSubmitEditing={HandleSubmit}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.replace('Login');
              }}>
              <Text style={{color: '#1a66ff', fontSize: 16}}>
                Already have an Account?
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <View style={{height: 150}} />
        </ScrollView>
      </View>
      <View
        style={{
          position: 'absolute',
          width: width,
          bottom: 0,
          marginTop: 0,

          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'column',
            marginBottom: 10,
            alignItems: 'center',
          }}>
          <View style={{alignSelf: 'center', marginBottom: 10}}>
            <Button
              title="Register"
              onPress={HandleSubmit}
              loading={Loading}
              buttonStyle={{
                width: width * 0.8,
                height: 50,
                backgroundColor: '#6236ff',
                borderRadius: 15,
              }}
              titleStyle={{fontSize: 25}}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignSelf: 'center',
              marginBottom: 10,
              paddingHorizontal: 15,
            }}>
            <Text style={{fontSize: 13}}>
              By creating an account, I accept the
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Terms');
              }}>
              <Text style={{color: '#5d8ed5', fontSize: 13}}>
                {' Terms & Conditions '}
              </Text>
            </TouchableOpacity>
            <Text>And</Text>
            <TouchableOpacity>
              <Text style={{color: '#5d8ed5', fontSize: 13}}>
                {' Privacy Policy'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <DropdownAlert ref={dropDownAlertRef} />
    </SafeAreaView>
  );
};

export default Register;
