import { StyleSheet } from 'react-native';
import colours from '../../styles/colours';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  notification_header: {
    flex: -1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginVertical: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  notification_title: {
    flex: 1,
    color: colours.white,
    fontSize: 20,
    justifyContent: 'flex-start',
    fontFamily: 'Rockwell'
  },
  notification_close: {
    flex: 0,
    justifyContent: 'flex-end',
    width: 16,
    height: 16,
    position: 'relative'
  },
  notification__list: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  notification_section_header: {
    backgroundColor: colours.purpleBg,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 15,
    marginBottom: 15,
    color: colours.white,
    fontSize: 18,
    fontFamily: 'Avenir',
    textAlign: 'center'
  },
  notification_item: {
    flexDirection: 'row',
    paddingLeft: 15,
    marginBottom: 15
  },
  notification_tick: {
    width: 26,
    height: 26,
    justifyContent: 'flex-start'
  },
  notification_content: {
    paddingLeft: 15
  },
  notification_type: {
    color: colours.white,
    fontSize: 18,
    fontFamily: 'Avenir',
    marginBottom: 4
  },
  notification_text: {
    color: colours.white,
    fontSize: 16,
    fontFamily: 'Avenir',
    paddingRight: 30
  },
  separator: {
    flex: 1,
    borderBottomWidth: 0.2,
    borderBottomColor: colours.white
  }
});

export default styles;
