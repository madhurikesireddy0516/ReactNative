import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StatusBar,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { push } from '../../actions/navActions';
import styles from './styles';
import { getSocialFeedsList } from '../../actions/socialFeedsActions';
import { getTeamMemberList, getTeamList, getLocationList } from '../../actions/teamActions';
import teamList from '../../constants/data/teams';
import locationList from '../../constants/data/locations';

const commsImage = require('../../assets/images/splashanimation.png');
const digitalLogo = require('../../assets/images/logo.png');

class SplashAnimation extends Component {

  constructor(props) {
    super(props);

    this.imageScaleValue = new Animated.Value(0);
    this.logoScaleValue = new Animated.Value(0);
    this.logoOpacityValue = new Animated.Value(0);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getSocialFeedsList());
    dispatch(getTeamMemberList());
    dispatch(getTeamList(teamList));
    dispatch(getLocationList(locationList));
  }

  componentDidMount() {
    this.imageScaleValue.setValue(0.5);
    this.logoScaleValue.setValue(0.4);
    this.logoOpacityValue.setValue(0);

    Animated.parallel([
      Animated.timing(this.imageScaleValue, {
        toValue: 7.5,
        duration: 4000,
        easing: Easing.cubic
      }),
      Animated.timing(this.logoScaleValue, {
        toValue: 0.8,
        duration: 2000,
        easing: Easing.linear,
        delay: 2000
      }),
      Animated.timing(this.logoOpacityValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        delay: 2000
      })
    ]).start(() => {
      const { dispatch } = this.props;
      dispatch(push({ key: 'Login' }));
    });
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const hidden = true;
    return (
      <View style={styles.animation_container}>
        <StatusBar
          hidden={hidden}
          barStyle="light-content" />
        <View style={[styles.animation_image_container, { width, height }]}>
          <Animated.Image
            source={commsImage}
            style={{
              width,
              height,
              transform: [{ scale: this.imageScaleValue }]
            }} />
        </View>
        <View style={[styles.animation_logo_container, { width, height }]}>
          <Animated.Image
            source={digitalLogo}
            style={{
              opacity: this.logoOpacityValue,
              transform: [{ scale: this.logoScaleValue }]
            }} />
        </View>
      </View>
    );
  }
}

SplashAnimation.propTypes = {
  dispatch: PropTypes.func
};

function mapStateToProps() { return {}; }

export default connect(mapStateToProps)(SplashAnimation);
