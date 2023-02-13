import React from 'react'
import {
    RefreshControl,
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    ToastAndroid,

} from 'react-native';
import { styles as screenStyles } from '../../styles';
import { SelectList } from 'react-native-dropdown-select-list'
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import {
    Stack,
    // TextInput,
    IconButton
} from "@react-native-material/core";

export default function Filter() {
    return (
        <>
            <View style={css.twoColumn}>
                <View style={css.twoColumnItem}>
                    <Text>Left</Text>
                </View>
                <View style={css.twoColumnItem}>
                    <Text>Right</Text>
                </View>
            </View>
            <View style={css.twoColumn}>
                <View style={css.twoColumnItem}>
                    <Text>Col1</Text>
                </View>
                <Text>|</Text>
                <View style={css.twoColumnItem}>
                    <Text>Col2</Text>
                </View>
                <Text>|</Text>
                <View style={css.twoColumnItem}>
                    <Text>Col3</Text>
                </View>
                <Text>|</Text>
                <View style={css.twoColumnItem}>
                    <Text>Col4</Text>
                </View>
            </View>
        </>
    )
}


const css = StyleSheet.create({
    twoColumn: {
        justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
    },
    twoColumnItem: {
        flex: 1,
        alignItems: 'center',
    },
});

