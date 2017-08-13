import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { postFeedback } from '../../actions/feedbackActions';

class Feedback extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userFeedback: null
    };

    this.clear = this.clear.bind(this);
  }

  clear() {
    this.input.clear();
  }

  render() {
    const { dispatch, postSuccessful, userEmail } = this.props;
    const { height } = Dimensions.get('window');
    const isMultiline = true;
    const placeHolderText = 'Please send us your feedback';
    let messageToUser;
    messageToUser = postSuccessful ? 'Your feedback has been sent' :
        'Error: Your feedback could not be sent';
    messageToUser = (postSuccessful === null || this.state.userFeedback !== null) ? '' : messageToUser;
    const questionText = postSuccessful === false ? this.state.userFeedback : null;

    return (
      <View style={[styles.feedback_container, { height }]}>
        <TextInput
          ref={(input) => { this.input = input; }}
          multiline={isMultiline}
          placeholder={placeHolderText}
          value={questionText}
          maxLength={2000}
          style={styles.feedback_text_input}
          onChangeText={(text) => {
            this.setState({ userFeedback: text });
          }} />
        <TouchableOpacity
          onPress={() => {
            this.clear();
            dispatch(postFeedback(userEmail, this.state.userFeedback));
            this.setState({ userFeedback: null });
          }} >
          <Text style={styles.send_button}>Send</Text>
        </TouchableOpacity>
        <Text style={styles.feedback_error}>{messageToUser}</Text>
      </View>
    );
  }
}

Feedback.propTypes = {
  dispatch: PropTypes.func,
  userEmail: PropTypes.string,
  postSuccessful: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    userEmail: state.loginReducer.userEmail,
    postSuccessful: state.feedbackReducer.postSuccessful
  };
}

export default connect(mapStateToProps)(Feedback);
