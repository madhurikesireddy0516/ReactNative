import { StyleSheet } from 'react-native';
import colours from '../../styles/colours';

const styles = StyleSheet.create({
  login: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    marginTop: 40,
    color: colours.white,
    fontFamily: 'Rockwell'
  },
  logo: {
    height: 110,
    width: 80,
    marginTop: 30,
    marginBottom: 20
  },
  text_input: {
    backgroundColor: colours.white,
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    fontSize: 16
  },
  login_button: {
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
    marginTop: 30,
    marginBottom: 50
  },
  login_button_error: {
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
    marginTop: 20,
    marginBottom: 50
  },
  login_error: {
    fontSize: 18,
    color: colours.black,
    fontFamily: 'Avenir',
    marginTop: 20,
    marginLeft: 5
  },
  forgot_password: {
    color: colours.white
  }
});

export default styles;
