import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { getTheme } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/EvilIcons';
import * as actions from '../actions';

const theme = getTheme();

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },
  title: {
    top: 20,
    left: 80,
    color: 'white',
    fontWeight: 'normal',
    fontSize: 24,
  },
  image: {
    height: 100,
  },
  action: {
    backgroundColor: 'black',
    color: 'white',
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 0,
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
});

// Stateless component bc we dont need to use any of the lifestyle functions that are used with stateful ones
const PeopleItem = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => props.selectPerson(props.people)}
    >
      <View style={[theme.cardStyle, styles.card]}>
        <Image
          // Once the app builds, it loads this image locally, so nbd
          source={{ uri: '/Users/davidng/Documents/www/david-projects/CRM_react_native/crm/src/images/background.jpg'}}
          style={[theme.cardImageStyle, styles.image]}
        />
        <Icon
          name={'user'}
          size={100}
          style={styles.icon}
        />
        <Text style={[theme.cardTitleStyle, styles.title]}>
          {props.people.first_name} {props.people.last_name}
        </Text>
        <Text style={[theme.cardActionStyle, styles.action]}>
          {props.people.company}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

// We are connecting null to this commponent, bc our PersonList component already has the state! no need to do again
export default connect(null, actions)(PeopleItem);
