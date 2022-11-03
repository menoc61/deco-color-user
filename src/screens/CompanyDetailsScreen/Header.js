import { View, Text, Image } from "react-native";
import styles from "./styles";

const DEFAULT_IMAGE =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/company1.jpeg";

const CompanyHeader = ({ company }) => {
  return (
    <View style={styles.page}>
      <Image
        source={{
          uri: company.image.startsWith("http")
            ? company.image
            : DEFAULT_IMAGE,
        }}
        style={styles.image}
      />

      <View style={styles.container}>
        <Text style={styles.title}>{company.name}</Text>
        <Text style={styles.subtitle}>
           {company.deliveryFee.toFixed(1)}FCFA &#8226; {company.minDeliveryTime}-
          {company.maxDeliveryTime} minutes
        </Text>

        <Text style={styles.menuTitle}>Menu</Text>
      </View>
    </View>
  );
};

export default CompanyHeader;
