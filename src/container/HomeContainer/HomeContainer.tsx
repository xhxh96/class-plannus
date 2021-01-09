import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { ceg } from '../../constant/requirement';

export default class HomeContainer extends Component<any, any> {
  render() {
    const { navigation } = this.props;
    const list = ceg;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Icon name="menu" onPress={() => navigation.openDrawer()} />
          <TouchableOpacity
            onPress={() => this.setState({ showYearSelection: true })}
          >
            <Text style={styles.headerText}>Home</Text>
          </TouchableOpacity>
          <Icon name="settings" />
        </View>
        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Program:</Text>
            <Text>Computer Engineering (Hons)</Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Current Standing:
            </Text>
            <Text>Year 4</Text>
          </View>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {list.map(({ section, modules }) => (
            <View key={section} style={{ marginBottom: 30 }}>
              <Text style={styles.sectionText}>{section}</Text>
              {modules.map((i) => (
                <ListItem key={i} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{i}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    color: '#003D7C',
  },
  sectionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
