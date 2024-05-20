import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CustomPhoneInput = (props) => {
  return (
    <PhoneInput
      prefix="+"
      inputStyle={{
        width: "100%",
        height: "40px",
        borderColor: "rgb(209 213 219)",
        backgroundColor: "white",
        borderRadius: "0.375rem",
      }}
      searchStyle={{
        borderColor: "rgb(209 213 219)",
        boxShadow:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        borderRadius: "0.375rem",
        backgroundColor: "white",
        padding: "0.5rem",
        width: "260px",
      }}
      dropdownStyle={{
        marginTop: "3.3rem",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        top: 0,
        left: 0,
        right: 0,
      }}
      {...props}
    />
  );
};

export default CustomPhoneInput;
