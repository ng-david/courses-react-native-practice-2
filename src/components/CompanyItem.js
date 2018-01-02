import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { getTheme } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

const theme = getTheme();

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },
  title: {
    top: 20,
    left: 80,
    fontSize: 20,
    color: 'white',
  },
  image: {
    height: 100,
  },
  action: {
    backgroundColor: 'black',
    color: 'white',
    paddingBottom: 5,
    paddingTop: 5,
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
});

// Stateless component bc we dont need to use any of the lifestyle functions that are used with stateful ones
const CompanyItem = (props) => {
  return (
    <View>
      <View style={[theme.cardStyle, styles.card]}>
        <Image
          source={{ uri: '/Users/davidng/Documents/www/david-projects/CRM_react_native/crm/src/images/background.jpg'}}
          style={[theme.cardImageStyle, styles.image]}
        />
        <Icon
          name={'business'}
          size={80}
          style={styles.icon}
        />
        <Text style={[theme.cardTitleStyle, styles.title]}>
          {props.companies.company}
        </Text>
        {props.companies.names.map((name) => {
          return (
            <Text key={name.uid} style={[theme.cardActionStyle, styles.action]}>
              {name.first_name} {name.last_name} - Project: {name.project}
            </Text>
          );
        })}

      </View>
    </View>
  )
}

export default CompanyItem;
