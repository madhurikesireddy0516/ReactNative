import { StyleSheet } from 'react-native';
import colours from '../../styles/colours';

const styles = StyleSheet.create({
  animation_container: {
    flex: 1
  },
  animation_image_container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation_logo_container: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation_text: {
    fontFamily: 'Avenir',
    color: colours.white,
    backgroundColor: 'transparent'
  }
});

export default styles;
