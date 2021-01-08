import React, { Component } from 'react';
import axios from 'axios';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { groupBy } from 'lodash';

export default class ModuleSelectContainer extends Component<
  StackScreenProps<any>,
  any
> {
  state = {
    code: '',
    title: '',
    description: '',
    timetable: [],
  };

  componentDidMount() {
    this.getModuleInfo();
  }

  getModuleInfo = () => {
    const { route } = this.props;
    const { academicYear, semester, moduleCode } = route.params;

    const url = `http://api.nusmods.com/v2/${academicYear}/modules/${moduleCode}.json`;

    axios
      .get(url)
      .then(({ data }) => {
        const title = data.title;
        const description = data.description;
        const timetable = data.semesterData.find((i) => i.semester === semester)
          .timetable;

        this.setState({
          code: moduleCode,
          title,
          description,
          timetable,
        });
      })
      .catch((e) => Alert.alert('Error', 'Unable to fetch module info'));
  };

  renderClassOption = (classes) => {
    const classKeys = Object.keys(classes);

    console.log(classes);

    return (
      <View>
        {classKeys.map((key) => {
          let classInfo = classes[key][0].classNo;
          classes[key].forEach(
            (i) => (classInfo += ` ${i.day}: ${i.startTime} - ${i.endTime}`)
          );

          return <Text key={classes[key][0].classNo}>{classInfo}</Text>;
        })}
      </View>
    );
  };

  renderClassSelection = () => {
    const { code, title, description, timetable } = this.state;
    const lessonType = new Set(timetable.map((i) => i.lessonType));
    const lessonData = {};

    lessonType.forEach((i) => {
      const lessonSlots = timetable.filter((lesson) => lesson.lessonType === i);
      lessonData[i] = groupBy(lessonSlots, (lesson) => lesson.classNo);
    });

    return (
      <View
        style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}
      >
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 24 }}>{code}</Text>
          <Text style={{ fontSize: 18 }}>{title}</Text>
          <Text style={{ fontSize: 16 }}>{description}</Text>
        </View>
        {Array.from(lessonType).map((type) => (
          <View key={type} style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 16 }}>{type}</Text>
            {this.renderClassOption(lessonData[type])}
          </View>
        ))}
      </View>
    );
  };

  render() {
    return <View style={styles.container}>{this.renderClassSelection()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    flex: 1,
  },
});
