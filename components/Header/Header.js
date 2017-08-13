import React, { Component, PropTypes } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { BlurView } from 'react-native-blur';
import { connect } from 'react-redux';
import { pop } from '../../actions/navActions';
import { modalOpen } from '../../actions/modalActions';
import { getSocialFeedsList } from '../../actions/socialFeedsActions';
import styles from './styles';

const notificationIcon = require('../../assets/images/icon_alerts.png');
const iconBack = require('../../assets/images/back_btn.png');
const iconRefresh = require('../../assets/images/icon_refresh.png');

class Header extends Component {
  constructor(props) {
    super(props);
    this.goToPage = this.goToPage.bind(this);
    this.refreshFeed = this.refreshFeed.bind(this);
    this.openModal = this.openModal.bind(this, 'Notification');
  }

  openModal(route) {
    const { dispatch } = this.props;
    return dispatch(modalOpen(route));
  }

  goToPage(route) {
    const { dispatch } = this.props;
    return dispatch(pop(route));
  }

  refreshFeed() {
    const { dispatch, userEmail } = this.props;
    return dispatch(getSocialFeedsList(userEmail));
  }

  render() {
    const { title, hasBackButton, hasRefreshButton } = this.props;
    const visible = hasBackButton ? iconBack : null;

    return (
      <BlurView blurType="dark" blurAmount={10}>
        <View style={styles.header}>
          {
            hasBackButton &&
            (<TouchableOpacity
              onPress={this.goToPage}
              style={styles.icon_back_container}>
              <Image source={visible} style={styles.icon_back} />
            </TouchableOpacity>)
          }
          {
            hasRefreshButton &&
            (<TouchableOpacity
              onPress={this.refreshFeed}
              style={styles.icon_back_container}>
              <Image source={iconRefresh} style={styles.icon_back} />
            </TouchableOpacity>)
          }
          {
            !hasBackButton &&
            <View style={styles.icon_back_container} />
          }

          <Text style={styles.header_title}>{title}</Text>

          <TouchableOpacity
            onPress={this.openModal}
            style={styles.icon_notification_container}>
            <Image source={notificationIcon} style={styles.icon_notification} />
          </TouchableOpacity>
        </View>
      </BlurView>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  dispatch: PropTypes.func,
  hasBackButton: PropTypes.bool,
  hasRefreshButton: PropTypes.bool,
  userEmail: PropTypes.string
};


function mapStateToProps(state) {
  return {
    userEmail: state.loginReducer.userEmail
  };
}

export default connect(mapStateToProps)(Header);
