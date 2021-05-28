import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Constants from 'expo-constants';

import { fontSizes, spacing} from '../../utils/sizes';
import { colors} from '../../utils/colors';

import RoundedButton from '../../components/RoundedButton';

export default function Focus({ addSubject }) {
  const [tempItem, setTempItem] = useState(null);
  console.log(tempItem)
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ flex: 1, marginRight: 20 }}
          onSubmitEditing={({ nativeEvent }) => setTempItem(nativeEvent.text)}
        />
        <RoundedButton
          onPress={() => addSubject(tempItem)}
          title="+"
          size={50}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    justifyContent: 'center',
    padding: spacing.md,
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
