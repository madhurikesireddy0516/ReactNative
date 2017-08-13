import {
  SOCIAL_FEEDS_LIST,
  COMMENTS_LIST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,
  SELECTED_FEED_ITEM,
  USER_LIKED_FEED_ITEM,
  CLEAR_USER_LIKE_LIST } from '../constants/actionTypes/socialFeeds';

const initialState = {
  socialfeeds: {},
  comments: {},
  selectedPostId: null,
  userLikeList: []
};

function socialFeedsReducer(state = initialState, action) {
  switch (action.type) {
    case SOCIAL_FEEDS_LIST : {
      return {
        ...state,
        socialfeeds: action.res
      };
    }
    case COMMENTS_LIST : {
      return {
        ...state,
        comments: action.res
      };
    }
    case POST_COMMENT_SUCCESS : {
      return {
        ...state
      };
    }
    case POST_COMMENT_ERROR : {
      return {
        ...state
      };
    }
    case SELECTED_FEED_ITEM : {
      return {
        ...state,
        selectedPostId: action.postId
      };
    }
    case USER_LIKED_FEED_ITEM : {
      const tempArray = state.userLikeList;
      if (tempArray.indexOf(action.postId) === -1) {
        tempArray.push(action.postId);
      }
      return {
        ...state,
        userLikeList: tempArray
      };
    }
    case CLEAR_USER_LIKE_LIST : {
      return {
        ...state,
        userLikeList: []
      };
    }
    default:
      return state;
  }
}

export default socialFeedsReducer;
