import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Alert,
  BackHandler,
  Dimensions,
} from 'react-native';
import { Icon } from 'native-base';
import NewPlan from './NewPlan';
import ViewMap from './ViewMap';
import YourPlan from './YourPlan';
import Profile from './Profile';
import Blogs from './Blogs';
import Hotels from './Hotels';
import HotelCard from './HotelCard';
import HotelDetail from './HotelDetail';
import Places from './Places';
import PlaceCard from './PlaceCard';
import Detail from './PlaceDetail';
import PostABlog from './PostABlog';
import SavedPlans from './SavedPlans';
import MyBlogs from './MyBlogs';
import MyPlans from './MyPlans';
import Plan from './Plan';
import ResetPassword from './ResetPwd';
import { DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SliderBox } from 'react-native-image-slider-box';
import auth from '@react-native-firebase/auth';
import SideMenu from './common/SideMenu'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../utils/colors';

const img = [
  'https://propakistani.pk/wp-content/uploads/2018/04/pakistan-tourism1.jpg',

  'https://insider.pk/wp-content/uploads/2015/04/2.-Concordia.jpg',

  'https://www.blizin.com/public/images/uploads/articles/budgetfriendlynorthernareasinpakistanforhoneymoon-A-1564311798.webp',

  'https://insider.pk/wp-content/uploads/2015/04/1-Lake-Saif-ul-Malook.jpg',

  'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/23/c5/20.jpg',

  'https://www.travelo.pk/blog/wp-content/uploads/2018/06/Banjosa-Lake.jpg',

  'https://www.brandsynario.com/wp-content/uploads/2017/07/swat-lead.jpg'
];

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.half1}>
        <View style={styles.image}>
          <SliderBox
            images={img}
            sliderBoxHeight={200}
            parentWidth={350}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            autoplay
            circleLoop
            paginationBoxStyle={{
              position: "absolute",
              bottom: 0,
              padding: 0,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              paddingVertical: 10
            }}
            ImageComponentStyle={{ borderRadius: 20, width: '100%' }}
            imageLoadingColor={PRIMARY_COLOR}
            dotColor={PRIMARY_COLOR}
            inactiveDotColor="#dbd4cc"
          />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row", width: Dimensions.get("window").width - 100 }}>
        <View style={{ flex: 5 }}>
          <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => navigation.navigate('NewPlan')}>
            <FontAwesome
              name="plane"
              size={80}
              color={PRIMARY_COLOR}
            />
          </TouchableOpacity>
          <Text style={styles.options}>Plan a trip</Text>
        </View>
        <View style={{ flex: 5 }}>
          <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => navigation.navigate('Hotels')}>
            <FontAwesome
              name="hotel"
              size={80}
              color={PRIMARY_COLOR}
            />
          </TouchableOpacity>
          <Text style={styles.options}>Hotels</Text>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: "row", width: Dimensions.get("window").width - 100, marginTop: -40 }}>
        <View style={{ flex: 5 }}>
          <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => navigation.navigate('Places')}>
            <MaterialIcons
              name="place"
              size={80}
              color={PRIMARY_COLOR}
            />
          </TouchableOpacity>
          <Text style={styles.options}>Places</Text>
        </View>
        <View style={{ flex: 5 }}>
          <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => navigation.navigate('Blogs')}>
            <FontAwesome5
              name="blog"
              size={80}
              color={PRIMARY_COLOR}
            />
          </TouchableOpacity>
          <Text style={styles.options}>Blogs</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('NewPlan')}>
          <Icon
            type="MaterialIcons"
            style={styles.plusIcon}
            name="add-circle"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

const options = ({ navigation }) => ({
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: PRIMARY_COLOR,
  },
  headerTintColor: SECONDARY_COLOR,
  headerTitleStyle: {
    fontWeight: 'bold',
  },

  headerLeft: () => (
    <TouchableOpacity
      style={{ marginLeft: 10 }}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <Icon type="Entypo" name="menu" style={styles.headerIcon} />
    </TouchableOpacity>
  ),

  headerRight: () => (
    <TouchableOpacity
      style={{ marginRight: 10 }}
      onPress={() =>
        Alert.alert('Log Out', 'Are you sure you want to log out?', [
          {
            text: 'Yes',
            onPress: () =>
              auth()
                .signOut()
                .then(() => {
                  navigation.navigate('Login');
                })
                .catch(function (error) {
                  Alert.alert('Error', error.message);
                }),
            style: 'cancel',
          },
          { text: 'No', onPress: () => console.log('No Pressed') },
        ])
      }>
      <Icon type="Entypo" name="log-out" style={styles.headerIcon} />
    </TouchableOpacity>
  ),
});

function HomeSreen_StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={options} />
    </Stack.Navigator>
  );
}

function NewPlan_StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Plan a Trip" component={NewPlan} options={options} />
      <Stack.Screen name="Map View" component={ViewMap} options={options} />
      <Stack.Screen name="Your Plan" component={YourPlan} options={options} />

      <Stack.Screen
        name="Saved Plans"
        component={SavedPlans}
        options={options}
      />
    </Stack.Navigator>
  );
}

function Profile_StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={options} />
      <Stack.Screen
        name="Reset Password"
        component={ResetPassword}
        options={options}
      />
    </Stack.Navigator>
  );
}

function Blogs_StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Blogs" component={Blogs} options={options} />
      <Stack.Screen
        name="Post A Blog"
        component={PostABlog}
        options={options}
      />
      <Stack.Screen name="My Blogs" component={MyBlogs} options={options} />
    </Stack.Navigator>
  );
}

function Hotels_StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Hotels" component={Hotels} options={options} />
      <Stack.Screen name="HotelCard" component={HotelCard} options={options} />
      <Stack.Screen name="Hotel Detail" component={HotelDetail} options={options} />
    </Stack.Navigator>
  );
}
function MyPlans_StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Plans" component={MyPlans} options={options} />
      <Stack.Screen name="Plan" component={Plan} options={options} />
      <Stack.Screen name="Map View" component={ViewMap} options={options} />
    </Stack.Navigator>
  );
}

function Places_StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Visitable Places"
        component={Places}
        options={options}
      />
      <Stack.Screen
        name="PlaceCard"
        component={PlaceCard}
        options={options}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={options}
      />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function Home() {
  // const backAction = () => {
  //   Alert.alert('Confirm Exit', 'Are you sure you want to exit?', [
  //     {text: 'Yes', onPress: () => BackHandler.exitApp()},
  //     {
  //       text: 'No',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //   ]);
  //   return true;
  // };

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backAction);

  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, []);

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{
          backgroundColor: PRIMARY_COLOR,
          width: 280,
        }}
        drawerContent={props => <SideMenu {...props} />}
        drawerContentOptions={{
          activeBackgroundColor: SECONDARY_COLOR,
          activeTintColor: PRIMARY_COLOR,
          inactiveTintColor: SECONDARY_COLOR,
          labelStyle: { fontSize: 15, fontWeight: 'bold' }
        }}
        drawerType="front"
        openByDefault={false}
        backBehavior="initialRoute">
        <Drawer.Screen
          name="Home"
          component={HomeSreen_StackNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Icon
                type="Entypo"
                name="home"
                size={20}
                style={{ color: color, flex: 0.3 }}
              />
            ),
            drawerLabel: 'Home',
          }}
        />

        <Drawer.Screen
          name="NewPlan"
          component={NewPlan_StackNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Icon
                type="FontAwesome"
                name="plane"
                size={20}
                style={{ color: color, flex: 0.35 }}
              />
            ),
            drawerLabel: 'New Plan',
          }}
        />
        <Drawer.Screen
          name="MyPlans"
          component={MyPlans_StackNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Icon
                type="Entypo"
                name="save"
                size={20}
                style={{ color: color, flex: 0.35 }}
              />
            ),
            drawerLabel: 'My Plans',
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile_StackNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Icon
                type="FontAwesome"
                name="user"
                size={20}
                style={{ color: color, flex: 0.3 }}
              />
            ),
            drawerLabel: 'Profile',
          }}
        />

        <Drawer.Screen
          name="Blogs"
          component={Blogs_StackNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Icon
                type="FontAwesome5"
                name="blog"
                size={20}
                style={{ color: color, flex: 0.3 }}
              />
            ),
            drawerLabel: 'Blogs',
          }}
        />
        <Drawer.Screen
          name="Hotels"
          component={Hotels_StackNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Icon
                type="FontAwesome"
                name="hotel"
                size={20}
                style={{ color: color, flex: 0.3 }}
              />
            ),
            drawerLabel: 'Hotels',
          }}
        />

        <Drawer.Screen
          name="Places"
          component={Places_StackNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Icon
                type="MaterialIcons"
                name="place"
                size={20}
                style={{ color: color, flex: 0.3 }}
              />
            ),
            drawerLabel: 'Places',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
  },
  headerIcon: {
    color: SECONDARY_COLOR,
    fontSize: 25,
  },
  half1: {
    flex: 2,
    alignItems: 'center',
  },

  half2: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },

  options: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: PRIMARY_COLOR

  },

  image: {
    marginTop: 30,
    marginBottom: 40,
    justifyContent: 'center',
  },

  icon: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },

  planMargin: {
    marginLeft: -10,
  },

  hotelMargin: {
    marginLeft: 50,
  },

  savedPlansMargin: {
    marginLeft: -10,
    marginTop: -70,
  },

  blogMargin: {
    marginLeft: 50,
    marginTop: -70,
  },

  plusIcon: {
    marginLeft: 270,
    marginBottom: 25,
    marginTop: -30,
    fontSize: 60,
    color: PRIMARY_COLOR,
  },
});

export default Home;
