import { useState, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import CompanyItem from "../../components/CompanyItem";
import { DataStore } from "aws-amplify";
import { Company } from "../../models";

export default function HomeScreen() {
  const [companies, setCompanys] = useState([]);

  useEffect(() => {
    DataStore.query(Company).then(setCompanys);
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={companies}
        renderItem={({ item }) => <CompanyItem company={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});
