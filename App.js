import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import Focus from './src/features/focus/Focus';
import Timer from './src/features/timer/Timer';
import { colors } from './src/utils/colors';

export default function App() {
 
  const [focusSubject, setFocusSubject] = useState(null);
  console.log(focusSubject);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnded={() => {
            setFocusSubject(null);
          }}
        />
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
      <Text style={{color: colors.white}}>{focusSubject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.darkBlue,
    padding: 8,
  },
});
