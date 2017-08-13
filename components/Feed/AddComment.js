import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { postComment } from '../../actions/socialFeedsActions';
import { modalClose } from '../../actions/modalActions';

const notificationCloseIcon = require('../../assets/images/icon_close.png');

class AddComment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userComment: null
    };

    this.clear = this.clear.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onClose(route) {
    const { dispatch } = this.props;
    return dispatch(modalClose(route));
  }

  clear() {
    this.input.clear();
  }

  render() {
    const { dispatch, userEmail, selectedPostId } = this.props;
    const { height } = Dimensions.get('window');
    const isMultiline = true;
    const placeHolderText = 'Add your comment';

    return (
      <View style={[styles.add_comment_container, { height }]}>
        <View style={styles.notification_header}>
          <TouchableOpacity
            onPress={() => {
              this.onClose('AddComment');
            }}>
            <Image source={notificationCloseIcon} style={styles.add_comment_close} />
          </TouchableOpacity>
        </View>
        <TextInput
          ref={(input) => { this.input = input; }}
          multiline={isMultiline}
          placeholder={placeHolderText}
          maxLength={500}
          style={styles.add_comment_text_input}
          onChangeText={(text) => {
            this.setState({ userComment: text });
          }} />
        <TouchableOpacity
          onPress={() => {
            this.clear();
            dispatch(postComment(userEmail, this.state.userComment,
              parseInt(selectedPostId, 10)));
            this.setState({ userComment: null });
            this.onClose('AddComment');
          }} >
          <Text style={styles.add_comment_button}>Add comment</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

AddComment.propTypes = {
  dispatch: PropTypes.func,
  userEmail: PropTypes.string,
  selectedPostId: PropTypes.string
};

function mapStateToProps(state) {
  return {
    userEmail: state.loginReducer.userEmail,
    selectedPostId: state.socialFeedsReducer.selectedPostId
  };
}

export default connect(mapStateToProps)(AddComment);
