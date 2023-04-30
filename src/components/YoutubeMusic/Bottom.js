import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {BOTTOM_HEIGHT} from '../../YoutubeMusic/utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export default function Bottom() {
  return (
    <View
      style={{
        backgroundColor: '#222',
        paddingBottom: getBottomSpace,
      }}>
      <View style={{height: BOTTOM_HEIGHT}}>
        <View style={{flexDirection: 'row'}}>
          <BottomItem title="홈" iconName="home-filled" />
          <BottomItem title="둘러보기" iconName="explore" />
          <BottomItem title="보관함" iconName="library-music" />
        </View>
      </View>
    </View>
  );
}

function BottomItem({title, iconName}) {
  return (
    <TouchableOpacity style={{alignItems: 'center', flex: 1}}>
      <View style={{marginVertical: 4}}>
        <Icon name={iconName} color="white" size={24} />
      </View>
      <Text style={{color: 'white'}}>{title}</Text>
    </TouchableOpacity>
  );
}
