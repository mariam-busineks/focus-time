import React, {useState, useEffect, useRef} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

import {spacing, fontSizes} from '../utils/sizes';
import {colors} from '../utils/colors';

const minutesToMillis = mins => mins * 1000 * 60;

const formatTime = time => time < 10 ? `0${time}`: time;

export default function CountDown({minutes= .1, isPaused, onProgress, onEnd}) {
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000 ) % 60;
  const interval = useRef(null);

  const countdown = () => {
    setMillis(time => {
      if(time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft / minutesToMillis(minutes))
      return timeLeft;
    })
  }

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes])

  useEffect(() => {
    if(isPaused) {
     if(interval.current) clearInterval(interval.current) 
     return;
    }
    interval.current = setInterval(countdown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatTime(minute)}:{formatTime(second)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.6)'
  }
});
