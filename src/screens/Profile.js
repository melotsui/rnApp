import React from 'react';
import { RefreshControl, ActivityIndicator, StyleSheet, Text, View, ScrollView, TextInput, Button, ToastAndroid } from 'react-native';
import { styles as screenStyles } from '../../styles';
import { SelectList } from 'react-native-dropdown-select-list'
import { RadioButton } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

const X_MASTER_KEY = '$2b$10$WOrhaoirxK3RSvoNpfLoJOOeaYExd22RNk/Di0qcEIpYAMvfG8zrW';
const X_ACCESS_KEY = '$2b$10$.p4UyoDNJyBIjTFWOjvCA.yQfGh.qCCRaCasFoMOnaMjX6Pg7TZFi';
const headers = new Headers({
  'X-Master-Key': X_MASTER_KEY,
  'X-Access-Key': X_ACCESS_KEY
});

export function ProfileScreen({ navigation }) {

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getProfiles();
      setRefreshing(false);
    }, 0);
  }, []);

  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  const getProfiles = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.jsonbin.io/v3/b/63e452d5c0e7653a0572e673',
        {
          method: 'GET',
          headers,
          // body: '{"test" : true}'
        }
      );
      const json = await response.json();
      setData(json.record.data);
      setName(json.record.data.name);
      setEmail(json.record.data.email);
      setPhone(json.record.data.phone);
      setGender(json.record.data.gender);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getProfiles();
  }, []);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [gender, setGender] = React.useState('');

  function onPressUpdate() {
    var type = '';
    var text1 = '';
    var text2 = null;
    if (name != '' && email != '' && phone != '' && gender != '') {
      type = 'success';
      text1 = 'Profile Update Successfully!';
    } else {
      type = 'error';
      text1 = 'Update Fail';
      text2 = 'All information cannot be null.';
    }
    showToast(type, text1, text2);
  }

  // const showToast = () => {
  //   Toast.show({
  //     type: toastType,
  //     text1: toastText1,
  //     // text2: 'This is some something 👋'
  //   });
  // }

  function showToast(type, text1, text2) {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2
    });
  }


  return (
    <>
      {/* <Text
          onPress={() => navigation.navigate('Home')}
          style={screenStyles.text}>
          Profile screen: This is the most inspiring profile that I have ever
          seen
        </Text> */}
      {
        isLoading ? (
          <View style={[screenStyles.body]}>
            <ActivityIndicator size="large" style={screenStyles.loading} />
          </View>
        ) :
          <ScrollView
            // bounces={true} alwaysBounceHorizontal={true} alwaysBounceVertical={true}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <View style={[screenStyles.container, screenStyles.body]}>
              <View style={css.br}></View>
              <Text style={css.label}>Name</Text>
              <TextInput style={css.input} value={name} onChangeText={name => setName(name)} />
              <View style={css.br}></View>
              <Text style={css.label}>Email</Text>
              <TextInput style={css.input} value={email} onChangeText={email => setEmail(email)} />
              <View style={css.br}></View>
              <Text style={css.label}>Phone</Text>
              <TextInput style={css.input} value={phone} onChangeText={phone => setPhone(phone)} />
              <View style={css.br}></View>
              <Text style={css.label}>Gender</Text>
              <RadioButton.Group value={gender} onValueChange={gender => setGender(gender)}>
                <RadioButton.Item label="Male" value="M" />
                <RadioButton.Item label="Female" value="F" />
              </RadioButton.Group>
              <View style={css.br}></View>
              <Button
                onPress={onPressUpdate}
                title="Update"
                color="#841584"
                accessibilityLabel="Update"
              />
              <View style={css.br}></View>
              <Button
                onPress={getProfiles}
                title="Logout"
                color="grey"
                accessibilityLabel="Logout"
              />
            </View>
          </ScrollView>
      }
    </>
  );
}

const css = StyleSheet.create({
  label: {
    marginTop: 10,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  input: {
    borderBottomWidth: 1,
  },
  br: {
    height: 10,
  },
});

