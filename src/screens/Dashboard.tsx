/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Divider,
  Layout,
  Text,
  TopNavigation,
  useStyleSheet,
} from '@ui-kitten/components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {AddIcon, OpenIcon} from '../ui/Icons';
// firebase
import {db} from '../../firebase-config';
import {ref, get, onValue} from 'firebase/database';
import {FlashcardStack} from './CreateFlashcardStack';
import dayjs from 'dayjs';

// const flashcardCollection: FlashcardDetails[] = [
//   {
//     id: uuidv4(),
//     name: 'Learn Korean',
//     description: 'Prep for TOPIK 1',
//     date: 'Today',
//   },
//   {
//     id: uuidv4(),
//     name: 'Algebra 1',
//     description: 'Formulas for exam',
//     date: 'Yesterday',
//   },
//   {
//     id: uuidv4(),
//     name: 'Interview',
//     description: '100 interview questions about React hghudwedwe',
//     date: '22.09.2023',
//   },
// ];

type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const Dashboard = ({navigation}: DashboardProps) => {
  const styles = useStyleSheet(themedStyles);
  const [flashcardCollection, setFlashcardCollection] = React.useState<
    FlashcardStack[]
  >([]);

  const getCollection = async () => {
    try {
      const snapshot = await get(ref(db, '/flashcards'));
      return snapshot.val();
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    return onValue(
      ref(db, '/flashcards'),
      querySnapShot => {
        if (querySnapShot.exists()) {
          const data: FlashcardStack[] = querySnapShot
            ? Object.values(querySnapShot.val())
            : [];

          const ids: string[] = Object.keys(querySnapShot.val());

          console.log();

          setFlashcardCollection(
            data.map((elem, index) => {
              return {
                ...elem,
                id: ids[index],
              };
            }),
          );
        }
      },
      error => console.error(error, 'fuck off'),
    );
  }, []);

  const navigateFlashcardStack = (id: string, name: string) => {
    navigation.navigate('FlashcardStack', {stackId: id, stackName: name});
  };

  const navigateCreateFlashcardStack = () => {
    navigation.navigate('CreateFlashcardStack');
  };

  const getDate = (itemDate: string) => {
    const today = dayjs().format('DD.MM.YYYY');
    const yesterday = dayjs().subtract(1, 'day').format('DD.MM.YYYY');

    if (itemDate === today) {
      return 'Today';
    }
    if (itemDate === yesterday) {
      return 'Yesterday';
    }

    return itemDate;
  };

  const renderAccountAction = (): React.ReactElement => (
    <Button
      appearance="ghost"
      size="tiny"
      onPress={() => navigation.navigate('Account')}>
      <Avatar
        source={require('../assets/user.png')}
        ImageComponent={ImageBackground}
      />
    </Button>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation alignment="center" accessoryRight={renderAccountAction} />

      <Layout style={styles.layout}>
        <Text category="h3" style={styles.title}>
          Collection
        </Text>

        {flashcardCollection.length > 0 ? (
          <FlatList
            data={flashcardCollection}
            style={styles.list}
            renderItem={flashcard => (
              <View style={styles.card}>
                <View style={{width: '80%'}}>
                  <Text category="h6">{flashcard.item.name}</Text>
                  <Text category="s1">{flashcard.item.description}</Text>
                  <Text category="c1" style={styles.cardDate}>
                    {getDate(flashcard.item.date)}
                  </Text>
                </View>

                <Button
                  style={styles.button}
                  size="small"
                  accessoryLeft={OpenIcon}
                  onPress={() =>
                    navigateFlashcardStack(
                      flashcard.item.id,
                      flashcard.item.name,
                    )
                  }
                />
              </View>
            )}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text category="p1">Nothing to see here yet.</Text>
          </View>
        )}

        <View style={styles.bottom}>
          <Divider />
          <Button
            appearance="ghost"
            accessoryLeft={AddIcon}
            style={styles.buttonNew}
            size="giant"
            onPress={() => navigateCreateFlashcardStack()}>
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
    paddingBottom: 10,
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
    backgroundColor: '#F7F9FC',
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
    // position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
