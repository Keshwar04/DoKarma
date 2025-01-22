import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { toast } from "../../../hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
// import { currentDate } from "@/logics/currentDate";
// import { staticText } from "@/helper/staticText";
// import { useState } from "react";

const OTPForm = ({ handleSubmit }: any) => {
  //   const [validOTP, setValidOTP] = useState(true);

  const FormSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  //   function onSubmit(data: z.infer<typeof FormSchema>) {
  //     if (data.pin == "123456") {
  //       toast({
  //         title: "You can now create a New Password",
  //         description: currentDate(),
  //       });
  //       navigate("/create-password");
  //     } else {
  //       setValidOTP(false);
  //     }
  //   }
  return (
    <div className="flex">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6
                flex flex-col items-center"
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
                {/* {!validOTP && (
                  <p className="text-[#EF4444] text-xs">
                    {staticText.invalidOTP}
                  </p>
                )} */}
              </FormItem>
            )}
          />
          <p className="m-0 cursor-pointer text-sm text-formColor">
            Resend OTP
          </p>
          <Button
            type="submit"
            className="bg-formColor hover:bg-[#1F4473] w-[240px] text-md"
          >
            SUBMIT
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OTPForm;
