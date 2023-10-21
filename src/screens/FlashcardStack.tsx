import * as React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';

type FlashcardStackProps = NativeStackScreenProps<
  RootStackParamList,
  'FlashcardStack'
>;

const FlashcardStack = ({route}: FlashcardStackProps) => {
  const {stackId} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.contianer}>
      <Text>FlashcardStack</Text>
    </View>
  );
};

export default FlashcardStack;

const styles = StyleSheet.create({
  contianer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
