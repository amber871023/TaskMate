import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";

export function GlobalLayout({ children }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
  },
});
