import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

import CountDown from '../../components/CountDown';
import RoundedButton from '../../components/RoundedButton';
import Timing from './Timing';

  const defaultTime = .1;


export default function Timer({ focusSubject, onTimerEnded }) {
  useKeepAwake();
  const [minutes, setMinutes] = useState(defaultTime);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  
  const vibrate = () => {
    if(Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(5000);
    }
  }

  const onProgress = (progress) => {
    setProgress(progress);
  }

  const onChangeTime = (mins) => {
    setMinutes(mins);
    setProgress(1);
    setIsStarted(false);
  }

  const onTimerEnd = () => {
    vibrate();
    setMinutes(defaultTime);
    setProgress(1);
    setIsStarted(false);
    onTimerEnded();
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onTimerEnd} />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}> {focusSubject}</Text>
      </View>
      <View style={{paddingTop: spacing.sm}}>
      <ProgressBar progress={progress} color="#5e84e2" style={{ height: 10}} />
      </View>

      <View style={styles.btnContainer}>
       <Timing changeTime={onChangeTime}/>
      </View>
      <View style={styles.btnContainer}>
        {isStarted ? (
          <RoundedButton
            style={styles.btn}
            onPress={() => setIsStarted(false)}
            title="Pause"
            size={150}
          />
        ) : (
          <RoundedButton
            style={styles.btn}
            onPress={() => setIsStarted(true)}
            title="Start"
            size={150}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {},
});
