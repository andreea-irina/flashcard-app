import * as React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Avatar,
  Button,
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {BackIcon, DeleteIcon, LogOutIcon} from '../ui/Icons';

type AccountProps = NativeStackScreenProps<RootStackParamList, 'Account'>;

const Account = ({route}: AccountProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        title="Account"
        alignment="center"
        accessoryLeft={() => (
          <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
        )}
      />

      <Divider />
      <Layout style={styles.layout}>
        <View style={styles.user}>
          <Avatar source={require('../assets/user.png')} size="giant" />

          <View>
            <Text category="h3">Jane Doe</Text>
            <Text category="s1" style={{fontStyle: 'italic'}}>
              hello@janedoe.io
            </Text>
          </View>
        </View>

        <View style={styles.bottom}>
          <Button style={{marginBottom: 20}} accessoryLeft={<LogOutIcon />}>
            LOGOUT
          </Button>
          <Button status="danger" accessoryLeft={<DeleteIcon />}>
            DELETE ACCOUNT
          </Button>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {flex: 1, position: 'relative'},
  layout: {flex: 1},
  user: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 16,
    padding: 20,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
});
