/**
 * OTP Component
 *
 * This component renders the OTP (One-Time Password) verification page.
 * It uses the Layout component for consistent styling and structure.
 *
 * The component displays:
 * 1. A title label "Enter OTP"
 * 2. A description label with static text explaining the OTP process
 * 3. An OTPForm component for user input
 *
 * The component leverages UI components from the project's design system,
 * such as Label, and custom components like Layout and OTPForm.
 */

import { Label } from "@/components/ui/label";
import Layout from "./layout";
import { staticText } from "@/helper/staticText";
import OTPForm from "@/components/ui-components/otp/otpForm";
import Header from "@/components/utils/text/header";
const OTP = () => {
  return (
    <Layout>
      <div className="mb-2 text-center">
        <Header txt=" Enter OTP" isForm={true} />
      </div>
      <Label className="text-sm">
        <span>{staticText.otp}</span>
      </Label>
      <OTPForm />
    </Layout>
  );
};

export default OTP;
