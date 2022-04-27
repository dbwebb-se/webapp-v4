import { useEffect, useState } from "react";

import Post from "../interfaces/post";
import { getPosts } from "../models/posts";

import { Picker } from '@react-native-picker/picker';

export default function PostsPicker({ booking, setBooking }) {
    const [posts, setPosts] = useState<Post[]>([]);

    const itemsList = posts.map((post, index) => {
        return <Picker.Item key={index} label={post.name} value={index+1} />;
    });

    useEffect(() => {
        (async () => {
            setPosts(await getPosts());
        })();
    }, []);

    return (
        <Picker
            selectedValue={booking?.post}
            onValueChange={(itemValue) => {
                console.log(itemValue);
                setBooking({ ...booking, post: itemValue });
            }}>
            {itemsList}
        </Picker>
    );
};
