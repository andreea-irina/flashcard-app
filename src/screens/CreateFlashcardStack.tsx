import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
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
import {BackIcon} from '../ui/Icons';

type CreateFlashcardStackProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateFlashcardStack'
>;

const CreateFlashcardStack = ({route}: CreateFlashcardStackProps) => {
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
        title="CreateFlashcardStack"
        alignment="center"
        accessoryLeft={BackAction}
      />

      <Divider />
      <Layout style={styles.layout}>
        <Text category="h1">CreateFlashcardStack</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default CreateFlashcardStack;

const styles = StyleSheet.create({
  container: {flex: 1},
  layout: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
