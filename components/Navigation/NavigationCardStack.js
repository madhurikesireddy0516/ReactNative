import React, { Component, PropTypes } from 'react';
import {
  NavigationExperimental,
  ScrollView,
  View
} from 'react-native';
import LinearGradientIos from 'react-native-linear-gradient/index.ios';
import SplashAnimation from '../SplashAnimation/SplashAnimation';

import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Notification from '../Notification/Notification';
import AddCommentModal from '../Feed/AddCommentModal';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Feed from '../Feed/Feed';
import Team from '../Team/Team';
import UsefulStuff from '../UsefulStuff/UsefulStuff';
import TeamList from '../Team/TeamList';
import LocationList from '../Team/Locations';
import Reach from '../Reach/Reach';
import Landing from '../Landing/Landing';
import Feedback from '../Feedback/Feedback';

import colours from '../../styles/colours';
import Newbies from '../Newbies/Newbies';

const { CardStack: NavigationCardStack } = NavigationExperimental;

class Navigation extends Component {

  _renderScene = (props) => {
    const ComponentToRender = this.renderRoute(props.scene.route.key,
        props.scene.route.title);
    const componentProperties = this.renderProperties(props.scene.route.key,
        props.scene.route.title);

    return (
      <View>
        <LinearGradientIos colors={[colours.purple, colours.pink]}>
          <ScrollView
            bounces={false} stickyHeaderIndices={[0]}
            scrollEnabled={componentProperties.hasScroll}>
            {componentProperties.hasHeader &&
            <Header
              title={componentProperties.title}
              hasBackButton={componentProperties.hasBack}
              hasRefreshButton={componentProperties.hasRefreshButton} />}
            {ComponentToRender}
            {componentProperties.hasHeader && <Notification />}
          </ScrollView>
          {componentProperties.hasHeader && <Menu />}
          {componentProperties.hasAddComment && <AddCommentModal />}
        </LinearGradientIos>
      </View>
    );
  }

  renderProperties(key, dynTitle) { // eslint-disable-line class-methods-use-this
    const properties = {
      title: '',
      hasHeader: false,
      hasBack: false,
      hasAddComment: false,
      hasScroll: true
    };

    switch (key) {
      case 'Landing':
        properties.title = 'About';
        properties.hasHeader = true;
        properties.hasBack = false;
        properties.hasScroll = false;
        break;
      case 'Feed':
        properties.title = 'Latest';
        properties.hasHeader = true;
        properties.hasBack = false;
        properties.hasRefreshButton = true;
        properties.hasAddComment = true;
        break;
      case 'Team':
        properties.title = 'Team Members';
        properties.hasHeader = true;
        properties.hasBack = true;
        break;
      case 'TeamList':
        properties.title = 'Select Team';
        properties.hasHeader = true;
        properties.hasBack = true;
        break;
      case 'LocationList':
        properties.title = 'Select Location';
        properties.hasHeader = true;
        properties.hasBack = true;
        break;
      case 'Profile':
        properties.title = dynTitle;
        properties.hasHeader = true;
        properties.hasBack = true;
        break;
      case 'UsefulStuff':
        properties.title = 'Useful Stuff';
        properties.hasHeader = true;
        properties.hasBack = true;
        break;
      case 'Newbies':
        properties.title = 'Newbies';
        properties.hasHeader = true;
        properties.hasBack = true;
        break;
      case 'Reach':
        properties.title = 'Ask Rahul';
        properties.hasHeader = true;
        properties.hasBack = true;
        properties.hasScroll = false;
        break;
      case 'Feedback':
        properties.title = 'Feedback';
        properties.hasHeader = true;
        properties.hasBack = true;
        properties.hasScroll = false;
        break;
      default:
        properties.title = '';
        properties.hasHeader = false;
        properties.hasBack = false;
        properties.hasScroll = true;
        properties.hasAddComment = false;
    }

    return properties;
  }

  renderRoute(key, title) { // eslint-disable-line class-methods-use-this
    switch (key) {
      case 'Login':
        return <Login />;
      case 'Landing':
        return <Landing />;
      case 'Splash':
        return <SplashAnimation />;
      case 'Feed':
        return <Feed />;
      case 'Team':
        return <Team />;
      case 'TeamList':
        return <TeamList />;
      case 'LocationList':
        return <LocationList />;
      case 'Newbies':
        return <Newbies />;
      case 'Profile':
        return <Profile name={title} />;
      case 'UsefulStuff':
        return <UsefulStuff />;
      case 'Reach':
        return <Reach />;
      case 'Feedback':
        return <Feedback />;
      default:
        return '';
    }
  }

  render() {
    const { navState } = this.props;

    return (
      <NavigationCardStack
        navigationState={navState}
        renderScene={this._renderScene} />
    );
  }
}

Navigation.propTypes = {
  navState: PropTypes.any // eslint-disable-line react/forbid-prop-types
};

export default Navigation;
