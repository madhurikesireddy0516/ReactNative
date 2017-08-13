import React, { Component } from 'react';
import htmlToElement from 'react-native-htmlview/htmlToElement';
import {
  Linking,
  Text
} from 'react-native';

import styles from './styles';

class HTMLView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      element: null
    };

    this.onLinkPress = Linking.openURL;
  }

  componentDidMount() {
    this.mounted = true;
    this.startHtmlRender(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.startHtmlRender(nextProps.value);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  startHtmlRender(value) {
    if (!value) return this.setState({ element: null });

    const opts = {
      linkHandler: this.props.onLinkPress,
      styles: Object.assign({}, styles, this.props.stylesheet),
      customRenderer: this.props.renderNode,
    };

    htmlToElement(value, opts, (err, element) => {
      if (err) return this.props.onError(err);

      if (this.mounted) return this.setState({ element });
      return true;
    });
    return true;
  }

  render() {
    if (this.state.element) {
      return <Text>{this.state.element}</Text>;
    }
    return <Text />;
  }
}

HTMLView.propTypes = {
  value: React.PropTypes.string,
  stylesheet: React.PropTypes.string,
  onLinkPress: React.PropTypes.func,
  onError: React.PropTypes.func,
  renderNode: React.PropTypes.func,
};

export default HTMLView;
