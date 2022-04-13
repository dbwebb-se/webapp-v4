import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { View, Button } from "react-native";

export default function StartTimePicker({ booking, setBooking }) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    mode="datetime"
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        setBooking({
                            ...booking,
                            start: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
};
