import * as React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Divider,
  Button,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Input,
  Card,
} from '@ui-kitten/components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import dayjs from 'dayjs';
import {RootStackParamList} from '../App';
import {AddIcon, BackIcon} from '../ui/Icons';
// firebase
import {db} from '../../firebase-config';
import {ref, push} from 'firebase/database';

export type Flashcard = {
  id: string;
  question: string;
  answer: string;
};

export type FlashcardStack = {
  id: string;
  name: string;
  description: string;
  date: string;
  cards: Flashcard[];
};

type CreateFlashcardStackProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateFlashcardStack'
>;

const CreateFlashcardStack = ({navigation}: CreateFlashcardStackProps) => {
  const [formValues, setFormValues] = React.useState<FlashcardStack>(
    {} as FlashcardStack,
  );
  const [cardValues, setCardValues] = React.useState<Flashcard>(
    {} as Flashcard,
  );

  const navigateBack = () => {
    navigation.goBack();
  };

  const addFlashcardStack = () => {
    push(ref(db, '/flashcards'), {
      name: formValues.name,
      description: formValues.description,
      date: dayjs().format('DD.MM.YYYY'),
      cards: formValues.cards ? formValues.cards : [],
    }).then(() => navigation.pop(1));
  };

  const addCardToStack = () => {
    const newCard: Flashcard = {
      id: uuidv4(),
      question: cardValues.question,
      answer: cardValues.answer,
    };

    if (formValues.cards) {
      setFormValues({...formValues, cards: [newCard, ...formValues.cards]});
    } else {
      setFormValues({...formValues, cards: [newCard]});
    }
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        title="New Flashcard Stack"
        alignment="center"
        accessoryLeft={BackAction}
      />

      <Divider />

      <Layout style={styles.layout}>
        <KeyboardAwareScrollView>
          <Text category="h3" style={styles.sectionTitle}>
            General
          </Text>

          <View style={styles.section}>
            <Input
              value={formValues.name}
              label="Name *"
              placeholder="Name this stack"
              onChangeText={nextValue =>
                setFormValues({...formValues, name: nextValue})
              }
            />

            <Input
              value={formValues.description}
              label="Description *"
              placeholder="Add a description..."
              onChangeText={nextValue =>
                setFormValues({...formValues, description: nextValue})
              }
            />
          </View>

          <Text category="h3" style={styles.sectionTitle}>
            Cards
          </Text>

          <View style={styles.section}>
            <Input
              value={cardValues.question}
              label="Question"
              placeholder="This is what you'll see"
              onChangeText={nextValue =>
                setCardValues({...cardValues, question: nextValue})
              }
            />

            <Input
              value={cardValues.answer}
              label="Answer"
              placeholder="This is what you'll guess"
              onChangeText={nextValue =>
                setCardValues({...cardValues, answer: nextValue})
              }
            />

            <Button
              appearance="ghost"
              accessoryLeft={AddIcon}
              style={styles.addCard}
              size="medium"
              onPress={() => addCardToStack()}
              disabled={
                !cardValues || !cardValues.question || !cardValues.answer
              }>
              Add
            </Button>
          </View>

          {formValues.cards &&
            formValues.cards.map(flashcard => (
              <View key={flashcard.id} style={styles.card}>
                <Text category="h6" numberOfLines={1}>
                  {flashcard.question}
                </Text>
                <Text category="s1" numberOfLines={1}>
                  {flashcard.answer}
                </Text>
              </View>
            ))}
        </KeyboardAwareScrollView>
      </Layout>

      <View style={styles.bottom}>
        <Divider />
        <Button
          appearance="filled"
          accessoryLeft={AddIcon}
          style={styles.create}
          size="giant"
          onPress={() => addFlashcardStack()}
          disabled={!formValues || !formValues.name || !formValues.description}>
          CREATE
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default CreateFlashcardStack;

const styles = StyleSheet.create({
  container: {flex: 1},
  layout: {flex: 1, position: 'relative'},
  section: {
    padding: 20,
    gap: 10,
  },
  sectionTitle: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  addCard: {width: 'auto', alignSelf: 'flex-end'},
  card: {
    marginBottom: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: '#F7F9FC',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },

  bottom: {
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  create: {
    paddingVertical: 20,
    borderRadius: 0,
  },
});
