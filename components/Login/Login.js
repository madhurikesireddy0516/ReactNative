import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { authUser } from '../../actions/loginActions';

const iconLogo = require('../../assets/images/logo_login.png');

const hidden = false;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: null,
      password: null
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.clear = this.clear.bind(this);
  }

  clear() {
    this.password.clear();
  }

  handleLogin() {
    const { dispatch } = this.props;
    dispatch(authUser(this.state.userEmail, this.state.password, () => {
      this.clear();
      this.setState({ password: null });
    }));
  }

  render() {
    const { userAuth } = this.props;
    const { height } = Dimensions.get('window');
    const isUsernameFocus = true;
    const isSecureTextEntry = true;
    const messageToUser = userAuth === false ? 'Username or password incorrect' : '';

    return (
      <View style={[styles.login, { height }]}>
        <StatusBar hidden={hidden} />
        <Text style={styles.title}>
           Login
        </Text>
        <Image
          source={iconLogo}
          style={styles.logo} />
        <TextInput
          placeholder="Email address"
          returnKeyType={'next'}
          autoCapitalize="none"
          autoFocus={isUsernameFocus}
          maxLength={250}
          style={[styles.text_input, { height: height / 12 }]}
          onChangeText={(text) => {
            this.setState({ userEmail: text.trim() });
          }}
          onSubmitEditing={() => {
            this.password.focus();
          }} />
        <TextInput
          placeholder="Password"
          ref={(password) => { this.password = password; }}
          secureTextEntry={isSecureTextEntry}
          maxLength={250}
          style={[styles.text_input, { height: height / 12 }]}
          onSubmitEditing={this.handleLogin}
          onChangeText={(text) => {
            this.setState({ password: text });
          }} />
        <Text style={styles.login_error}>{messageToUser}</Text>
        <TouchableOpacity onPress={() => this.handleLogin()}>
          {
            userAuth !== false &&
            <Text style={styles.login_button}>Come on in</Text>
          }
          {
            userAuth === false &&
            <Text style={styles.login_button_error}>Come on in</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgot_password}>Forgot password</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  userAuth: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    userAuth: state.loginReducer.userAuth
  };
}

export default connect(mapStateToProps)(Login);
