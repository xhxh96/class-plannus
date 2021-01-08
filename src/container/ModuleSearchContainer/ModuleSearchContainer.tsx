import React, { FunctionComponent, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Overlay, SearchBar } from 'react-native-elements';

interface Props {
  isVisible: boolean;
  setVisibility: (boolean) => void;
  moduleData: any[];
}

const ModuleSearchContainer: FunctionComponent<Props> = ({
  isVisible,
  setVisibility,
  moduleData,
}) => {
  const [searchText, setSearchText] = useState('');

  const renderItem = (item) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => setVisibility(false)}
    >
      <Text style={styles.moduleCode}>{item.moduleCode}</Text>
      <Text style={styles.moduleTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const filteredModuleData = () => {
    return (
      moduleData &&
      moduleData.filter(
        (item) =>
          item.moduleCode.includes(searchText) ||
          item.title.includes(searchText)
      )
    );
  };

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={() => setVisibility(false)}
      overlayStyle={{ height: '80%', width: '80%' }}
    >
      <View style={{ flex: 1 }}>
        <SearchBar
          placeholder="Search..."
          round
          lightTheme
          containerStyle={{ backgroundColor: 'white' }}
          value={searchText}
          onChangeText={(value) => setSearchText(value)}
        />
        <FlatList
          data={filteredModuleData()}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.moduleCode}
        />
      </View>
    </Overlay>
  );
};

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
