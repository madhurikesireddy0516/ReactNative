import React, { Component, PropTypes } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import styles from './styles';

const emailIcon = require('../../assets/images/icon_email.png');
const phoneIcon = require('../../assets/images/icon_phone.png');

class Profile extends Component {
  constructor(props) {
    super(props);

    this.emailClick = this.emailClick.bind(this);
    this.phoneClick = this.phoneClick.bind(this);
  }

  emailClick() {
    Communications.email([this.props.profileReducer.team.field_email], null, null, null, null);
  }

  phoneClick() {
    Communications.phonecall(this.props.profileReducer.team.field_user_telephone, true);
  }

  render() {
    const { height } = Dimensions.get('window');
    const team = this.props.profileReducer.team;

    if (!team) return (<View style={[styles.profile_container, { height }]} />);
    return (
      <View style={[styles.profile_container, { height }]}>
        <View style={styles.profile_header_container}>
          <Image source={{ uri: team.user_picture }} style={styles.profile_pic} />
          <Text style={styles.profile_name}>{team.field_first_name} {team.field_last_name}</Text>
        </View>

        <View style={styles.profile_details_container}>
          <Text style={styles.profile_details_heading}>Team</Text>
          <Text style={styles.profile_details_text}>{team.field_user_team}</Text>
          <Text style={styles.profile_details_heading}>Location</Text>
          <Text style={styles.profile_details_text}>{team.field_user_location}</Text>
        </View>

        <View style={styles.profile_contact_container}>
          <View style={styles.profile_contact_item}>
            <Text style={styles.contact_item_text}>{team.field_email}</Text>
            <TouchableOpacity onPress={this.emailClick}>
              <Image source={emailIcon} style={styles.contact_item_icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.profile_contact_item}>
            <Text style={styles.contact_item_text}>{team.field_user_telephone}</Text>
            <TouchableOpacity onPress={this.phoneClick}>
              <Image source={phoneIcon} style={styles.contact_item_icon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profile_interests_container}>
          <View style={styles.interests_content}>
            <Text style={styles.interests_item}>Birthday</Text>
            <Text style={styles.interests_item_name}>{team.field_user_birthday}</Text>
          </View>

          <View style={styles.interests_content}>
            <Text style={styles.interests_item}>Favourite food</Text>
            <Text style={styles.interests_item_name}>{team.field_user_food}</Text>
          </View>

          <View style={styles.interests_content}>
            <Text style={styles.interests_item}>Favourite drink</Text>
            <Text style={styles.interests_item_name}>{team.field_user_drink}</Text>
          </View>

          <View style={styles.interests_content}>
            <Text style={styles.interests_item}>Favourite city</Text>
            <Text style={styles.interests_item_name}>{team.field_user_city}</Text>
          </View>

          <View style={styles.interests_content}>
            <Text style={styles.interests_item}>Favourite gadget</Text>
            <Text style={styles.interests_item_name}>{team.field_user_gadget}</Text>
          </View>

          <View style={styles.interests_content}>
            <Text style={styles.interests_item}>Favourite hobby</Text>
            <Text style={styles.interests_item_name}>{team.field_user_hobby}</Text>
          </View>
        </View>
      </View>
    );
  }
}

Profile.propTypes = {
  profileReducer: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return {
    profileReducer: state.profileReducer
  };
}

export default connect(mapStateToProps)(Profile);
