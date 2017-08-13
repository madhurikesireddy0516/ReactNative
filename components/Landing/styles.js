import { StyleSheet } from 'react-native';
import colours from '../../styles/colours';

const styles = StyleSheet.create({
  landing: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden'
  },
  landingImage: {
    margin: 30,
    resizeMode: 'contain',
    width: 126,
    height: 172
  },
  landingText: {
    color: colours.white,
    backgroundColor: 'transparent',
    textAlign: 'justify',
    marginLeft: 25,
    marginRight: 25,
  },
  continueButton: {
    backgroundColor: 'transparent',
    color: colours.white,
    borderWidth: 0.5,
    borderColor: colours.white,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 45,
    paddingRight: 45,
    borderRadius: 5,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },
});

export default styles;
