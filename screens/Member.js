import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  VirtualizedList,
} from 'react-native';
import {Sizes} from '../components/const';
import CustomHeader from '../components/Header';
import AddMember from './AddMember';

const Stack = createStackNavigator();
const AllMembers = () => {
  const [MemberData, setMemberData] = useState([{title: 'LOL', key: 0}]);
  const Card = ({title}) => {
    const TextStyle = {
      marginLeft: 10,
      color: '#6c6573',
      fontWeight: '500',
      fontSize: 16,
    };
    return (
      <View
        style={{
          padding: 15,
          paddingBottom: 20,
          marginBottom: 20,
          backgroundColor: '#fff',
          borderRadius: 10,
        }}>
        <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 10}}>
          {title}) orktest okktest
        </Text>
        <Text style={TextStyle}>Circle: 26_SandyPrmr</Text>
        <Text style={TextStyle}>Mobile: 777777777</Text>
        <Text style={TextStyle}>Status: Pending</Text>
      </View>
    );
  };
  return (
    <ScrollView style={{padding: 20}}>
      <Card title={1} />
      <Card title={2} />
      <Card title={3} />
      <Card title={4} />
      <Card title={5} />
      <Card title={6} />
      <Card title={7} />
      <Card title={8} />
      <Card title={9} />
      <Card title={10} />

      <View style={{height: 200}} />
    </ScrollView>
  );
};
const AllAdmin = () => {
  return (
    <View>
      <Text>All Admin</Text>
    </View>
  );
};
const Main = () => {
  const [translateValue] = React.useState(new Animated.Value(0));
  const [CurrentTab, setCurrentTab] = React.useState(0);
  const tabWidth = Sizes.width / 2;

  const animateSlider = React.useCallback(
    index => {
      Animated.spring(translateValue, {
        toValue: index * tabWidth,
        velocity: 10,
        useNativeDriver: true,
      }).start();
    },
    [tabWidth, translateValue],
  );
  const Tab = ({children, index}) => {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          setCurrentTab(index);
          console.log('LOL');
        }}
        style={style.tabView}>
        {children}
      </TouchableHighlight>
    );
  };

  React.useEffect(() => {
    animateSlider(CurrentTab);
  }, [CurrentTab, animateSlider]);

  return (
    <View>
      <CustomHeader label="Members" />
      <View style={style.tabsView}>
        <Animated.View
          style={[
            style.slider,
            {
              transform: [{translateX: translateValue}],
              width: tabWidth - 20,
            },
          ]}
        />
        <Tab index={0}>
          <Text>Members</Text>
        </Tab>
        <Tab index={1}>
          <Text>Admin</Text>
        </Tab>
      </View>
      {CurrentTab === 0 ? <AllMembers /> : <AllAdmin />}
    </View>
  );
};

const Member = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Members'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AllMembers" component={Main} />
      <Stack.Screen name="AddMembers" component={AddMember} />
    </Stack.Navigator>
  );
};
const style = StyleSheet.create({
  tabsView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  tabView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  slider: {
    height: 3,
    position: 'absolute',
    bottom: 0,
    left: 10,
    backgroundColor: '#496AD1',
    borderRadius: 10,
  },
});
export default Member;
//   <LinearGradient
//       colors={['#DDDDDD', '#fff', '#f0f0f0']}
//       star={{x: 0, y: 0.5}}
//       end={{x: 1, y: 0.5}}
//       style={{
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: 60,
//       }}>
