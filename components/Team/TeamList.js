import React, { Component, PropTypes } from 'react';
import {
  ListView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { pop } from '../../actions/navActions';
import { teamSelected, searchByTeamName } from '../../actions/teamActions';
import styles from './styles';

class TeamList extends Component {
  constructor(props) {
    super(props);
    this._ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    const teamList = this.props.teamList;
    this.state = {
      ds: this._ds,
      dataSource: this._ds.cloneWithRowsAndSections(teamList),
      isListEmpty: Object.keys(teamList).length === 0
    };

    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(searchByTeamName(''));
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(newProps.teamList),
      isListEmpty: Object.keys(newProps.teamList).length === 0
    });
  }

  renderSectionHeader(sectionData, alphabet) { // eslint-disable-line class-methods-use-this
    return (
      <Text style={styles.team_section_header}>{alphabet}</Text>
    );
  }

  renderRow(data) {
    const { dispatch } = this.props;
    return (
      <View style={styles.team_row}>
        <TouchableOpacity
          onPress={() => {
            // reset filter
            dispatch(searchByTeamName(''));
            dispatch(pop({ key: 'Team' }));
            dispatch(teamSelected(data.name));
          }} >
          <Text style={styles.row_name}>{data.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderSeparator(sectionId, rowId) { // eslint-disable-line class-methods-use-this
    return (
      <View key={sectionId + rowId} style={styles.separator} />
    );
  }

  render() {
    const { dispatch } = this.props;
    const { height, width } = Dimensions.get('window');

    return (
      <View style={[styles.team, { width, height }]}>
        <ScrollView style={styles.team_list_header} bounces={false} stickyHeaderIndices={[0]}>
          <View style={styles.team_header}>
            <TextInput
              onChangeText={(teamName) => {
                dispatch(searchByTeamName(teamName));
              }}
              maxLength={100}
              style={styles.team_search}
              placeholder="Search"
              placeholderTextColor="white" />
          </View>
        </ScrollView>
        {
          this.state.dataSource && !this.state.isListEmpty &&
          <ListView
            dataSource={this.state.dataSource}
            renderSectionHeader={this.renderSectionHeader}
            renderSeparator={this.renderSeparator}
            renderRow={this.renderRow}
            stickyHeaderIndices={[1]} />
        }
      </View>
    );
  }
}

TeamList.propTypes = {
  dispatch: PropTypes.func,
  teamList: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return {
    teamList: state.teamReducer.teamList
  };
}

export default connect(mapStateToProps)(TeamList);
