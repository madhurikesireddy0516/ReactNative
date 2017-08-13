import { StyleSheet } from 'react-native';
import colours from '../../styles/colours';

const styles = StyleSheet.create({
  feed: {
    backgroundColor: 'transparent'
  },
  feed__row: {
    paddingTop: 15,
    paddingBottom: 20,
    justifyContent: 'space-around'
  },
  feed__row_unilever: {
    paddingTop: 20,
    justifyContent: 'space-around',
    backgroundColor: colours.white,
    marginBottom: 35
  },
  feed_icon_text_row: {
    flexDirection: 'row',
    paddingLeft: 10
  },
  feed_icon: {
    width: 25,
    height: 25
  },
  feed_content: {
    paddingLeft: 10,
    marginRight: 50
  },
  timestamp_container: {
    flexDirection: 'row'
  },
  timestamp_unilever: {
    color: colours.darkPurple,
    fontSize: 10,
    paddingTop: 5,
    fontStyle: 'italic'
  },
  timestamp: {
    color: colours.white,
    fontSize: 10,
    paddingTop: 5,
    fontStyle: 'italic'
  },
  comment_count_unilever: {
    color: colours.darkPurple,
    fontSize: 10,
    paddingTop: 5,
    fontStyle: 'italic',
    marginLeft: 35
  },
  comment_count: {
    color: colours.white,
    fontSize: 10,
    paddingTop: 5,
    fontStyle: 'italic',
    marginLeft: 35
  },
  like_count_unilever: {
    color: colours.darkPurple,
    fontSize: 10,
    paddingLeft: 25,
    paddingTop: 5,
    fontStyle: 'italic'
  },
  like_count: {
    color: colours.white,
    fontSize: 10,
    paddingLeft: 25,
    paddingTop: 5,
    fontStyle: 'italic'
  },
  like_icon: {
    width: 20,
    height: 15,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: 5
  },
  comment_icon: {
    width: 20,
    height: 15,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: 5
  },
  comments_container: {
    paddingRight: 80,
    marginLeft: 20
  },
  comment_box_unilever: {
    backgroundColor: colours.white,
    paddingTop: 10,
    paddingBottom: 10
  },
  comment_box: {
    paddingTop: 10,
    paddingBottom: 10
  },
  comment_text_unilever: {
    fontSize: 12,
    color: colours.darkPurple,
    fontFamily: 'Avenir',
    alignItems: 'center'
  },
  comment_text: {
    fontSize: 12,
    color: colours.white,
    fontFamily: 'Avenir',
    alignItems: 'center'
  },
  child_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comment_timestamp_unilever: {
    fontSize: 10,
    fontStyle: 'italic',
    color: colours.darkPurple,
    fontFamily: 'Avenir'
  },
  comment_timestamp: {
    fontSize: 10,
    fontStyle: 'italic',
    color: colours.white,
    fontFamily: 'Avenir'
  },
  author: {
    fontSize: 10,
    fontStyle: 'italic',
    color: colours.yellow,
    fontFamily: 'Avenir'
  },
  b: {
    fontWeight: '500'
  },
  i: {
    fontStyle: 'italic'
  },
  pre: {
    fontFamily: 'Avenir'
  },
  code: {
    fontFamily: 'Avenir'
  },
  a: {
    color: colours.yellow,
    fontFamily: 'Avenir'
  },
  span: {
    fontSize: 14,
    color: colours.darkPurple,
    fontFamily: 'Avenir'
  },
  label: {
    fontSize: 14,
    color: colours.white,
    fontFamily: 'Avenir'
  },
  p: {
    fontSize: 15,
    color: colours.white
  },
  send_button: {
    height: 20,
    width: 100,
    marginTop: 10,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: colours.white,
    padding: 5,
    color: colours.white,
    fontSize: 10,
    borderRadius: 5,
    textAlign: 'center'
  },
  send_button_unilever: {
    height: 20,
    width: 100,
    marginTop: 10,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: colours.darkPurple,
    padding: 5,
    color: colours.darkPurple,
    fontSize: 10,
    borderRadius: 5,
    textAlign: 'center'
  },
  comment_input_box_unilever: {
    borderWidth: 0.5,
    borderColor: colours.darkPurple,
    borderRadius: 5,
    height: 20,
    color: colours.darkPurple,
    fontSize: 10,
    padding: 5
  },
  comment_input_box: {
    borderWidth: 0.5,
    borderColor: colours.white,
    borderRadius: 5,
    height: 20,
    color: colours.white,
    fontSize: 10,
    padding: 5
  },
  feed_image_container: {
    marginRight: 10
  },
  feed_image: {
    height: 160,
    marginBottom: 7,
    resizeMode: 'cover'
  },
  add_comment_container: {
    alignItems: 'center',
    backgroundColor: colours.lightPurple,
    paddingTop: 20,
    flex: 1
  },
  add_comment_icon: {
    width: 20,
    height: 15,
    resizeMode: 'contain',
    marginLeft: 50,
    marginTop: 3
  },
  add_comment_designation: {
    fontSize: 12,
    color: colours.white
  },
  add_comment_text_input: {
    height: 130,
    fontSize: 16,
    backgroundColor: colours.white,
    marginTop: 30,
    padding: 20
  },
  add_comment_button: {
    height: 30,
    width: 167,
    marginTop: 30,
    marginLeft: 30,
    borderWidth: 0.5,
    borderColor: colours.white,
    padding: 5,
    color: colours.white,
    fontSize: 15,
    borderRadius: 5,
    textAlign: 'center'
  },
  add_comment_error: {
    fontSize: 15,
    color: colours.white,
    fontFamily: 'Avenir',
    marginTop: 20,
    marginLeft: 5
  },
  add_comment_close: {
    flex: 0,
    justifyContent: 'flex-end',
    width: 20,
    height: 20,
    marginTop: 20,
    marginLeft: 280
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 18,
    borderTopWidth: 30,
    borderRightColor: 'transparent',
    left: 200,
    top: 24,
    borderTopColor: 'white',
    transform: [{
      rotate: '90deg',
    }]
  }
});

export default styles;
