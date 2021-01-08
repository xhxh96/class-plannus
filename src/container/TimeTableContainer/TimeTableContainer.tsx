import React, { Component } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TimeTableView, { genTimeBlock } from 'react-native-timetable';
import axios from 'axios';
import { BottomSheet, Icon, ListItem } from 'react-native-elements';
import ay from '../../constant/ay';
import ModuleSearchContainer from '../ModuleSearchContainer';

export default class TimeTableContainer extends Component<any> {
  state = {
    showYearSelection: false,
    showModuleSelection: false,
    academicYear: '2020-2021',
    semester: 1,
    moduleList: null,
    selectedModule: [],
  };

  componentDidMount() {
    this.getModuleList('2020-2021');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.academicYear !== this.state.academicYear) {
      this.getModuleList(this.state.academicYear);
    }
  }

  setAcademicYear = (text) => {
    const token = text.split(' ');
    this.setState({
      showYearSelection: false,
      academicYear: token[0],
      semester: token[1],
    });
  };

  getModuleList = (academicYear) => {
    const url = `https://api.nusmods.com/v2/${academicYear}/moduleList.json`;

    axios.get(url).then(({ data }) => {
      const availableModules = data.filter((item) =>
        item.semesters.includes(this.state.semester)
      );
      this.setState({ moduleList: availableModules });
    });
  };

  onEventPress = (evt) => {
    Alert.alert('onEventPress', JSON.stringify(evt));
  };

  render() {
    const events_data = [
      {
        title: 'Math',
        startTime: genTimeBlock('MON', 9),
        endTime: genTimeBlock('MON', 10, 50),
        location: 'Classroom 403',
        extra_descriptions: ['Kim', 'Lee'],
      },
      {
        title: 'Math',
        startTime: genTimeBlock('WED', 9),
        endTime: genTimeBlock('WED', 10, 50),
        location: 'Classroom 403',
        extra_descriptions: ['Kim', 'Lee'],
      },
      {
        title: 'Physics',
        startTime: genTimeBlock('MON', 11),
        endTime: genTimeBlock('MON', 11, 50),
        location: 'Lab 404',
        extra_descriptions: ['Einstein'],
      },
      {
        title: 'Physics',
        startTime: genTimeBlock('WED', 11),
        endTime: genTimeBlock('WED', 11, 50),
        location: 'Lab 404',
        extra_descriptions: ['Einstein'],
      },
      {
        title: 'Mandarin',
        startTime: genTimeBlock('TUE', 9),
        endTime: genTimeBlock('TUE', 10, 50),
        location: 'Language Center',
        extra_descriptions: ['Chen'],
      },
      {
        title: 'Japanese',
        startTime: genTimeBlock('FRI', 9),
        endTime: genTimeBlock('FRI', 10, 50),
        location: 'Language Center',
        extra_descriptions: ['Nakamura'],
      },
      {
        title: 'Club Activity',
        startTime: genTimeBlock('THU', 9),
        endTime: genTimeBlock('THU', 10, 50),
        location: 'Activity Center',
      },
      {
        title: 'Club Activity',
        startTime: genTimeBlock('FRI', 13, 30),
        endTime: genTimeBlock('FRI', 14, 50),
        location: 'Activity Center',
      },
    ];
    const {
      showYearSelection,
      showModuleSelection,
      academicYear,
      semester,
      moduleList,
    } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <Icon
              name="menu"
              onPress={() => this.props.navigation.openDrawer()}
            />
            <TouchableOpacity
              onPress={() => this.setState({ showYearSelection: true })}
            >
              <Text style={styles.headerText}>
                {`${academicYear} S${semester}`}
              </Text>
            </TouchableOpacity>
            <Icon
              name="add"
              onPress={() => this.setState({ showModuleSelection: true })}
            />
          </View>
          <TimeTableView
            events={events_data}
            pivotTime={9}
            pivotEndTime={20}
            pivotDate={genTimeBlock('mon')}
            numberOfDays={5}
            onEventPress={this.onEventPress}
            headerStyle={styles.headerStyle}
            formatDateHeader="dddd"
          />
          <ModuleSearchContainer
            isVisible={showModuleSelection}
            setVisibility={(visibility) =>
              this.setState({ showModuleSelection: visibility })
            }
            moduleData={moduleList}
          />
        </SafeAreaView>
        <BottomSheet isVisible={showYearSelection} modalProps={null}>
          {ay.map((item, index) => (
            <ListItem key={index} onPress={() => this.setAcademicYear(item)}>
              <ListItem.Content>
                <ListItem.Title>{item}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#EF7C00',
  },
  container: {
    flex: 1,
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
});
