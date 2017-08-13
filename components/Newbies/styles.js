import { StyleSheet } from 'react-native';
import colours from '../../styles/colours';

const styles = StyleSheet.create({
  post: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 595,
    marginLeft: 20,
    marginRight: 20,
    overflow: 'hidden'
  },
  postImage: {
    resizeMode: 'contain',
    width: 330,
    height: 250
  },
  postText: {
    color: colours.white,
    backgroundColor: 'transparent',
    textAlign: 'justify'
  }
});

export default styles;
