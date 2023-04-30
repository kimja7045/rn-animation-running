import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Bottom from '../components/YoutubeMusic/Bottom';
import LogoHeader from '../components/YoutubeMusic/LogoHeader';
import CategoryHeader from '../components/YoutubeMusic/CategoryHeader';
import HeaderBackground from '../components/YoutubeMusic/HeaderBackground';

export default function YoutubeMusic() {
  return (
    <View style={{flex: 1}}>
      <LogoHeader />
      <CategoryHeader />
      <HeaderBackground />
      <ScrollView style={{height: 500}}>
        <Text>music list</Text>
      </ScrollView>
      <Bottom />
    </View>
  );
}
