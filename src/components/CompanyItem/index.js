import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DEFAULT_IMAGE = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fuser-images.githubusercontent.com%2F43302778%2F106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg&imgrefurl=https%3A%2F%2Fgithub.com%2Fsaulwolfdev%2FCards%2Fissues%2F5&tbnid=dAOBLb6Mi03B7M&vet=12ahUKEwiA6rW8zMf6AhURRhoKHRg7AhcQMygMegUIARD4AQ..i&docid=j48pLUB2oTpG7M&w=900&h=450&q=default%20image&ved=2ahUKEwiA6rW8zMf6AhURRhoKHRg7AhcQMygMegUIARD4AQ";

const CompanyItem = ({ company }) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Company", { id: company.id });
  };

  return (
    <Pressable onPress={onPress} style={styles.companyContainer}>
      <Image
        source={{
          uri: company.image.startsWith("http")
            ? company.image
            : DEFAULT_IMAGE,
        }}
        style={styles.image}
      />
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{company.name}</Text>
          <Text style={styles.subtitle}>
             {company.deliveryFee.toFixed(1)}FCFA &#8226;{" "}
            {company.minDeliveryTime}-{company.maxDeliveryTime} minutes
          </Text>
        </View>

        <View style={styles.rating}>
          <Text>{company?.rating?.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CompanyItem;

const styles = StyleSheet.create({
  companyContainer: {
    width: "100%",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
  },
  subtitle: {
    color: "grey",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: "auto",
    backgroundColor: "lightgray",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
