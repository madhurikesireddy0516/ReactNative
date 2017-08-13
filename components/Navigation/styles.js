import { StyleSheet } from 'react-native';
import colours from '../../styles/colours';

const styles = StyleSheet.create({
  menu: {
    alignSelf: 'flex-end'
  },
  menu_animation: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden'
  },
  menu_gradient: {
    flex: 1
  },
  menu__header: {
    flex: -1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginVertical: 25,
    paddingBottom: 80
  },
  menu_header_text: {
    flex: 1,
    color: colours.white,
    fontSize: 15,
    justifyContent: 'flex-start',
    paddingLeft: 15,
    fontWeight: 'bold'
  },
  cross_btn: {
    color: colours.greyLight,
    fontSize: 15,
    paddingRight: 15,
    justifyContent: 'flex-end'
  },
  menu__text: {
    backgroundColor: 'transparent',
    color: colours.white,
    fontSize: 25,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    fontWeight: 'bold'
  }
});

export default styles;
