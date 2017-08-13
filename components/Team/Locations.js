import React, { Component, PropTypes } from 'react';
import {
  ListView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { pop } from '../../actions/navActions';
import { locationSelected, searchByLocation } from '../../actions/teamActions';
import styles from './styles';

class LocationList extends Component {
  constructor(props) {
    super(props);
    this._ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    const locationList = this.props.locationList;
    this.state = {
      isVisible: false,
      data: locationList,
      dataSource: this._ds.cloneWithRowsAndSections(locationList)
    };

    this.handleLocation = this.handleLocation.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(searchByLocation(''));
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(newProps.locationList),
      isListEmpty: Object.keys(newProps.locationList).length === 0
    });
  }

  handleLocation(location, route) {
    const { dispatch } = this.props;
    dispatch(pop(route));
    dispatch(locationSelected(location.name));
  }

  renderSectionHeader(sectionData, alphabet) { // eslint-disable-line class-methods-use-this
    return (
      <Text style={styles.team_section_header}>{alphabet}</Text>
    );
  }

  renderSeparator(sectionId, rowId) { // eslint-disable-line class-methods-use-this
    return (
      <View key={sectionId + rowId} style={styles.separator} />
    );
  }

  renderRow(data) {
    return (
      <View style={styles.team_row}>
        <TouchableOpacity
          onPress={() => {
            this.handleLocation(data, { key: 'Team' });
          }}>
          <Text style={styles.row_name}>{data.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { dispatch } = this.props;
    const { height, width } = Dimensions.get('window');

    return (
      <View style={[styles.team, { width, height }]}>
        <ScrollView
          style={styles.team_list_header}
          bounces={false}
          stickyHeaderIndices={[0]}>
          <View style={styles.team_header}>
            <TextInput
              onChangeText={(location) => {
                dispatch(searchByLocation(location));
              }}
              maxLength={100}
              style={styles.team_search}
              placeholder="Search"
              placeholderTextColor="white" />
          </View>
        </ScrollView>
        <ListView
          dataSource={this.state.dataSource}
          renderSectionHeader={this.renderSectionHeader}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          stickyHeaderIndices={[1]} />
      </View>
    );
  }
}

LocationList.propTypes = {
  dispatch: PropTypes.func,
  locationList: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return {
    locationList: state.teamReducer.locationList
  };
}

export default connect(mapStateToProps)(LocationList);
