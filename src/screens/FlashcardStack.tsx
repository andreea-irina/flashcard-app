import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Divider,
  Icon,
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

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

type FlashcardStackProps = NativeStackScreenProps<
  RootStackParamList,
  'FlashcardStack'
>;

const FlashcardStack = ({route}: FlashcardStackProps) => {
  const {stackId, stackName} = route.params;
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
        title={stackName}
        alignment="center"
        accessoryLeft={BackAction}
      />

      <Divider />
      <Layout style={styles.layout}>
        <Text category="h1">FlashcardStack</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default FlashcardStack;

const styles = StyleSheet.create({
  container: {flex: 1},
  layout: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
