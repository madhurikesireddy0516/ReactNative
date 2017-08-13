import { StyleSheet } from 'react-native';
import colours from '../../styles/colours';

const styles = StyleSheet.create({
  reach_container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 20,
    flex: 1
  },
  reach_pic: {
    width: 100,
    height: 100
  },
  reach_name: {
    fontSize: 20,
    color: colours.white,
    fontFamily: 'Rockwell',
    marginTop: 10
  },
  reach_designation: {
    fontSize: 12,
    color: colours.white
  },
  reach_text_input: {
    height: 170,
    fontSize: 16,
    backgroundColor: colours.white,
    marginTop: 68,
    padding: 20
  },
  send_button: {
    height: 30,
    width: 167,
    marginTop: 20,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: colours.white,
    padding: 5,
    color: colours.white,
    fontSize: 15,
    borderRadius: 5,
    textAlign: 'center'
  },
  reach_error: {
    fontSize: 15,
    color: colours.white,
    fontFamily: 'Avenir',
    marginTop: 20,
    marginLeft: 5
  }
});

export default styles;
