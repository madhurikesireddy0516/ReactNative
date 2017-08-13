import { StyleSheet } from 'react-native';
import colours from '../../styles/colours';

const styles = StyleSheet.create({
  feedback_container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 10,
    flex: 1
  },
  feedback_image: {
    margin: 10,
    resizeMode: 'contain',
    width: 103,
    height: 149
  },
  feedback_designation: {
    fontSize: 12,
    color: colours.white
  },
  feedback_text_input: {
    height: 180,
    fontSize: 16,
    backgroundColor: colours.white,
    marginTop: 30,
    padding: 20
  },
  send_button: {
    height: 30,
    width: 167,
    marginTop: 30,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: colours.white,
    padding: 5,
    color: colours.white,
    fontSize: 15,
    borderRadius: 5,
    textAlign: 'center'
  },
  feedback_error: {
    fontSize: 15,
    color: colours.white,
    fontFamily: 'Avenir',
    marginTop: 20,
    marginLeft: 5
  }
});

export default styles;
