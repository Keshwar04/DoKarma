import { regex } from "@/helper/regex";
import { staticText } from "@/helper/staticText";

export const onBlurValidation = (e: any, state: any, setState: any) => {
  const { name, value } = e.target;
  const errorMessages: any = {
    panNo: staticText.panErr,
    mobNo: staticText.mobErr,
    dinNo: staticText.dinErr,
    aadharNo: staticText.aadharErr,
    pincode: staticText.pincodeErr,
  };
  const lengths: any = {
    panNo: 10,
    mobNo: 10,
    dinNo: 8,
    aadharNo: 16,
    pincode: 6,
  };
  if (value.length !== lengths[name]) {
    setState({
      ...state,
      [name]: value ? errorMessages[name] : staticText.requiredField,
    });
  }
  if (name == "email" && !regex.mail.test(value)) {
    setState({
      ...state,
      [name]: value ? staticText.emailErr : staticText.requiredField,
    });
  }
};

export const onBlurValidation2 = (e: any, state: any, setState: any) => {
  const { name, value } = e.target;
  const errorMessages: any = {
    pan: staticText.panErr,
    mobile_no: staticText.mobErr,
    din_number: staticText.dinErr,
    aadhar: staticText.aadharErr,
    pincode: staticText.pincodeErr,
  };
  const lengths: any = {
    pan: 10,
    mobile_no: 10,
    din_number: 8,
    aadhar: 19,
    pincode: 6,
  };
  if (value.length !== lengths[name]) {
    setState({
      ...state,
      [name]: value ? errorMessages[name] : staticText.requiredField,
    });
  }
  if (name == "email" && !regex.mail.test(value)) {
    setState({
      ...state,
      [name]: value ? staticText.emailErr : staticText.requiredField,
    });
  }
};
