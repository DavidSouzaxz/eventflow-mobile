import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function Input({ placeholderTextColor = "#A9A9A9", ...rest }: TextInputProps) {
  return <TextInput style={style.input} placeholderTextColor={placeholderTextColor} {...rest} />;
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
    paddingLeft: 12,
  },
});
