import React, { Component } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { groupBy } from 'lodash';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-elements';
import { setClasses } from '../../action/setClasses';
import { connect } from 'react-redux';
import { genTimeBlock } from 'react-native-timetable';

interface Props extends StackScreenProps<any> {
  classes: any[];
  setClasses: ([]) => void;
}

class ModuleSelectContainer extends Component<Props, any> {
  state = {
    code: '',
    title: '',
    description: '',
    timetable: [],
    selectedOptions: {},
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

  renderClassOption = (classes, type) => {
    const { selectedOptions } = this.state;
    const classKeys = Object.keys(classes);

    return (
      <View>
        <Picker
          selectedValue={selectedOptions[type]}
          onValueChange={(value) =>
            this.setState({
              selectedOptions: { ...this.state.selectedOptions, [type]: value },
            })
          }
        >
          <Picker.Item value={null} label="Select" />
          {classKeys.map((key) => {
            let classInfo = classes[key][0].classNo;
            classes[key].forEach(
              (i) => (classInfo += ` ${i.day}: ${i.startTime} - ${i.endTime}`)
            );

            return (
              <Picker.Item
                key={classes[key][0].classNo}
                value={classes[key][0].classNo}
                label={classInfo}
              />
            );
          })}
        </Picker>
      </View>
    );
  };

  renderClassSelection = () => {
    const { code, title, description, timetable } = this.state;
    const { classes, setClasses, navigation } = this.props;
    const lessonType = new Set(timetable.map((i) => i.lessonType));
    const lessonData = {};

    lessonType.forEach((i) => {
      const lessonSlots = timetable.filter((lesson) => lesson.lessonType === i);
      lessonData[i] = groupBy(lessonSlots, (lesson) => lesson.classNo);
    });

    return (
      <ScrollView
        style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}
      >
        <SafeAreaView>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 24 }}>{code}</Text>
            <Text style={{ fontSize: 18 }}>{title}</Text>
            <Text style={{ fontSize: 16 }}>{description}</Text>
          </View>
          {Array.from(lessonType).map((type) => (
            <View key={type} style={{ paddingVertical: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{type}</Text>
              {this.renderClassOption(lessonData[type], type)}
            </View>
          ))}
          <Button
            title="Confirm"
            onPress={() => {
              const lessonTypeArray = Array.from(lessonType);
              const selectedClasses = [];
              lessonTypeArray.forEach((i) => {
                const selectedKey = this.state.selectedOptions[i];
                const classInfo = lessonData[i][selectedKey];
                classInfo.forEach((slot) =>
                  selectedClasses.push({
                    title,
                    startTime: genTimeBlock(
                      slot.day.substr(0, 3).toUpperCase(),
                      slot.startTime.substr(0, 2),
                      slot.startTime.substr(2, 2)
                    ),
                    endTime: genTimeBlock(
                      slot.day.substr(0, 3).toUpperCase(),
                      slot.endTime.substr(0, 2),
                      slot.endTime.substr(2, 2)
                    ),
                    location: slot.venue,
                    extra_descriptions: [slot.lessonType],
                  })
                );
              });
              const existingClasses = classes;
              selectedClasses.forEach((i) => existingClasses.push(i));
              console.log(existingClasses);
              setClasses(existingClasses);
              navigation.goBack();
            }}
          />
        </SafeAreaView>
      </ScrollView>
    );
  };

  render() {
    return <View style={styles.container}>{this.renderClassSelection()}</View>;
  }
}

const mapStateToProps = (state) => ({
  classes: state.classes,
});

const mapDispatchToProps = (dispatch) => ({
  setClasses: (classes) => dispatch(setClasses(classes)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModuleSelectContainer);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    flex: 1,
  },
  saveButton: {
    flex: 1,
    backgroundColor: 'green',
  },
});
