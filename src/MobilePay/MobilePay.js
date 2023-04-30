import React, {useRef} from 'react';
import {View, Dimensions, PanResponder, Animated} from 'react-native';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = CARD_WIDTH * 0.58;

const CARD_ITEMS = ['#aaa', '#bbb', '#ccc', '#ddd', '#eee', '#f2f2f2'];

export default function MobilePay() {
  const cardRef = useRef('fold'); // fold or unfold
  const yAnim = useRef(new Animated.Value(0)).current;
  const rotateZAnim = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const {dy, y} = gestureState;
        // console.log(dy);

        if (dy > 5 && dy < 60 && cardRef.current === 'fold') {
          yAnim.setValue(dy); // 이렇게 설정 후 컴포넌트를 드래그하면 화면에서 움직임
        }

        // 펼쳐져있는데 또 펼치려고 할 때
        if (dy > 5 && dy < 60 && cardRef.current === 'unfold') {
          rotateZAnim.setValue(dy); // 이렇게 설정 후 컴포넌트를 드래그하면 화면에서 움직임
        }

        if (dy > -75 && dy < 5 && cardRef.current === 'unfold') {
          yAnim.setValue(65 + dy);
        }
      },
      onPanResponderEnd: (evt, gestureState) => {
        const {dy, y} = gestureState;
        if (dy > 5) {
          // spring -> timing 함수 가능
          Animated.spring(yAnim, {
            toValue: 65,
            duration: 300,
            useNativeDriver: false,
          }).start();
          cardRef.current = 'unfold';
        }

        if (dy < 5 && cardRef.current === 'unfold') {
          Animated.spring(rotateZAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }

        if (dy < 5) {
          Animated.spring(yAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
          cardRef.current = 'fold';
        }
      },
    }),
  ).current;

  return (
    <View
      {...panResponder.panHandlers}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
      }}>
      <View
        style={{
          position: 'relative',
          width: CARD_WIDTH,
          height: CARD_HEIGHT + (CARD_ITEMS.length - 1) * 20,
        }}>
        {CARD_ITEMS.map((color, idx) => {
          return (
            <CardItem
              key={idx}
              idx={idx}
              yAnim={yAnim}
              rotateZAnim={rotateZAnim}
              backgroundColor={color}
              style={{marginTop: idx * 20}}
            />
          );
        })}
      </View>
    </View>
  );
}

const CardItem = ({backgroundColor, style, yAnim, rotateZAnim, idx}) => {
  const multiplyValue = useRef(new Animated.Value(idx - 3)).current;
  const translateY = Animated.multiply(yAnim, multiplyValue);

  return (
    <Animated.View
      style={{
        transform: [
          {translateY},
          {
            rotateZ: rotateZAnim.interpolate({
              inputRange: [0, 20],
              outputRange: ['0deg', '2deg'],
            }),
          },
        ],
        position: 'absolute',
        backgroundColor,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 4,
        shadowOffset: {
          width: -3,
          height: -3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        ...style,
      }}
    />
  );
};
