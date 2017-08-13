import React from 'react';
import {
  Image,
  Text,
  View
} from 'react-native';
import styles from './styles';

const postImage = require('../../assets/images/Newbies.png');

const text = 'Digital 2.0 brings together our existing digital initiatives under ' +
    'one umbrella to transform the way we connect and build relationships with our consumers. ' +
    'In order to be competitive and to be able to invest in the necessary technology, we need a ' +
    'single, joined up approach and eco-system. That is what Digital 2.0 offers. It is the first ' +
    'time that we have a common language, a single framework and one set of tools, across Unilever.';
function Newbies() {
  return (
    <View style={styles.post}>
      <Image source={postImage} style={styles.postImage} />
      <Text style={styles.postText}>{text}</Text>
    </View>
  );
}

export default Newbies;
