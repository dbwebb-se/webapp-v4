import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getPosts } from '../models/posts';
import Post from '../interfaces/post';

import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";

import * as Location from 'expo-location';


function distanceBetweenCoordinates(post, position) {
  const R = 6371e3; // metres
  const φ1 = post.latitude * Math.PI/180; // φ, λ in radians
  const φ2 = position.latitude * Math.PI/180;
  const Δφ = (position.latitude-post.latitude) * Math.PI/180;
  const Δλ = (position.longitude-post.longitude) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c; // in metres
  return d;
}


export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [locationMarker, setLocationMarker] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentGPSLocation, setCurrentGPSLocation] = useState(null);

  useEffect(async () => {
    setPosts(await getPosts());
  }, []);

  useEffect(() => {
    (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied');
            return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});

        setCurrentGPSLocation(currentLocation.coords);

        setLocationMarker(<Marker
            coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            }}
            title="Min plats"
            pinColor="blue"
        />);
    })();
  }, []);

  const listOfPosts = posts.map((post, index) => {
    return <Text key={index} style={{fontSize: 40, marginBottom: 32}}>{post.identifier}: {post.name}</Text>
  });

  const postMarkers = posts.map((post, index) => {
    return <Marker
                key={index}
                coordinate={{ latitude: post.latitude, longitude: post.longitude }}
                title={post.name}
                onPress={() => console.log('pressed')}
            />
  });

  if (posts[0] && currentGPSLocation) {
    console.log(distanceBetweenCoordinates(
      posts[0],
      currentGPSLocation,
    ));
  }

  return (
    <View style={styles.container}>
      <MapView
          style={styles.map}
          initialRegion={{
              latitude: 56.1612,
              longitude: 15.5869,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
          }}>
          {postMarkers}
          {locationMarker}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
