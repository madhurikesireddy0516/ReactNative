import { POST_FEEDBACK_SUCCESS, POST_FEEDBACK_ERROR } from '../constants/actionTypes/feedback';

function postFeedbackSuccess() {
  return { type: POST_FEEDBACK_SUCCESS };
}

function postFeedbackError() {
  return { type: POST_FEEDBACK_ERROR };
}

function postFeedbackWithToken(userEmail, feedback, token) {
  return (dispatch) => {
    const object = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/hal+json',
        'X-CSRF-Token': token
      },
      body: JSON.stringify({
        _links: {
          type: {
            href: 'http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/rest/type/comment/comment'
          },
          'http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/rest/relation/comment/comment/entity_id': [
            {
              href: 'http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/node/81'
            }
          ]
        },
        entity_id: [{ target_id: 81 }],
        entity_type: [{ value: 'node' }],
        comment_type: [{ target_id: 'comment' }],
        field_name: [{ value: 'field_app_user_feed_back' }],
        name: [{ value: userEmail }],
        subject: [{ value: 'feedback' }],
        comment_body: [
          { value: feedback }
        ]
      })
    };
    fetch('http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/entity/comment?_format=hal_json', object)
        .then((response) => {
          if (response.status === 201) {
            dispatch(postFeedbackSuccess());
          } else {
            dispatch(postFeedbackError());
          }
        })
        .then(() => {
        })
        .catch(() => {
          dispatch(postFeedbackError());
        });
  };
}

export function postFeedback(userEmail, feedback) { // eslint-disable-line
  return (dispatch) => {
    fetch('http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/rest/session/token')
      .then(response => response.text())
      .then((responseToken) => {
        dispatch(postFeedbackWithToken(userEmail, feedback, responseToken));
      })
      .catch(() => {
        dispatch(postFeedbackError());
      });
  };
}
