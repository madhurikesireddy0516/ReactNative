import { StyleSheet } from 'react-native';
import colours from '../../styles/colours';

const styles = StyleSheet.create({
  team_container: {
    backgroundColor: 'transparent'
  },
  team_header: {
    marginBottom: 20
  },
  team_member_header: {
    maxHeight: 110
  },
  team_list_header: {
    maxHeight: 80
  },
  team_header_content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 5
  },
  all_teams_button: {
    backgroundColor: 'transparent',
    height: 30,
    marginLeft: 15,
    borderWidth: 0.5,
    borderColor: colours.white,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: colours.white,
    fontSize: 15,
    borderRadius: 5,
    textAlign: 'center'
  },
  all_locations_button: {
    backgroundColor: 'transparent',
    height: 30,
    marginLeft: 15,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: colours.white,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: colours.white,
    fontSize: 15,
    borderRadius: 5,
    textAlign: 'center'
  },
  team_search: {
    height: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    color: colours.white,
    backgroundColor: colours.darkPurple,
    padding: 5,
    fontSize: 15,
    borderRadius: 5,
    textAlign: 'center'
  },
  team_section_header: {
    backgroundColor: colours.lightPurple,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 15,
    marginBottom: 15,
    color: colours.white,
    fontSize: 18,
    fontFamily: 'Avenir'
  },
  team_list: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  team_row: {
    marginBottom: 20,
    marginTop: 15,
    justifyContent: 'space-around',
    paddingLeft: 15,
    paddingRight: 20,
    backgroundColor: 'transparent'
  },
  row_name: {
    color: colours.white
  },
  team_icon_text_row: {
    flexDirection: 'row'
  },
  team_profile_image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: colours.white
  },
  team_content: {
    paddingLeft: 20,
    paddingRight: 30
  },
  team__text: {
    color: colours.white,
    fontSize: 20,
    justifyContent: 'center',
    fontFamily: 'Avenir'
  },
  team__location: {
    color: colours.white,
    fontSize: 15,
    paddingTop: 5,
    fontFamily: 'Avenir'
  },
  separator: {
    borderBottomWidth: 0.3,
    borderBottomColor: colours.white,
    height: 1,
    marginLeft: 15,
    marginRight: 20
  },
  text: {
    color: colours.white,
  }
});

export default styles;
