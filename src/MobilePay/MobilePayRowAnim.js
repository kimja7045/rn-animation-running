import React, {useRef, useState} from 'react';
import {View, Dimensions, PanResponder, Animated} from 'react-native';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = CARD_WIDTH * 0.58;

export default function MobilePayRowAnimation() {
  const [focusedIndex, setFocusedIndex] = useState(5);
  const cardRef = useRef('fold'); // fold or unfold
  const yAnim = useRef(new Animated.Value(0)).current;
  const rotateZAnim = useRef(new Animated.Value(0)).current;
  const CARD_LIST = [
    {
      color: '#aaa',
      xAnim: useRef(new Animated.Value(0)).current,
    },
    {
      color: '#bbb',
      xAnim: useRef(new Animated.Value(0)).current,
    },
    {
      color: '#ccc',
      xAnim: useRef(new Animated.Value(0)).current,
    },
    {
      color: '#ddd',
      xAnim: useRef(new Animated.Value(0)).current,
    },
    {
      color: '#eee',
      xAnim: useRef(new Animated.Value(0)).current,
    },
    {
      color: '#f2f2f2',
      xAnim: useRef(new Animated.Value(0)).current,
    },
  ];

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const {y, dy, dx} = gestureState;
      // console.log(dx);
      // dy, dx 뭐가 더 크게 변했을까
      const xSlider = Math.abs(dy) < Math.abs(dx);
      const ySlider = Math.abs(dx) < Math.abs(dy);

      if (xSlider) {
        // 카드 버리기
        if (dx < -5 && cardRef.current === 'fold' && focusedIndex >= 0) {
          CARD_LIST[focusedIndex].xAnim.setValue(dx);
        }
      }

      if (ySlider) {
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
      }
    },
    onPanResponderEnd: (evt, gestureState) => {
      const {dy, dx} = gestureState;
      const xSlider = Math.abs(dy) < Math.abs(dx);
      const ySlider = Math.abs(dx) < Math.abs(dy);

      if (xSlider) {
        // 카드 버리기
        if (dx < -5 && cardRef.current === 'fold' && focusedIndex >= 0) {
          Animated.timing(CARD_LIST[focusedIndex].xAnim, {
            toValue: -600,
            duration: 300,
            useNativeDriver: false,
          }).start(({finished}) => {
            if (finished) {
              setFocusedIndex(prev => prev - 1);
            }
          });
        }

        // 카드 가져오기
        if (dx > 5 && cardRef.current === 'fold' && focusedIndex < 5) {
          Animated.timing(CARD_LIST[focusedIndex + 1].xAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start(({finished}) => {
            if (finished) {
              setFocusedIndex(prev => prev + 1);
            }
          });
        }
      }

      if (ySlider) {
        if (dy > 5) {
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
      }
    },
  });

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
          height: CARD_HEIGHT + (CARD_LIST.length - 1) * 20,
        }}>
        {CARD_LIST.map((card, idx) => {
          return (
            <CardItem
              key={idx}
              idx={idx}
              xAnim={card.xAnim}
              yAnim={yAnim}
              rotateZAnim={rotateZAnim}
              backgroundColor={card.color}
              style={{marginTop: idx * 20}}
            />
          );
        })}
      </View>
    </View>
  );
}

const CardItem = ({backgroundColor, style, xAnim, yAnim, rotateZAnim, idx}) => {
  const multiplyValue = useRef(new Animated.Value(idx - 3)).current;
  const translateY = Animated.multiply(yAnim, multiplyValue);

  return (
    <Animated.View
      style={{
        transform: [
          {translateY},
          {translateX: xAnim},
          {
            rotateZ: rotateZAnim.interpolate({
              inputRange: [0, 20],
              outputRange: ['0deg', '10deg'],
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
