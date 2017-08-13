import React, { Component, PropTypes } from 'react';
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { push } from '../../actions/navActions';
import { getSocialFeedsList } from '../../actions/socialFeedsActions';
import styles from './styles';

const postImage = require('../../assets/images/logo_login.png');

const text = 'Welcome! Thank you for being part of the pilot group. We want ' +
'your help in shaping our Digital 2.0 app by having a play with it over the ' +
'next week and providing us with valuable feedback. This is a beta version ' +
'and you are welcome to suggest new features and ideas via our feedback ' +
'survey on the app.\nThanks, Rahul & team';

class Landing extends Component {

  constructor(props) {
    super(props);

    this.goToPage = this.goToPage.bind(this);
  }

  goToPage() {
    const { dispatch, userEmail } = this.props;
    // we need to call userLikeFeedItemStatus() once we have the userEmail,
    // which is not available during splashAnimation.
    dispatch(getSocialFeedsList(userEmail));
    dispatch(push({ key: 'Feed' }));
  }

  render() {
    const { height, width } = Dimensions.get('window');

    return (
      <View style={[styles.landing, { width, height }]}>
        <Image source={postImage} style={styles.landingImage} />
        <Text style={styles.landingText}>{text}</Text>
        <TouchableOpacity onPress={this.goToPage}>
          <Text style={styles.continueButton}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Landing.propTypes = {
  dispatch: PropTypes.func,
  userEmail: PropTypes.string
};

function mapStateToProps(state) {
  return {
    userEmail: state.loginReducer.userEmail
  };
}

export default connect(mapStateToProps)(Landing);
