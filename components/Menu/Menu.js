import React, { Component, PropTypes } from 'react';
import {
  Text,
  Image,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradientIos from 'react-native-linear-gradient/index.ios';
import { push } from '../../actions/navActions';
import { userLogout } from '../../actions/loginActions';
import { isImageVisible, isUserMessageVisible } from '../../actions/reachActions';
import { getMyProfile, clearMyProfile } from '../../actions/profileActions';
import styles from './styles';
import colours from '../../styles/colours';

const menuIcon = require('../../assets/images/icon_menu.png');
const menuCloseIcon = require('../../assets/images/icon_close.png');

class Menu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menuOpenStatus: true,
      getMenuStatus: false
    };

    this.menuValue = new Animated.Value(0);
    this.animateOpen = this.animateOpen.bind(this);
    this.animateClose = this.animateClose.bind(this);
    this.menuClose = this.menuClose.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  animateOpen() {
    this.menuValue.setValue(0);
    this.setState({ getMenuStatus: true });
    Animated.timing(
      this.menuValue,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.inOut(Easing.quad)
      }
    ).start();
  }

  animateClose() {
    this.menuValue.setValue(0);
    this.setState({ menuOpenStatus: false });
    Animated.timing(
      this.menuValue,
      {
        toValue: 1,
        duration: 750,
        easing: Easing.inOut(Easing.quad)
      }
    ).start(() => {
      this.setState({ menuOpenStatus: true });
      this.setState({ getMenuStatus: false });
    });
  }

  menuClose() {
    this.menuValue.setValue(0);
    this.setState({ menuOpenStatus: false });
    this.setState({ getMenuStatus: false });
    Animated.timing(
      this.menuValue,
      {
        toValue: 0,
        duration: 0,
        easing: Easing.linear
      }
    ).start(() => {
      this.setState({ menuOpenStatus: true });
    });
  }

  goToPage(route) {
    this.menuClose();
    const { dispatch } = this.props;
    if (route.key === 'Profile') {
      const userIdno = this.props.loginReducer.userId;
      dispatch(clearMyProfile());
      dispatch(getMyProfile(userIdno));
    } else if (route.key === 'Login') {
      dispatch(userLogout());
    } else if (route.key === 'Reach') {
      dispatch(isImageVisible(true));
      dispatch(isUserMessageVisible(false));
    }
    return dispatch(push(route));
  }

  render() {
    const { height, width } = Dimensions.get('window');

    let animatedWidth = 0;
    let animatedHeight = 0;

    if (this.state.menuOpenStatus) {
      animatedWidth = this.menuValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width]
      });

      animatedHeight = this.menuValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, height]
      });
    } else {
      animatedWidth = this.menuValue.interpolate({
        inputRange: [0, 1],
        outputRange: [width, 0]
      });

      animatedHeight = this.menuValue.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0]
      });
    }

    const animatedRadius = this.menuValue.interpolate({
      inputRange: [0, 0.75, 1],
      outputRange: [500, width, 0]
    });

    const contentOpacity = this.menuValue.interpolate({
      inputRange: [0, 0.9, 1],
      outputRange: [0, 0, 1]
    });

    return (
      <View style={styles.menu}>
        <Animated.View
          style={[styles.menu_animation, {
            height: animatedHeight,
            width: animatedWidth,
            borderTopLeftRadius: animatedRadius
          }]}>
          <LinearGradientIos
            colors={[colours.lightOrange, colours.pink]}
            style={styles.menu_gradient}>
            <Animated.View style={{ flex: 1, opacity: contentOpacity }}>
              <View style={styles.menu_header}>
                <TouchableOpacity onPress={this.animateClose}>
                  <Image source={menuCloseIcon} style={styles.menu_close} />
                </TouchableOpacity>
              </View>

              <View style={styles.menu_content}>
                <TouchableOpacity
                  onPress={() => {
                    this.goToPage({ key: 'Newbies' });
                  }}>
                  <Text style={styles.menu_item}>Newbies</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.goToPage({ key: 'Feed' });
                  }}>
                  <Text style={styles.menu_item}>Latest</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.goToPage({ key: 'UsefulStuff' });
                  }}>
                  <Text style={styles.menu_item}>Useful Stuff</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.goToPage({ key: 'Reach' });
                  }}>
                  <Text style={styles.menu_item}>Ask Rahul</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.goToPage({ key: 'Team' });
                  }}>
                  <Text style={styles.menu_item}>Team</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.goToPage({ key: 'Profile' });
                  }}>
                  <Text style={styles.menu_item}>Me</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.goToPage({ key: 'Feedback' });
                  }}>
                  <Text style={styles.menu_item}>Feedback</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.goToPage({ key: 'Login' });
                  }}>
                  <Text style={styles.menu_item}>Logout</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </LinearGradientIos>
        </Animated.View>

        { this.state.getMenuStatus === false ?
        (<TouchableOpacity
          onPress={this.animateOpen}
          style={styles.menu_button}>
          <Image
            style={styles.menu_icon}
            source={menuIcon} />
        </TouchableOpacity>) : false
      }

      </View>
    );
  }
}

Menu.propTypes = {
  dispatch: PropTypes.func,
  loginReducer: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) { return { loginReducer: state.loginReducer }; }

export default connect(mapStateToProps)(Menu);
