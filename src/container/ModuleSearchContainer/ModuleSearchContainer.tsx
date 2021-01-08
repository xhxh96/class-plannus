import React, { Component } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';

class ModuleSearchContainer extends Component<any, any> {
  state = {
    searchText: '',
    moduleList: [],
  };

  async componentDidMount() {
    await this.getModuleList();
  }

  getModuleList = async () => {
    const { route } = this.props;
    const { academicYear } = route.params;
    const url = `http://api.nusmods.com/v2/${academicYear}/moduleList.json`;

    axios
      .get(url)
      .then(({ data }) => this.setState({ moduleList: data }))
      .catch((e) => Alert.alert('Error', 'Unable to fetch module'));
  };

  renderItem = (item) => {
    const { navigation, route } = this.props;
    const { academicYear, semester } = route.params;

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('ModuleSelect', {
            moduleCode: item.moduleCode,
            academicYear,
            semester,
          })
        }
      >
        <Text style={styles.moduleCode}>{item.moduleCode}</Text>
        <Text style={styles.moduleTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { semester } = this.props.route.params;
    const { moduleList, searchText } = this.state;

    const filteredModuleData = () => {
      const modules = moduleList.filter((i) => {
        return i.semesters.includes(parseInt(semester));
      });

      return modules.filter(
        (item) =>
          item.moduleCode.toLowerCase().includes(searchText.toLowerCase()) ||
          item.title.toLowerCase().includes(searchText.toLowerCase())
      );
    };

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SearchBar
          placeholder="Search..."
          round
          lightTheme
          containerStyle={{ backgroundColor: 'white' }}
          value={searchText}
          onChangeText={(value) => this.setState({ searchText: value })}
        />
        <FlatList
          style={{ marginHorizontal: 10 }}
          data={filteredModuleData()}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={(item) => item.moduleCode}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 10,
  },
  moduleCode: {
    fontSize: 16,
  },
  moduleTitle: {
    fontSize: 12,
    color: 'gray',
  },
});

export default ModuleSearchContainer;
