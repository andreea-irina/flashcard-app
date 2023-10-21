import * as React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const Dashboard = ({navigation}: DashboardProps) => {
  return (
    <View style={styles.contianer}>
      <Text>Dashboard</Text>

      <Button
        title="go"
        onPress={() => navigation.navigate('FlashcardStack', {stackId: '0'})}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  contianer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
