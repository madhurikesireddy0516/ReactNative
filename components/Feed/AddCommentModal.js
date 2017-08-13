import React, { Component, PropTypes } from 'react';
import {
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
import AddComment from '../Feed/AddComment';

class AddCommentModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      userComment: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    const { modalReducer } = this.props;

    this.setState({
      isVisible: (modalReducer.modalName === 'AddComment') ? modalReducer.modalState : false
    });
  }

  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.isVisible}>
        <AddComment />
      </Modal>
    );
  }
}

AddCommentModal.propTypes = {
  modalReducer: PropTypes.object // eslint-disable-line react/forbid-prop-types
};


function mapStateToProps(state) {
  return {
    modalReducer: state.modalReducer
  };
}

export default connect(mapStateToProps)(AddCommentModal);
