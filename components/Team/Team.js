import React, { Component, PropTypes } from 'react';
import {
  Image,
  ListView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { push } from '../../actions/navActions';
import { profileSelected } from '../../actions/profileActions';
import { searchByTeamMemberName } from '../../actions/teamActions';
import styles from './styles';

class Team extends Component {
  constructor(props) {
    super(props);

    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

    this._ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionData,
      getRowData,
    });

    this.state = {
      teamSelected: 'All Teams',
      locationSelected: 'All Locations',
      dataSource: this._ds
    };

    this.goToPage = this.goToPage.bind(this);
    this.handleMemberSelect = this.handleMemberSelect.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    let currentText = this.props.teamSelected;
    const teamMemberList = this.props.teamMemberList;
    const { dataBlob, sectionIds, rowIds } = this.formatData(teamMemberList);
    if (currentText) {
      if (currentText.length > 16) {
        currentText = currentText.substring(0, 15);
        currentText = currentText.concat('...');
      }
    } else {
      currentText = 'All Teams';
    }

    this.setState({
      teamSelected: currentText,
      dataSource: this._ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
      isListEmpty: Object.keys(this.props.teamMemberList).length === 0,
      locationSelected: this.props.locationSelected || 'All Locations'
    });
  }

  clear() {
    this.input.clear();
  }

  formatData(data) { // eslint-disable-line class-methods-use-this
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    for (let sectionId = 0; sectionId < alphabet.length; sectionId += 1) {
      const currentChar = alphabet[sectionId];
      const users = data.filter(item =>
        item.field_first_name.toUpperCase().indexOf(currentChar) === 0);
      if (users.length > 0) {
        sectionIds.push(sectionId);
        dataBlob[sectionId] = { character: currentChar };
        rowIds.push([]);
        for (let i = 0; i < users.length; i += 1) {
          const rowId = `${sectionId}:${i}`;
          rowIds[rowIds.length - 1].push(rowId);
          dataBlob[rowId] = users[i];
        }
      }
    }
    return { dataBlob, sectionIds, rowIds };
  }

  goToPage(route) {
    const { dispatch } = this.props;
    this.clear();
    return dispatch(push(route));
  }

  handleMemberSelect(team, route) {
    const { dispatch } = this.props;
    this.goToPage(route);
    dispatch(profileSelected(team));
  }

  renderSectionHeader(props) { // eslint-disable-line class-methods-use-this
    return (
      <View>
        <Text style={styles.team_section_header}>{props.character}</Text>
      </View>
    );
  }

  renderRow(data) {
    const commaSeperator = (data.field_user_team === '') ? '' : ',';
    return (
      <TouchableOpacity
        onPress={() => {
          this.handleMemberSelect(data, { key: 'Profile' });
        }}>
        <View style={styles.team_row}>
          <View style={styles.team_icon_text_row}>
            <View>
              <Image
                source={{ uri: data.user_picture }}
                style={styles.team_profile_image} />
            </View>

            <View style={styles.team_content}>
              <View>
                <Text style={styles.team__text}>
                  {data.field_first_name} {data.field_last_name}
                </Text>
                <Text style={styles.team__location}>
                  {data.field_user_team}{commaSeperator} {data.field_user_location}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderSeparator(sectionId, rowId) { // eslint-disable-line class-methods-use-this
    return (
      <View key={sectionId + rowId} style={styles.separator} />
    );
  }

  render() {
    const { dispatch } = this.props;
    const { height } = Dimensions.get('window');
    return (
      <View style={[styles.team_container, { height }]}>
        <ScrollView
          style={styles.team_member_header}
          bounces={false}
          stickyHeaderIndices={[0]}>
          <View style={styles.team_header}>
            <View style={styles.team_header_content}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(searchByTeamMemberName(''));
                    this.goToPage({ key: 'TeamList' });
                  }}>
                  <Text style={styles.all_teams_button}>{this.state.teamSelected}</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(searchByTeamMemberName(''));
                    this.goToPage({ key: 'LocationList' });
                  }}>
                  <Text style={styles.all_locations_button}>{this.state.locationSelected}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TextInput
              onChangeText={(teamMemberName) => {
                dispatch(searchByTeamMemberName(teamMemberName));
              }}
              maxLength={100}
              ref={(input) => { this.input = input; }}
              style={styles.team_search}
              placeholder="Search"
              placeholderTextColor="white" />
          </View>
        </ScrollView>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          renderSectionHeader={this.renderSectionHeader} />
      </View>
    );
  }
}

Team.propTypes = {
  dispatch: PropTypes.func,
  teamSelected: PropTypes.string,
  locationSelected: PropTypes.string,
  teamMemberList: PropTypes.array // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return {
    teamSelected: state.teamReducer.teamSelected,
    locationSelected: state.teamReducer.locationSelected,
    teamMemberList: state.teamReducer.teamMemberList
  };
}

export default connect(mapStateToProps)(Team);
