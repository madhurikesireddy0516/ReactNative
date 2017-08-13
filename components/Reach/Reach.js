import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  Animated,
  Easing
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { postQuestion, isImageVisible } from '../../actions/reachActions';

const contactPersonPic = require('../../assets/images/pic_rahul.png');

class Reach extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userQuestion: null
    };

    this.animatedValue = new Animated.Value(0);
    this.clear = this.clear.bind(this);
    this.keyboardDidShow = this.keyboardDidShow.bind(this);
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    if (this.props.isImageVisible) {
      this.animateImageOn();
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
  }

  keyboardDidShow() {
    const { dispatch } = this.props;
    if (this.props.isImageVisible) {
      dispatch(isImageVisible(false));
      this.animateImageOff();
    }
  }

  animateImageOff() {
    this.animatedValue.setValue(0);
    Animated.timing(
        this.animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear
        }
    ).start();
    this.setState({ isImageVisible: false });
  }

  animateImageOn() {
    this.animatedValue.setValue(1);
    Animated.timing(
      this.animatedValue, {
        toValue: 0,
        duration: 0,
        easing: Easing.linear
      }
    ).start();
  }

  clear() {
    this.input.clear();
  }

  render() {
    const { dispatch, userEmail, postSuccessful, isUserMessageVisible } = this.props;
    const { height } = Dimensions.get('window');
    const isMultiline = true;
    const placeHolderText = 'Ask me anything!';
    let messageToUser;
    messageToUser = postSuccessful ? 'Your message has been sent to Rahul' :
        'Error: Your message could not be sent';
    messageToUser = (postSuccessful === null || this.state.userQuestion !== null) ? '' : messageToUser;
    const questionText = postSuccessful === false ? this.state.userQuestion : null;

    const marginTop = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -238]
    });

    return (
      <View style={[styles.reach_container, { height }]}>
        <Animated.View
          style={{
            marginTop
          }} >
          <View>
            <Image source={contactPersonPic} style={styles.reach_pic} />
            <Text style={styles.reach_name}>Rahul Welde</Text>
            <Text style={styles.reach_designation}>Digital 2.0 Sponsor</Text>
          </View>
        </Animated.View>
        <TextInput
          ref={(input) => { this.input = input; }}
          multiline={isMultiline}
          placeholder={placeHolderText}
          value={questionText}
          maxLength={2000}
          style={styles.reach_text_input}
          onChangeText={(text) => {
            this.setState({ userQuestion: text });
          }} />
        <TouchableOpacity
          onPress={() => {
            this.clear();
            dispatch(postQuestion(userEmail, this.state.userQuestion));
            this.setState({ userQuestion: null });
          }} >
          <Text style={styles.send_button}>Send</Text>
        </TouchableOpacity>
        {
          isUserMessageVisible &&
          <Text style={styles.reach_error}>{messageToUser}</Text>
        }
      </View>
    );
  }
}

Reach.propTypes = {
  dispatch: PropTypes.func,
  userEmail: PropTypes.string,
  postSuccessful: PropTypes.bool,
  isImageVisible: PropTypes.bool,
  isUserMessageVisible: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    userEmail: state.loginReducer.userEmail,
    postSuccessful: state.reachReducer.postSuccessful,
    isImageVisible: state.reachReducer.isImageVisible,
    isUserMessageVisible: state.reachReducer.isUserMessageVisible
  };
}

export default connect(mapStateToProps)(Reach);
