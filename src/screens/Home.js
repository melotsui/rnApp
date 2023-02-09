import React from 'react';
import { RefreshControl, ActivityIndicator, Text, View, ScrollView } from 'react-native';
import { styles as screenStyles } from '../../styles';
import Scroll_Col from '../components/scroll_view_col';
import Scroll_Row from '../components/scroll_view_row';
import AvatarItem from '../components/AvatarItem';
import { ListItem, Avatar, Divider } from '@react-native-material/core'
{ /* https://www.react-native-material.com/docs/components/list-item */ }

export function HomeScreen() {

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getMembers();
      setRefreshing(false);
    }, 0);
  }, []);

  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);


  const getMembers = async () => {
    setData([]);
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.jsonbin.io/v3/b/63e44a40c0e7653a0572e210',
        {
          method: 'GET',
          headers: new Headers({
            'X-Master-Key': '$2b$10$WOrhaoirxK3RSvoNpfLoJOOeaYExd22RNk/Di0qcEIpYAMvfG8zrW',
            'X-Access-Key': '$2b$10$.p4UyoDNJyBIjTFWOjvCA.yQfGh.qCCRaCasFoMOnaMjX6Pg7TZFi'
          }),
          // body: '{"test" : true}'
        }
      );
      const json = await response.json();
      setData(json.record.members);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getMembers();
  }, []);

  return (
    <>
      {
        isLoading ? (
          <View style={screenStyles.container}>
            <ActivityIndicator size="large" style={screenStyles.loading} />
          </View>
        ) :
          <View style={screenStyles.container}>
            <Text
              onPress={() => alert('This is the "Home" screen.')}
              style={screenStyles.text}>
              Home Screen: Welcome to DLS
            </Text>
            <ScrollView refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
              {
                data.map((item, index) => (
                  <AvatarItem key={index} avatar={item} />
                ))

              }
              <ListItem
                leadingMode="avatar"
                leading={
                  <Avatar image={{ uri: "https://mui.com/static/images/avatar/3.jpg" }} />
                }
                title="Oui Oui"
                secondaryText="Do you have Paris recommendations? Have you ever…"
                meta="meta"
              />
            </ScrollView>
          </View>
      }
    </>
  );
}

