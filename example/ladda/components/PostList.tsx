import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { getPosts } from '../models/posts';
import Post from '../interfaces/post';

import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";

import * as Location from 'expo-location';

import distanceBetweenCoordinates from "../models/distance";

export default function PostList({currentGPSLocation, setCurrentGPSLocation}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [locationMarker, setLocationMarker] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const map = useRef(null);

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

  const postMarkers = posts.map((post, index) => {
    return <Marker
        key={index}
        identifier={post.identifier}
        coordinate={{ latitude: post.latitude, longitude: post.longitude }}
        title={post.name}
        />
  });

  function fitMarkers() {
    if (map?.current && posts.length) {
      const markerIDs = posts.map((post) => post.identifier);
      map.current.fitToSuppliedMarkers(markerIDs, true);
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        key={posts.length}
        style={styles.map}
        onMapReady={fitMarkers}
        onMapLoaded={fitMarkers}
        initialRegion={{
            latitude: 56.1612,
            longitude: 15.5869,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
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
