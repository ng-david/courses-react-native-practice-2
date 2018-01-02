import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ListView
} from 'react-native';
import { connect } from 'react-redux';
import PeopleItem from './PeopleItem';
import Icon from 'react-native-vector-icons/EvilIcons';
import PeopleDetail from './PeopleDetail';
import { loadInitialContacts } from '../actions';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 353,
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingLeft: 20,
  },
});

class PeopleList extends Component<{}> {
  static navigationOptions = {
    tabBarLabel: 'People',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'user'}
        size={50}
        style={{ color: tintColor }}
      />
    )
  }
  // Deprecated and replaced with renderInitialView
  // componentWillMount() {
  //   const ds = new ListView.DataSource({
  //     rowHasChanged: (r1, r2) => r1 !== r2,
  //   });
  //   this.dataSource = ds.cloneWithRows(this.props.people);
  // }

  // This will be loaded before component mounts (this data is available before it loads)
  componentWillMount() {
    // We want data loaded before component renders!
    this.props.loadInitialContacts();
  }

  renderInitialView() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(this.props.people);
    // If we are calling for detail view give us it, else don't give us it!
    if (this.props.detailView) {
      return (
        <PeopleDetail />
      );
    } else {
      return (
        <ListView
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          enableEmptySections={true}
          dataSource={this.dataSource}
          renderRow={(rowData) =>
            <PeopleItem people={rowData} />
          }
        />
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderInitialView()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const people = _.map(state.people, (val, uid) => {
    return { ...val, uid};
  });

  return {
    people,
    detailView: state.detailView, // need to return this so our if statement from renderInitialView has something to check
  }
}

export default connect(mapStateToProps, {loadInitialContacts})(PeopleList);
