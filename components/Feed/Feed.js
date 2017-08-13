import React, { Component, PropTypes } from 'react';
import {
  AlertIOS,
  Animated,
  Dimensions,
  Easing,
  Image,
  Linking,
  ListView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { connect } from 'react-redux';
import styles from './styles';
import { getLatestComments, selectedFeedItem, likeFeedItem } from '../../actions/socialFeedsActions';
import HTMLView from './HtmlRender';
import { modalOpen } from '../../actions/modalActions';

const twitterIcon = require('../../assets/images/icon_twitter.png');
const instagramIcon = require('../../assets/images/icon_instagram.png');
const facebookIcon = require('../../assets/images/icon_facebook.png');
const unileverIcon = require('../../assets/images/icon_digital_purple.png');
const commentIconWhite = require('../../assets/images/icon-speech-bubble-off.png');
const commentIconPurple = require('../../assets/images/icon-speech-bubble-purple-off.png');
const addCommentIconWhite = require('../../assets/images/icon_comment_add.png');
const addCommentIconPurple = require('../../assets/images/icon_comment_add_purple.png');
const likeIcon = require('../../assets/images/icon_like.png');
const likeIconFilled = require('../../assets/images/icon_like_filled.png');
const likeIconPurple = require('../../assets/images/icon_like_purple.png');
const likeIconPurpleFilled = require('../../assets/images/icon_like_purple_filled.png');

class Feed extends Component {
  constructor(props) {
    super(props);
    const getFeeds = this.props.socialFeedsReducer.socialfeeds;
    const userLikeList = this.props.socialFeedsReducer.userLikeList;
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.visibility = false;
    this.comments_type = '';

    this.state = {
      dataSource: ds.cloneWithRows(getFeeds),
      dataSourceComments: ds.cloneWithRows([]),
      dataSourceNewComments: ds.cloneWithRows([{}]),
      text: 'comment here..',
      userLikeList
    };

    this.animationValue = new Animated.Value(0);
    this.animateRow = this.animateRow.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this._renderRow = this._renderRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.setState({ userLikeList: this.props.socialFeedsReducer.userLikeList });

    const ds1 = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    const getFeeds = this.props.socialFeedsReducer.socialfeeds;
    const comments = this.props.socialFeedsReducer.comments;

    this.setState({
      dataSourceComments: ds1.cloneWithRows(comments),
      dataSource: ds1.cloneWithRows(getFeeds)
    });
  }

  onLayout = (event, rowData) => {
    if (rowData.animationValue) {
      rowData.animationValue._value = event.nativeEvent.layout.height; // eslint-disable-line
    }
  };

  getComments = (ID, type) => {
    const { dispatch } = this.props;
    this.comments_type = type;
    return dispatch(getLatestComments(ID));
  };

  openModal(route) {
    const { dispatch } = this.props;
    return dispatch(modalOpen(route));
  }

  handleClick = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        AlertIOS.alert(`Don't know how to open URI:${url}`);
      }
    });
  };


  animateRow(rowId, rowData) {
    const value = this.state.dataSource._dataBlob;
    for (let i = 0; i < this.state.dataSource._dataBlob.s1.length; i += 1) {
      if (i !== parseInt(rowId, 10) && value.s1[i].animationValue &&
          value.s1[i].animationValue._value !== 0) {
        this.state.dataSource._dataBlob.s1[i].animationValue._value = 0;
        this.visibility = false;
      }
    }
    // todo: create a better solution to the animation issues after refresh
    if (this.visibility && !rowData.animationValue) {
      rowData.animationValue = new Animated.Value(0); // eslint-disable-line no-param-reassign
    }
    const startValue = (this.visibility) ? rowData.animationValue._value : undefined;
    const endValue = (this.visibility) ? 0 : undefined;
    rowData.animationValue = new Animated.Value(0); // eslint-disable-line no-param-reassign
    this.getComments(rowData.nid, rowData.field_type_of_post);
    const that = this;
    rowData.animationValue.setValue(startValue);
    Animated.timing(rowData.animationValue, {
      toValue: endValue,
      duration: 200,
      easing: Easing.linear
    }).start(() => {
      that.visibility = !that.visibility;
    });
  }

  displayIcon(rowData) { // eslint-disable-line class-methods-use-this
    let icon;
    if (rowData.field_type_of_post === 'Facebook') {
      icon = facebookIcon;
    } else if (rowData.field_type_of_post === 'Twitter') {
      icon = twitterIcon;
    } else if (rowData.field_type_of_post === 'Instagram') {
      icon = instagramIcon;
    } else if (rowData.field_type_of_post === 'Programme Update') {
      icon = unileverIcon;
    }
    return icon;
  }

  _renderRow(rowData, secId, rowId) {
    const { dispatch, userEmail } = this.props;
    const userLikedPost = this.state.userLikeList.indexOf(rowData.nid) !== -1;
    const { width } = Dimensions.get('window');
    const animationHeight = rowData.animationValue ? rowData.animationValue : 0;
    const feedText = (rowData.field_type_of_post === 'Programme Update') ? (rowData.body
         .replace(new RegExp('<p>', 'g'), '<span>')
         .replace(new RegExp('</p>', 'g'), '</span>')
         .replace(new RegExp('<sup>', 'g'), '<span>')
         .replace(new RegExp('</sup>', 'g'), '</span>')) : (rowData.body
         .replace(new RegExp('<p>', 'g'), '<label>')
         .replace(new RegExp('</p>', 'g'), '</label>')
         .replace(new RegExp('<sup>', 'g'), '<label>')
         .replace(new RegExp('</sup>', 'g'), '</label>'));

    return (
      <View style={(rowData.field_type_of_post) === 'Programme Update' ? styles.feed__row_unilever : styles.feed__row}>
        <View style={styles.feed_icon_text_row}>
          <Image source={this.displayIcon(rowData)} style={styles.feed_icon} />
          <View style={styles.feed_content}>
            { rowData.field_feed_image !== '' ?
              <View>
                <View style={styles.feed_image_container}>
                  <Image style={[styles.feed_image]} source={{ uri: rowData.field_feed_image }} />
                </View>
                <HTMLView
                  style={{ color: 'white' }}
                  value={feedText}
                  onLinkPress={(url) => { this.handleClick(url); }} />
              </View> :
              <HTMLView
                value={feedText}
                onLinkPress={(url) => { this.handleClick(url); }} />
            }

            <TouchableOpacity
              onPress={() => {
                this.animateRow(rowId, rowData);
              }}>
              <View style={styles.timestamp_container}>
                <Text style={(rowData.field_type_of_post) === 'Programme Update' ? styles.timestamp_unilever : styles.timestamp}>{rowData.created}</Text>
                <View style={{ flexDirection: 'row', marginRight: 50 }}>
                  <Text style={(rowData.field_type_of_post) === 'Programme Update' ? styles.comment_count_unilever : styles.comment_count}>{rowData.comment_count}</Text>
                  <Image style={styles.comment_icon} source={(rowData.field_type_of_post) === 'Programme Update' ? commentIconPurple : commentIconWhite} />
                  <TouchableOpacity
                    onPress={() => {
                      // The result of this action is not stored. It is essentially a fire and
                      // forget action. If the action is successful another call is made to get
                      // the Like status of the post for the current user.
                      dispatch(likeFeedItem(userEmail, rowData.nid));
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={(rowData.field_type_of_post) === 'Programme Update' ? styles.like_count_unilever : styles.like_count}>{rowData.field_feed_likes}</Text>
                      {
                        userLikedPost &&
                        <Image style={styles.like_icon} source={(rowData.field_type_of_post) === 'Programme Update' ? likeIconPurpleFilled : likeIconFilled} />
                      }
                      {
                        !userLikedPost &&
                        <Image style={styles.like_icon} source={(rowData.field_type_of_post) === 'Programme Update' ? likeIconPurple : likeIcon} />
                      }
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(selectedFeedItem(rowData.nid));
                      this.openModal('AddComment');
                    }}>
                    <Image style={styles.add_comment_icon} source={(rowData.field_type_of_post) === 'Programme Update' ? addCommentIconPurple : addCommentIconWhite} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>

            <Animated.View
              style={
                [styles.comments_container,
                  { height: animationHeight,
                    width
                  }
                ]
            } onLayout={e => this.onLayout(e, rowData)}>
              <ListView
                dataSource={this.state.dataSourceComments}
                enableEmptySections
                renderRow={commentsData =>
                  <View style={styles.comment_box}>
                    <Text style={(this.comments_type) === 'Programme Update' ? styles.comment_text_unilever : styles.comment_text}>{commentsData.comment_body}</Text>
                    <View style={styles.child_container}>
                      <Text style={(this.comments_type === 'Programme Update' ? styles.comment_timestamp_unilever : styles.comment_timestamp)}>{commentsData.created}</Text>
                      <Text style={styles.author}>{commentsData.name}</Text>
                    </View>
                  </View>
              } />
            </Animated.View>
            <View style={(rowData.field_type_of_post) === 'Programme Update' ? styles.triangle : ''} />
          </View>
        </View>
      </View>
    );
  }

  render() {
    const hidden = false;

    return (
      <View style={styles.feed}>
        <StatusBar hidden={hidden} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow} />
      </View>
    );
  }
}

Feed.propTypes = {
  socialFeedsReducer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  dispatch: PropTypes.func,
  userEmail: PropTypes.string
};

function mapStateToProps(state) {
  return {
    socialFeedsReducer: state.socialFeedsReducer,
    userLikeList: state.socialFeedsReducer.userLikeList,
    userEmail: state.loginReducer.userEmail
  };
}

export default connect(mapStateToProps)(Feed);
