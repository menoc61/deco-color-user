import { View, Text, StyleSheet } from "react-native";

const BasketServiceItem = ({ basketService }) => {
  // console.log(basketService);
  return (
    <View style={styles.row}>
      <View style={styles.quantityContainer}>
        <Text>{basketService.quantity}</Text>
      </View>
      <Text style={{ fontWeight: "600" }}>{basketService.Service.name}</Text>
      <Text style={{ marginLeft: "auto" }}>{basketService.Service.price} FCFA</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },

  quantityContainer: {
    backgroundColor: "lightgray",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});

export default BasketServiceItem;
