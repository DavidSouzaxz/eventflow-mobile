import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type ButtonProps = TouchableOpacityProps & {
  label: string;
};

export function Button({ label, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={style.container} activeOpacity={0.7} {...rest}>
      <Text style={style.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    backgroundColor: "#3366FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 600,
  },
});
