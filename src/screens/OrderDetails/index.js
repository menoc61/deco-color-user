import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import BasketServiceItem from "../../components/BasketServiceItem";

import orders from "../../../assets/data/orders.json";

import styles from "./styles";
import { useOrderContext } from "../../contexts/OrderContext";
import { useEffect, useState } from "react";

const order = orders[0];

const OrderDetailsHeader = ({ order }) => {
  return (
    <View>
      <View style={styles.page}>
        <Image source={{ uri: order.Company.image }} style={styles.image} />

        <View style={styles.container}>
          <Text style={styles.title}>{order.Company.name}</Text>
          <Text style={styles.subtitle}>{order.status} &#8226; 2 days ago</Text>

          <Text style={styles.menuTitle}>Your orders</Text>
        </View>
      </View>
    </View>
  );
};

const OrderDetails = ({ id }) => {
  const [order, setOrder] = useState();
  const { getOrder } = useOrderContext();

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, []);

  if (!order) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  return (
    <FlatList
      ListHeaderComponent={() => <OrderDetailsHeader order={order} />}
      data={order.servicees}
      renderItem={({ item }) => <BasketServiceItem basketService={item} />}
    />
  );
};

export default OrderDetails;
