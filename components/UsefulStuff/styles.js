import { StyleSheet } from 'react-native';
import colours from '../../styles/colours';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmented_header_container: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20
  },
  segment_container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  calendar_content: {
    flex: 1,
    marginTop: 25
  },
  kpi_content: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center'
  },
  kpi_text: {
    marginTop: 10,
    fontFamily: 'Avenir',
    color: colours.white,
    fontSize: 16
  },
  links_content: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
  },
  links_header: {
    color: colours.white,
    fontFamily: 'Avenir',
    fontSize: 18,
    marginTop: 30
  },
  links_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: colours.white,
    paddingTop: 10,
    paddingBottom: 10
  },
  links_text: {
    alignSelf: 'center',
    fontFamily: 'Avenir',
    color: colours.white,
    fontSize: 16
  },
  links_arrow: {
    alignSelf: 'center',
    width: 8,
    height: 14
  }
});

export default styles;
