import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

import RoundedButton from '../../components/RoundedButton';

export default function Timing({ changeTime }) {
  

  return (
    <>
    <View style={styles.timingBtn}>
      <RoundedButton title="10" size={75} onPress={() => changeTime(10)} />
    </View>
    <View style={styles.timingBtn}>
      <RoundedButton title="15" size={75} onPress={() => changeTime(15)} />
    </View>
    <View style={styles.timingBtn}>
      <RoundedButton title="20" size={75} onPress={() => changeTime(20)} />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  timingBtn: {
    flex: 1,
    alignItems: 'center'
  },
  
});
