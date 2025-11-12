import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { colors } from './theme/colors';
import { fontFamilies } from './theme/typography';
import { questions } from './data/questions';

const screen = Dimensions.get('window');

export default function App() {
  const q = questions[0];
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content"/>
      {/* Header */}
      <View style={styles.header}><View style={styles.headerSpacer}/>{/* You can implement a title/back here */}</View>
      {/* Progress Dots */}
      <View style={styles.progress}><View style={[styles.dot,{backgroundColor:colors.accentYellow}]}/>{/* + 3 more dots */}</View>
      {/* Question Card */}
      <View style={styles.card}>
        {/* Card Content: Header, text, stub input */}
        <View style={styles.cardHeaderText}><View style={styles.cardIndicator}/></View>
        {/* Question and subtext */}
        <View style={{flexDirection:'column',marginBottom:16}}>
          <View style={{height:8}}/>
          {/* Question Text */}
        </View>
        {/* Placeholder for answer */}
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><View style={{width:56,height:56,backgroundColor:colors.accentYellow,borderRadius:28}}/></View>
      </View>
      {/* Bottom Navigation */}
      <View style={styles.nav}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundGradientStart,
  },
  header: {
    height: 80,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  headerSpacer: { height: 60 },
  progress: {
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  dot: {
    width: 8, height: 8, borderRadius: 4, marginHorizontal: 6,
  },
  card: {
    minHeight: 360,
    width: screen.width - 32,
    alignSelf: 'center',
    padding: 24,
    borderRadius: 16,
    backgroundColor: colors.cardBg,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeaderText: { flexDirection: 'row', alignItems: 'center' },
  cardIndicator: { height: 14 },
  nav: {
    position: 'absolute',
    left: 0, right: 0, bottom: 24,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});
