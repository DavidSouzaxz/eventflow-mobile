import { useAuth } from "@/app/contexts/AuthContexts";
import { Colors } from "@/constants/Colors";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function Input({
  placeholderTextColor = "#A9A9A9",
  ...rest
}: TextInputProps) {
  const { theme } = useAuth();
  const colors = Colors[theme];

  return (
    <TextInput
      style={[
        style.input,
        {
          backgroundColor: theme === "dark" ? "#1E293B" : "#F1F5F9",
          color: colors.text,
          borderColor: colors.border,
        },
      ]}
      placeholderTextColor={theme === "dark" ? "#94A3B8" : "#64748B"}
      {...rest}
    />
  );
}

const style = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    color: "#000",
    borderColor: "#DCDCDC",
    borderRadius: 6,
    height: 48,
    fontSize: 16,
    paddingLeft: 18,
  },
});
