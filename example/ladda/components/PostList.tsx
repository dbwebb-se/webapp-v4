import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { getPosts } from '../models/posts';
import Post from '../interfaces/post';

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

  useEffect(async () => {
    setPosts(await getPosts());
  }, []);

  const listOfPosts = posts.map((post, index) => {
    return <Text key={index} style={{fontSize: 40, marginBottom: 32}}>{post.identifier}: {post.name}</Text>
  });

  return (
    <ScrollView>
      {listOfPosts}
    </ScrollView>
  );
}
