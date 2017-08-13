import { StyleSheet } from 'react-native';
import colours from '../../styles/colours';

const styles = StyleSheet.create({
  header: {
    flex: 0,
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 25,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'transparent',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon_back_container: {
    width: 20,
    height: 20
  },
  icon_back: {
    flex: 1,
    resizeMode: 'contain'
  },
  header_title: {
    flex: 1,
    textAlign: 'center',
    color: colours.white,
    fontFamily: 'Rockwell',
    fontWeight: '100',
    marginTop: 6,
    height: 20
  },
  icon_notification_container: {
    width: 20,
    height: 22
  },
  icon_notification: {
    flex: 1,
    resizeMode: 'contain'
  }
});

export default styles;
