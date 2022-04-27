import PostList from './PostList';
import { Text, ScrollView } from 'react-native';

export default function Posts() {
    return (
        <ScrollView style={{ padding: 12 }}>
            <Text style={{ fontSize: 48 }}>Ladda</Text>
            <PostList />
        </ScrollView>
    );
};
