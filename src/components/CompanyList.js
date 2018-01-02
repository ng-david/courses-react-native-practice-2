import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ListView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import CompanyItem from './CompanyItem';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexWrap: 'wrap',
    paddingTop: 10,
  },
});

class CompanyList extends Component<{}> {
  static navigationOptions = {
    tabBarLabel: 'Companies',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'business'}
        size={42}
        style={{ color: tintColor }}
      />
    )
  }
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(this.props.companies);

    return (
      <View style={styles.container}>
        <ListView
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          enableEmptySections={true}
          dataSource={this.dataSource}
          renderRow={(rowData) =>
            <CompanyItem companies={rowData} />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const people = _.map(state.people, (val, uid) => {
    return { ...val, uid};
  });

  const companies =
    _.chain(people)
    .groupBy('company')
    .map((value, key) => {
      return {
        company: key,
        names: value
      };
    })
    .value();

  return {
    companies,
  };
};

export default connect(mapStateToProps)(CompanyList);
