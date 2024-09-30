import { StyleSheet, Text, View } from "react-native";

type ValueProps = {
  label: string;
  value: string;
}
const Value = ({label, value}: ValueProps) => (
  <View style={styles.valueContainer}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  valueContainer: {
    marginVertical: 10,
  },
  label: {
    color: "#FFF",
    fontSize: 20,
  },
  value: {
    fontSize: 35,
    color: "#AFB3BE",
    fontWeight: "500",
  },
});

export default Value;
