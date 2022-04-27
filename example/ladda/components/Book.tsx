import { useState } from 'react';
import { Text, ScrollView, TextInput, Button } from 'react-native';
import Booking from "../interfaces/booking";
import { Base, Typography, Forms } from '../styles';

import PostsPicker from './PostsPicker';
import StartTimePicker from './StartTimePicker';

export default function Book({currentGPSLocation}) {
    const [booking, setBooking] = useState<Partial<Booking>>({});

    async function doBooking() {
        console.log(booking);
    }

    return (
        <ScrollView style={{ padding: 12 }}>
            <Text style={{ fontSize: 48 }}>Boka</Text>

            <Text>Laddstolpe</Text>
            <PostsPicker booking={booking} setBooking={setBooking} currentGPSLocation={currentGPSLocation} />

            <Text>Starttid</Text>
            <StartTimePicker booking={booking} setBooking={setBooking}/>

            <Text>Användarnamn</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setBooking({ ...booking, username: content.trim() })
                }}
                value={booking?.username}
            />

            <Text>Timmar för laddning</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    let numericValue;
                    if (content) {
                        numericValue = parseInt(content);
                    } else {
                        numericValue = 0;
                    }

                    setBooking({ ...booking, hours: numericValue })
                }}
                value={booking?.hours?.toString()}
                keyboardType="numeric"
            />

            <Button
                title="Boka laddstolpe"
                onPress={() => {
                    doBooking();
                }}
            />
        </ScrollView>
    );
};
