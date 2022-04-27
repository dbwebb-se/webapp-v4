import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { Platform, View, Button } from "react-native";

function zeroPad(input: number) {
    if (input < 10) {
        return "0" + input;
    }
    return input;
}

function outputCorrectTime(date: Date): string {
    return `${date.toLocaleDateString("se-SV")} ${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}:${zeroPad(date.getSeconds())}`;
}

export default function StartTimePicker({ booking, setBooking }) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [dropDownTime, setDropDownTime] = useState("00:00:00");
    const [fakedDropDownDate, setFakedDropDownDate] = useState("1970-01-01");
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View>
            {(Platform.OS === "ios") &&
                <DateTimePicker
                    mode="datetime"
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        setBooking({
                            ...booking,
                            start: outputCorrectTime(date),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />}


            {Platform.OS === "android" && (
                <Button onPress={showDatepicker} title="Visa datumväljare" />
            )}

            {Platform.OS === "android" && (
                <Button onPress={showTimepicker} title="Visa tidsväljare" />
            )}

            {Platform.OS === "android" && show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dropDownDate}
                    mode={mode}
                    is24Hour={true}
                    onChange={(event, date) => {
                        if (mode === "time") {
                            let setTime = `${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}:${zeroPad(date.getSeconds())}`;
                            setDropDownTime(setTime);
                        } else {
                            setFakedDropDownDate(date.toLocaleDateString("se-SV"));
                        }

                        setDropDownDate(date);

                        setBooking({
                            ...booking,
                            start: outputCorrectTime(new Date(
                                `${fakedDropDownDate} ${dropDownTime}`
                            )),
                        });

                        setShow(false);
                    }}
                />
            )}
        </View>
    );
};
