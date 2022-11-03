import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ServiceListItem from "../../components/ServiceListItem";
import Header from "./Header";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Company, Service } from "../../models";
import { useBasketContext } from "../../contexts/BasketContext";

const CompanyDetailsPage = () => {
  const [company, setCompany] = useState(null);
  const [servicees, setServices] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();

  const id = route.params?.id;

  const {
    setCompany: setBasketCompany,
    basket,
    basketServices,
  } = useBasketContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setBasketCompany(null);
    // fetch the company with the id
    DataStore.query(Company, id).then(setCompany);

    DataStore.query(Service, (service) => service.companyID("eq", id)).then(
      setServices
    );
  }, [id]);

  useEffect(() => {
    setBasketCompany(company);
  }, [company]);

  if (!company) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <Header company={company} />}
        data={servicees}
        renderItem={({ item }) => <ServiceListItem service={item} />}
        keyExtractor={(item) => item.name}
      />
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
      />
      {basket && (
        <Pressable
          onPress={() => navigation.navigate("Basket")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Open basket ({basketServices.length})
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default CompanyDetailsPage;
