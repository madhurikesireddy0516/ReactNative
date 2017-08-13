import React, { Component, PropTypes } from 'react';
import {
  Modal,
  Text,
  ListView,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { BlurView } from 'react-native-blur';
import { modalClose } from '../../actions/modalActions';
import styles from './styles';
import notificationsData from '../../constants/data/notifications';

const notificationCloseIcon = require('../../assets/images/icon_close.png');

const backgroundBlur = require('../../assets/images/background_bg.png');

const tickIcon = require('../../assets/images/icon_tick.png');

class Notification extends Component {

  constructor(props) {
    super(props);

    this._ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    this.state = {
      isVisible: false,
      notifications: notificationsData,
      dataSource: this._ds
    };

    this.onClose = this.onClose.bind(this, 'Notification');
    this.renderRow = this.renderRow.bind(this);
    this.removeAlert = this.removeAlert.bind(this);
  }

  componentWillMount() {
    this.setState({
      dataSource: this._ds.cloneWithRowsAndSections(this.state.notifications)
    });
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    const { modalReducer } = this.props;

    this.setState({
      isVisible: (modalReducer.modalName === 'Notification') ? modalReducer.modalState : false
    });
  }

  onClose(route) {
    const { dispatch } = this.props;
    return dispatch(modalClose(route));
  }

  removeAlert(sectionID, rowID) {
    const newNotifications = this.state.notifications;
    newNotifications[sectionID].splice(rowID, 1);

    this.setState({
      notifications: newNotifications,
      dataSource: this._ds.cloneWithRowsAndSections(newNotifications)
    });
  }

  renderRow(notification, sectionID, rowID) {
    return (
      <View style={styles.notification_item}>
        <TouchableOpacity
          onPress={() => {
            this.removeAlert(sectionID, rowID);
          }}>
          <Image source={tickIcon} style={styles.notification_tick} />
        </TouchableOpacity>

        <View style={styles.notification_content}>
          <Text style={styles.notification_type}>{notification.type}</Text>
          <Text style={styles.notification_text}>{notification.text}</Text>
        </View>
      </View>
    );
  }

  renderSectionHeader(sectionData, date) { // eslint-disable-line class-methods-use-this
    return (
      <View>
        <Text style={styles.notification_section_header}>{date}</Text>
      </View>
    );
  }

  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.isVisible}>
        <View style={styles.container}>
          <BlurView blurType="dark" blurAmount={10}>
            <Image
              source={backgroundBlur}
              style={{ position: 'absolute', top: 0, left: 0, opacity: 0.5 }} />

            <ScrollView bounces={false} stickyHeaderIndices={[0]}>
              <View style={styles.notification_header}>
                <Text style={styles.notification_title}>Alerts</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.onClose('Notification');
                  }}>
                  <Image source={notificationCloseIcon} style={styles.notification_close} />
                </TouchableOpacity>
              </View>
            </ScrollView>

            <ListView
              key={this.notification}
              dataSource={this.state.dataSource}
              renderSectionHeader={this.renderSectionHeader}
              renderRow={this.renderRow} />
          </BlurView>
        </View>
      </Modal>
    );
  }
}

Notification.propTypes = {
  dispatch: PropTypes.func,
  modalReducer: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return {
    modalReducer: state.modalReducer
  };
}

export default connect(mapStateToProps)(Notification);
