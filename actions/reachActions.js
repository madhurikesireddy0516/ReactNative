import {
  POST_QUESTION_SUCCESS,
  POST_QUESTION_ERROR,
  DISPLAY_USER_MESSAGE,
  DISPLAY_IMAGE } from '../constants/actionTypes/reach';

function postQuestionSuccess() {
  return { type: POST_QUESTION_SUCCESS };
}

function postQuestionError() {
  return { type: POST_QUESTION_ERROR };
}

export function isImageVisible(visibility) {
  return {
    type: DISPLAY_IMAGE,
    visibility
  };
}

export function isUserMessageVisible(visibility) {
  return {
    type: DISPLAY_USER_MESSAGE,
    visibility
  };
}

function postQuestionWithToken(userEmail, question, token) {
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
              href: 'http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/node/36'
            }
          ]
        },
        entity_id: [{ target_id: 36 }],
        entity_type: [{ value: 'node' }],
        comment_type: [{ target_id: 'comment' }],
        field_name: [{ value: 'field_usuer_questions' }],
        name: [{ value: userEmail }],
        subject: [{ value: 'Question for Rahul' }],
        comment_body: [
          { value: question }
        ]
      })
    };
    fetch('http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/entity/comment?_format=hal_json', object)
      .then((response) => {
        if (response.status === 201) {
          dispatch(postQuestionSuccess());
        } else {
          dispatch(postQuestionError());
        }
      })
      .then(() => {
      })
      .catch(() => {
        dispatch(postQuestionError());
      });
  };
}

export function postQuestion(userEmail, question) { // eslint-disable-line
  return (dispatch) => {
    fetch('http://drupal825feedsx69s5damhk.devcloud.acquia-sites.com/rest/session/token')
      .then(response => response.text())
      .then((responseToken) => {
        dispatch(postQuestionWithToken(userEmail, question, responseToken));
      })
      .catch(() => {
        dispatch(postQuestionError());
      });
  };
}
