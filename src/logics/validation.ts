import { fundRaising } from "@/helper/radioList";
import { regex } from "@/helper/regex";
import { staticText } from "@/helper/staticText";

export const loginValidation = (userInfo: any) => {
  const { pwd, mail } = userInfo;
  const errData = {} as any;

  if (!mail) errData.mail = "Enter your Email ID";
  else if (!regex.mail.test(mail)) errData.mail = staticText.emailErr;

  if (!pwd) errData.pwd = "Enter password";
  else if (!regex.pwd.test(pwd)) errData.pwd = staticText.errPwd;
  return errData;
};

export const forgetPwdValidation = (userMail: any) => {
  let errMsg;
  if (!userMail) {
    errMsg = "Enter your Email ID";
  } else if (!regex.mail.test(userMail)) {
    errMsg = "Enter Valid Email format";
  } else {
    errMsg = "";
  }
  return errMsg;
};

export const createPwdValidation = (userPwd: any) => {
  const err = {} as any;

  if (!userPwd.temp) {
    err.temp = "Please Enter Password";
  } else if (!regex.pwd.test(userPwd.temp)) {
    err.temp = staticText.errPwd;
  } else {
    delete err.temp;
  }

  if (!userPwd.cnfrm) {
    err.cnfrm = "Please Enter Password";
  } else if (!regex.pwd.test(userPwd.cnfrm)) {
    err.cnfrm = staticText.errPwd;
  } else if (userPwd.cnfrm !== userPwd.temp) {
    err.cnfrm = "Password and Confirm password does not match";
  } else {
    delete err.cnfrm;
  }

  return err;
};

export const signupValidation = (userInfo: any) => {
  const errData: any = {};
  const { name, mail, pwd } = userInfo;
  // const { confirmPwd } = userInfo;
  if (!name) errData.name = "Enter Username";
  else if (name.length < 3) errData.name = "Username must be 3 characters";

  if (!mail) errData.mail = "Enter Email ID";
  else if (!regex.mail.test(mail)) errData.mail = staticText.emailErr;

  if (!pwd) errData.pwd = "Enter Password";
  else if (pwd.length < 6) errData.pwd = staticText.errPwd2;

  // if (!confirmPwd) errData.confirmPwd = "Enter Confirm password";
  // else if (pwd !== confirmPwd) errData.confirmPwd = staticText.notSamePwd;

  return errData;
};

export const signupTrusteeValidation = (userInfo: any) => {
  const errData: any = {};
  const required = staticText.requiredField;
  const {
    trust_name,
    brand_name,
    activity,
    trustee_name,
    pan,
    aadhar,
    dob,
    social_exp,
    occupation,
    mobile_no,
    // email,
    din_number,
    activity_reports,
    google_location,
    about_trust,
    is_suite,
    suite_details,
    is_fcra,
    fcra_no,
    fcra_annual_return,
    fcra_certificate,
    is_incometax_case,
    incometax_case_details,
    terms_and_conditions,
    is_documents_upload,
    certificate_12a_12ab,
    certificate_80g,
    certificate_10_23,
    it_copy,
  } = userInfo;
  // console.log(it_copy, it_copy.length === 0 ? "if" : "else");

  if (!activity_reports) errData.activity_reports = required;
  if (!terms_and_conditions) {
    errData.terms_and_conditions = required;
  } else {
    delete errData.terms_and_conditions;
  }
  if (!google_location) errData.google_location = required;
  if (!about_trust) errData.about_trust = required;
  if (!trust_name) errData.trust_name = required;
  if (!brand_name) errData.brand_name = required;
  if (!activity) errData.activity = required;
  if (!trustee_name) errData.trustee_name = required;
  if (!dob) errData.dob = required;
  if (!social_exp) errData.social_exp = required;
  if (!occupation) errData.occupation = required;
  if (!aadhar) errData.aadhar = required;
  else if (aadhar.length !== 19) errData.aadhar = staticText.aadharErr;
  if (!pan) errData.pan = required;
  else if (pan.length !== 10) errData.pan = staticText.panErr;
  if (!mobile_no) errData.mobile_no = required;
  else if (mobile_no.length !== 10) errData.mobile_no = staticText.mobErr;
  // if (!email) errData.email = required;
  // else if (!regex.mail.test(email)) errData.email = staticText.emailErr;
  if (!din_number) errData.din_number = required;
  else if (din_number.length !== 8) errData.din_number = staticText.dinErr;
  if (is_suite) {
    if (!is_suite) errData.is_suite = required;
    if (!suite_details) errData.suite_details = required;
  }
  if (is_documents_upload) {
    if (!certificate_12a_12ab) errData.certificate_12a_12ab = required;
    if (!certificate_80g) errData.certificate_80g = required;
    if (!certificate_10_23) errData.certificate_10_23 = required;
    if (it_copy.length === 0) {
      errData.it_copy = required;
    } else {
      delete errData.it_copy;
    }
  }
  if (is_fcra) {
    // if (!is_fcra) errData.is_fcra = required;
    if (!fcra_no) errData.fcra_no = required;
    if (!fcra_annual_return) errData.fcra_annual_return = required;
    if (!fcra_certificate) errData.fcra_certificate = required;
  }
  if (is_incometax_case) {
    // if (!is_incometax_case) errData.is_incometax_case = required;
    if (!incometax_case_details) errData.incometax_case_details = required;
  }
  console.log(errData);

  return errData;
};

export const settingsValidation = (userInfo: any) => {
  const errData: any = {};
  const required = staticText.requiredField;
  const { name, location, panNo, mobNo, email, dob } = userInfo;
  if (!name) errData.name = required;
  if (!location) errData.location = required;
  if (!dob) errData.dob = required;
  if (!panNo) errData.panNo = required;
  else if (panNo.length !== 10) errData.panNo = staticText.panErr;
  if (!mobNo) errData.mobNo = required;
  else if (mobNo.length !== 10) errData.mobNo = staticText.mobErr;
  if (!email) errData.email = required;
  else if (!regex.mail.test(email)) errData.email = staticText.emailErr;
  return errData;
};

export const donorValidation = (userInfo: any) => {
  const errData: any = {};
  const required = staticText.requiredField;
  const { name, mobNo, email, address, pincode } = userInfo;
  if (!name) errData.name = required;
  if (!address) errData.address = required;
  if (!pincode) errData.pincode = required;
  else if (pincode.length !== 6) errData.pincode = staticText.pincodeErr;
  if (!mobNo) errData.mobNo = required;
  else if (mobNo.length !== 10) errData.mobNo = staticText.mobErr;
  if (!email) errData.email = required;
  else if (!regex.mail.test(email)) errData.email = staticText.emailErr;
  return errData;
};

export const campaignSlider1 = (userInfo: any) => {
  const errData: any = {};
  const required = staticText.requiredField;
  const { campaign_name, category, city, description } = userInfo;
  if (!campaign_name) errData.campaign_name = required;
  if (!category) errData.category = required;
  if (!city) errData.city = required;
  if (!description) errData.description = required;
  return errData;
};

export const campaignSlider2 = (userInfo: any, amountTxt: string) => {
  const errData: any = {};
  const required = staticText.requiredField;
  const {
    fundraise_type,
    end_date,
    target_amount,
    minimum_amount,
    fixed_amount,
  } = userInfo;
  if (!fundraise_type) errData.fundraise_type = required;
  if (fundraise_type === fundRaising[0].value) {
    if (!end_date) errData.end_date = required;
  }
  if (!target_amount) errData.target_amount = required;
  if (amountTxt === "Minimum") {
    if (!minimum_amount) errData.minimum_amount = required;
  } else {
    if (!fixed_amount) errData.fixed_amount = required;
  }
  return errData;
};
