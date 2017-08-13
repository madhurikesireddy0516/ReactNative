import { StyleSheet } from 'react-native';
import colours from '../../styles/colours';

const styles = StyleSheet.create({
  menu: {
    alignSelf: 'flex-end'
  },
  menu_animation: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden'
  },
  menu_gradient: {
    flex: 1
  },
  menu_header: {
    flex: 0,
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    marginTop: 30,
    height: 50
  },
  menu_logo_container: {
    flex: 1
  },
  menu_header_logo: {
    justifyContent: 'flex-start',
    width: 60,
    height: 12,
    position: 'relative',
    left: 25
  },
  menu_close: {
    flex: 0,
    justifyContent: 'flex-end',
    width: 16,
    height: 16,
    marginRight: 15
  },
  menu_content: {
  },
  menu_item: {
    backgroundColor: 'transparent',
    color: colours.white,
    fontSize: 30,
    paddingLeft: 25,
    paddingRight: 15,
    fontFamily: 'Rockwell',
    lineHeight: 40,
    marginBottom: 16
  },
  menu_button: {
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  menu_icon: {
    width: 75,
    height: 75,
    backgroundColor: 'transparent'
  }
});

export default styles;
