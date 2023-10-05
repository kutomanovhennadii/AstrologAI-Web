import React from 'react';
import { View, StyleSheet } from 'react-native';

const Container = ({ children, topOffset }) => {

  //console.log("topOffset =" + topOffset);

  return (
    <View style={[styles.container, { paddingTop: topOffset }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',  
    // borderWidth: 0,
    // borderColor: 'red',
  },
});

export default Container;