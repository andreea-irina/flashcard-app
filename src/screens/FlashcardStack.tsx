import * as React from 'react';
import {
  FlatList,
  View,
  SafeAreaView,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
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
// firebase
import {db} from '../../firebase-config';
import {ref, get} from 'firebase/database';
import {Flashcard} from './CreateFlashcardStack';
import {BackIcon} from '../ui/Icons';

const CARD_WIDTH = Dimensions.get('window').width * 0.8;
const CARD_HEIGHT = Dimensions.get('window').height * 0.5;
const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1 - 20;

type FlashcardStackProps = NativeStackScreenProps<
  RootStackParamList,
  'FlashcardStack'
>;

const FlashcardStack = ({route}: FlashcardStackProps) => {
  const {stackId, stackName} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [cards, setCards] = React.useState<Flashcard[]>([]);
  const [activeCard, setActiveCard] = React.useState<number>(0);
  const [showAnswer, setShowAnswer] = React.useState<boolean>(false);

  const [scrollViewWidth, setScrollViewWidth] = React.useState(0);
  const boxWidth = scrollViewWidth * 0.8;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const pan = React.useRef(new Animated.ValueXY()).current;

  const navigateBack = () => {
    navigation.pop(1);
  };

  const getStack = async () => {
    try {
      const snapshot = await get(ref(db, '/flashcards/' + stackId));
      return snapshot.val();
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getStack()
      .then(snapshot => setCards(snapshot.cards))
      .catch(error => console.error(error, 'fuck off'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const renderItem = ({item, index}: any) => (
    <Animated.View
      style={{
        transform: [
          {
            scale: pan.x.interpolate({
              inputRange: [
                (index - 1) * boxWidth - halfBoxDistance,
                index * boxWidth - halfBoxDistance,
                (index + 1) * boxWidth - halfBoxDistance, // adjust positioning
              ],
              outputRange: [0.8, 1, 0.8], // scale down when out of scope
              extrapolate: 'clamp',
            }),
          },
        ],
      }}>
      <View
        style={{
          height: '100%',
          width: boxWidth,
          borderRadius: 24,
          backgroundColor: `rgba(${(index * 13) % 255}, ${
            (index * 35) % 255
          }, ${(index * 4) % 255}, .5)`,
        }}>
        <Text>{item.id}</Text>
      </View>
    </Animated.View>
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
        {/* <FlatList
          horizontal
          style={{backgroundColor: '#6b6b6b', height: 250}}
          contentContainerStyle={{paddingVertical: 16}}
          contentInsetAdjustmentBehavior="never"
          snapToAlignment="center"
          decelerationRate="fast"
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={1}
          snapToInterval={boxWidth}
          contentInset={{
            left: halfBoxDistance,
            right: halfBoxDistance,
          }}
          contentOffset={{x: halfBoxDistance * -1, y: 0}}
          onLayout={e => {
            setScrollViewWidth(e.nativeEvent.layout.width);
          }}
          data={cards}
          // renderItem={card => (
          //   <View style={styles.card}>
          //     <Text>{card.item.question}</Text>
          //   </View>
          // )}
          renderItem={renderItem}
        /> */}
        {/* <ScrollView
          horizontal
          pagingEnabled
          decelerationRate={0}
          snapToInterval={CARD_WIDTH + 10}
          snapToAlignment="center"
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET,
          }}
          contentContainerStyle={{
            paddingHorizontal:
              Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
          }}
          showsHorizontalScrollIndicator={false}>
          {cards.map(card => (
            <View key={card.id} style={styles.card}>
              <Text>{card.question}</Text>
            </View>
          ))}
        </ScrollView> */}
      </Layout>
    </SafeAreaView>
  );
};

export default FlashcardStack;

const styles = StyleSheet.create({
  container: {flex: 1},
  layout: {flex: 1},
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 15,
    backgroundColor: '#F7F9FC',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
});
