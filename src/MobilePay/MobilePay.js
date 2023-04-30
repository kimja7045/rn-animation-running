import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = CARD_WIDTH * 0.58;

const CARD_ITEMS = ['#aaa', '#bbb', '#ccc', '#ddd', '#eee', '#f2f2f2'];

export default function MobilePay() {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          position: 'relative',
          width: CARD_WIDTH,
          height: CARD_HEIGHT + (CARD_ITEMS.length - 1) * 20,
        }}>
        {CARD_ITEMS.map((color, idx) => (
          <CardItem backgroundColor={color} style={{marginTop: idx * 20}} />
        ))}
      </View>
    </View>
  );
}

const CardItem = ({backgroundColor, style}) => {
  return (
    <TouchableOpacity
      style={{
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
