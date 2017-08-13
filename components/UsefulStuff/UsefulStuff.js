import React, { Component } from 'react';
import {
  Image,
  Linking,
  ListView,
  Text,
  View,
  SegmentedControlIOS,
  Dimensions,
  WebView,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import colours from '../../styles/colours';

const chevronIcon = require('../../assets/images/icon_chevron.png');

class UsefulStuff extends Component {
  constructor(props) {
    super(props);

    this._ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.channels = ['Team chatter', 'Slack', 'Jira'];
    this.resources = ['Coming soon'];

    this.state = {
      values: ['Calendar', 'KPI', 'Links'],
      value: 'Calendar',
      selectedIndex: 0,
      channelsList: this._ds.cloneWithRows(this.channels),
      resourcesList: this._ds.cloneWithRows(this.resources)
    };

    this.onChange = this.onChange.bind(this);
    this._onValueChange = this._onValueChange.bind(this);
    this._renderRow = this._renderRow.bind(this);
  }

  onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex
    });
  }

  _onValueChange(value) {
    this.setState({ value });
  }

  _renderRow(name) { // eslint-disable-line class-methods-use-this
    return (
      <TouchableOpacity>
        <View style={styles.links_item}>
          <Text style={styles.links_text}>{name}</Text>
          <Image source={chevronIcon} style={styles.links_arrow} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { height } = Dimensions.get('window');
    const selected = this.state.value;

    return (
      <View style={{ height }}>
        <View style={styles.segmented_header_container}>
          <SegmentedControlIOS
            tintColor={colours.darkOrange}
            values={this.state.values}
            selectedIndex={this.state.selectedIndex}
            onChange={this.state.onChange}
            onValueChange={this._onValueChange} />
        </View>

        {
          (selected === 'Calendar') &&
          (<View style={styles.segment_container}>
            <WebView
              source={{ uri: 'https://teamup.com/ks929f16efeedde616' }}
              style={styles.calendar_content} />
          </View>)
        }

        {
          (selected === 'KPI') &&
          (<View style={styles.segment_container}>
            <View style={styles.kpi_content}>
              <Text style={styles.kpi_text}>Coming soon</Text>
            </View>
          </View>)
        }

        {
          (selected === 'Links') &&
          (<View style={styles.segment_container}>
            <View style={styles.links_content}>
              <Text style={styles.links_header}>Channels</Text>
              <View style={styles.links_item}>
                <Text
                  style={styles.links_text}
                  onPress={() => Linking.openURL('https://connected.unilever.com/en/home.html')}>
                  Connected World hub
                </Text>
                <Image source={chevronIcon} style={styles.links_arrow} />
              </View>
              <View style={styles.links_item}>
                <Text
                  style={styles.links_text}
                  onPress={() => Linking.openURL('https://unilever.my.salesforce.com/_ui/core/chatter/groups/GroupProfilePage?g=0F9E0000000kGsk')}>
                  Team Chatter
                </Text>
                <Image source={chevronIcon} style={styles.links_arrow} />
              </View>
              <View style={styles.links_item}>
                <Text
                  style={styles.links_text}
                  onPress={() => Linking.openURL('https://jira.unileversolutions.com')}>
                  Jira
                </Text>
                <Image source={chevronIcon} style={styles.links_arrow} />
              </View>
              <Text style={styles.links_header}>Resources</Text>
              <ListView
                dataSource={this.state.resourcesList}
                enableEmptySections
                renderRow={this._renderRow} />
            </View>
          </View>)
        }
      </View>
    );
  }
}

export default UsefulStuff;
