import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const Dashboard = ({navigation}: DashboardProps) => {
  const navigateFlashcardStack = () => {
    navigation.navigate('FlashcardStack', {stackId: '0', stackName: 'fucker'});
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation title="Flashcard Collection" alignment="center" />
      <Divider />

      <Layout style={styles.layout}>
        <Text category="h1">Dashboard</Text>
        <Button onPress={navigateFlashcardStack}>FlashcardStack</Button>
      </Layout>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {flex: 1},
  layout: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
