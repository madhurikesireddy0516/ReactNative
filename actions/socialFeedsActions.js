import {
  SOCIAL_FEEDS_LIST,
  COMMENTS_LIST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,
  SELECTED_FEED_ITEM,
  USER_LIKED_FEED_ITEM,
  CLEAR_USER_LIKE_LIST } from '../constants/actionTypes/socialFeeds';

function socialFeedSuccess(res) {
  return { type: SOCIAL_FEEDS_LIST, res };
}

function commentsListSuccess(res) {
  return { type: COMMENTS_LIST, res };
}

function postCommentSuccess(res) {
  return { type: POST_COMMENT_SUCCESS, res };
}

function postCommentError() {
  return { type: POST_COMMENT_ERROR };
}

function userLikedFeedItem(postId) {
  return {
    type: USER_LIKED_FEED_ITEM,
    postId,
  };
}

function clearUserLikeList() {
  return { type: CLEAR_USER_LIKE_LIST };
}

export function selectedFeedItem(postId) {
  return {
    type: SELECTED_FEED_ITEM,
    postId
  };
}

function userLikeFeedItemStatusWithToken(userEmail, postId, token) {
  return (dispatch) => {
    const object = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic YXBwdXNlcjpRdVwrXz1tdGRGImpTbkxu',
        'X-CSRF-Token': token
      },
      body: JSON.stringify({
        type: [{ target_id: 'feeds_likes' }],
        field_user_login_name: [{ value: userEmail }],
        field_post_id: [{ value: postId }]
      })
    };

    fetch('http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/api/userlikedstatus?_format=json', object)
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.data.your_opinion === '1') {
          dispatch(userLikedFeedItem(postId));
        }
      })
      .then(() => {
      })
      .catch(() => {
      });
  };
}

function userLikeFeedItemStatus(userEmail, postId) {
  return (dispatch) => {
    fetch('http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/rest/session/token')
      .then(response => response.text())
      .then((responseToken) => {
        dispatch(userLikeFeedItemStatusWithToken(userEmail, postId, responseToken));
      })
      .catch(() => {
      });
  };
}

export function getSocialFeedsList(userEmail) {
  const timeStamp = new Date().getTime();
  return (dispatch) => {
    fetch(`http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/social_media_posts_app/${'?time='}${timeStamp}`)
    .then(response => response.json())
    .then((responseJson) => {
      // add the like status
      responseJson.map((item) => { // eslint-disable-line array-callback-return
        dispatch(userLikeFeedItemStatus(userEmail, item.nid));
      });

      dispatch(socialFeedSuccess(responseJson));
    })
    .catch(() => {
    });
  };
}

export function getLatestComments(id) {
  const timeStamp = new Date().getTime();
  return (dispatch) => {
    fetch(`http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/list_of_comments_for_the_post/${id}${'?time='}${timeStamp}`)
    .then(response => response.json())
    .then((responseJson) => {
      dispatch(commentsListSuccess(responseJson));
    })
    .catch(() => {
    });
  };
}

function postCommentWithToken(userEmail, comment, postId, token) {
  return (dispatch) => {
    const object = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/hal+json',
        Authorization: 'Basic YXBwdXNlcjpRdVwrXz1tdGRGImpTbkxu',
        'X-CSRF-Token': token
      },
      body: JSON.stringify({
        _links: {
          type: {
            href: 'http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/rest/type/comment/comment'
          },
          'http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/rest/relation/comment/comment/entity_id': [
            {
              href: `http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/node/${postId}`
            }
          ]
        },
        entity_id: [{ target_id: postId }],
        entity_type: [{ value: 'node' }],
        comment_type: [{ target_id: 'comment' }],
        field_name: [{ value: 'field_comments' }],
        name: [{ value: userEmail }],
        subject: [{ value: 'Question for Rahul' }],
        comment_body: [
          { value: comment }
        ]
      })
    };
    fetch('http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/entity/comment?_format=hal_json', object)
      .then((response) => {
        if (response.status === 201) {
          dispatch(postCommentSuccess());
        } else {
          dispatch(postCommentError());
        }
      })
      .then(() => {
      })
      .catch(() => {
      });
  };
}

export function postComment(userEmail, comment, postId) {
  return (dispatch) => {
    fetch('http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/rest/session/token')
      .then(response => response.text())
      .then((responseToken) => {
        dispatch(postCommentWithToken(userEmail, comment, postId, responseToken));
      })
      .catch(() => {
      });
  };
}

function likeFeedItemWithToken(userEmail, postId, token, callback) {
  return (dispatch) => {
    const object = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic YXBwdXNlcjpRdVwrXz1tdGRGImpTbkxu',
        'X-CSRF-Token': token
      },
      body: JSON.stringify({
        type: [{ target_id: 'feeds_likes' }],
        field_user_login_name: [{ value: userEmail }],
        field_post_id: [{value: postId }]
      })
    };

    fetch('http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/api/feedslikes?_format=json', object)
        .then((response) => {
          if (response.status === 200) {
            dispatch(userLikeFeedItemStatus(userEmail, postId, token));
            if (callback) {
              callback();
            }
          }
        })
        .then(() => {
        })
        .catch(() => {
        });
  };
}

export function likeFeedItem(userEmail, postId) {
  return (dispatch) => {
    fetch('http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/rest/session/token')
      .then(response => response.text())
      .then((responseToken) => {
        dispatch(likeFeedItemWithToken(userEmail, postId, responseToken, () => {
          dispatch(clearUserLikeList());
          dispatch(getSocialFeedsList(userEmail));
        }));
      })
      .catch(() => {
      });
  };
}
