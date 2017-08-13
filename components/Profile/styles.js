import { StyleSheet } from 'react-native';
import colours from '../../styles/colours';

const styles = StyleSheet.create({
  profile_container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  profile_header_container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderBottomColor: colours.greyBorder,
    paddingBottom: 20,
    marginTop: 20
  },
  profile_pic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1.5,
    borderColor: colours.white
  },
  profile_name: {
    fontSize: 20,
    marginTop: 15,
    color: colours.white,
    fontFamily: 'Rockwell'
  },
  profile_details_container: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderBottomColor: colours.greyBorder,
    paddingBottom: 10
  },
  profile_details_heading: {
    color: colours.white,
    opacity: 0.7,
    fontSize: 15,
    alignItems: 'flex-start',
    marginLeft: 15,
    fontWeight: 'bold',
    paddingTop: 10
  },
  profile_details_text: {
    color: colours.white,
    fontSize: 15,
    alignItems: 'flex-end',
    marginLeft: 15,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  profile_contact_container: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderBottomColor: colours.white,
    paddingBottom: 10
  },
  profile_contact_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  contact_item_text: {
    fontSize: 15,
    color: colours.white,
    alignItems: 'flex-start',
    marginLeft: 15,
    fontWeight: 'bold'
  },
  contact_item_icon: {
    width: 15,
    height: 15,
    marginRight: 20,
    paddingRight: 25,
    paddingTop: 20,
    resizeMode: 'contain'
  },
  profile_interests_container: {
    backgroundColor: 'transparent',
    marginLeft: 10
  },
  interests_content: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  interests_item: {
    color: colours.white,
    opacity: 0.7,
    fontSize: 15,
    padding: 8,
    fontWeight: 'bold',
    marginTop: 5
  },
  interests_item_name: {
    color: colours.white,
    fontSize: 15,
    padding: 8,
    fontWeight: 'bold',
    marginTop: 5,
    width: 200
  }
});

export default styles;
