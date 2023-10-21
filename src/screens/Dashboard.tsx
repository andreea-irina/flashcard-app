/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Avatar,
  Button,
  Divider,
  Layout,
  List,
  Text,
  TopNavigation,
  useStyleSheet,
} from '@ui-kitten/components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {RootStackParamList} from '../App';
import {AddIcon, OpenIcon} from '../ui/Icons';
// firebase
import {db} from '../../firebase-config';
import {ref, onValue, push, update, remove} from 'firebase/database';

type FlashcardDetails = {
  id: string;
  name: string;
  description: string;
  date: string;
};
const flashcardCollection: FlashcardDetails[] = [
  {
    id: uuidv4(),
    name: 'Learn Korean',
    description: 'Prep for TOPIK 1',
    date: 'Today',
  },
  {
    id: uuidv4(),
    name: 'Algebra 1',
    description: 'Formulas for exam',
    date: 'Yesterday',
  },
  {
    id: uuidv4(),
    name: 'Interview',
    description: '100 interview questions about React hghudwedwe',
    date: '22.09.2023',
  },
];

type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const Dashboard = ({navigation}: DashboardProps) => {
  const styles = useStyleSheet(themedStyles);
  const [flashcardCollection, setFlashcardCollection] = React.useState<
    FlashcardDetails[]
  >([]);

  const addNewFlashcardStack = () => {
    push(ref(db, '/flashcards'), {
      id: uuidv4(),
      name: 'Learn Korean NEW',
      description: 'Prep for TOPIK 1',
      date: '21.10.2023',
    });
  };

  React.useEffect(() => {
    addNewFlashcardStack();
    return onValue(ref(db, '/flashcards'), querySnapShot => {
      let data: FlashcardDetails[] = Object.values(querySnapShot.val()) || [];
      setFlashcardCollection(data);
    });
  }, []);

  const navigateFlashcardStack = (id: string, name: string) => {
    navigation.navigate('FlashcardStack', {stackId: id, stackName: name});
  };

  const renderAccountAction = (): React.ReactElement => (
    <Button appearance="ghost" onPress={() => navigation.navigate('Account')}>
      <Avatar
        source={require('../assets/user.png')}
        ImageComponent={ImageBackground}
      />
    </Button>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        alignment="center"
        title="Flashcards App <3"
        accessoryRight={renderAccountAction}
      />

      <Layout style={styles.layout}>
        <Text category="h3" style={styles.title}>
          Collection
        </Text>

        <List
          data={flashcardCollection}
          style={styles.list}
          renderItem={flashcard => (
            <View style={styles.card}>
              <View style={{width: '80%'}}>
                <Text category="h6">{flashcard.item.name}</Text>
                <Text category="s1">{flashcard.item.description}</Text>
                <Text category="c1" style={styles.cardDate}>
                  {flashcard.item.date}
                </Text>
              </View>

              <Button
                style={styles.button}
                size="small"
                // appearance="ghost"
                accessoryLeft={OpenIcon}
                onPress={() =>
                  navigateFlashcardStack(flashcard.item.id, flashcard.item.name)
                }
              />
            </View>
          )}
        />

        <View style={styles.bottom}>
          <Divider />
          <Button
            appearance="ghost"
            accessoryLeft={AddIcon}
            style={styles.buttonNew}
            size="giant">
            NEW FLASHCARD STACK
          </Button>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

export default Dashboard;

const themedStyles = StyleSheet.create({
  container: {flex: 1},
  layout: {
    flex: 1,
    position: 'relative',
  },
  title: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  list: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 20,
    borderRadius: 8,
    backgroundColor: 'color-basic-200',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
  cardDate: {
    fontStyle: 'italic',
  },
  button: {
    width: 25,
    alignSelf: 'center',
  },
  buttonNew: {
    paddingVertical: 20,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'white',
  },
});
