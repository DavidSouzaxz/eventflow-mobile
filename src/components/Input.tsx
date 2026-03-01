import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function Input({ ...rest }: TextInputProps) {
  return <TextInput style={style.input} {...rest} />;
}

const style = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: 6,
    height: 48,
    fontSize: 16,
    paddingLeft: 12,
  },
});
