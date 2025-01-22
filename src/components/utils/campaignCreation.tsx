import styles from "../../css/newCampaign.module.css";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import FieldsHead from "./fieldsHead";
import { staticText } from "@/helper/staticText";
import DonationPetition from "./donationPetition";
import { campaignTypes } from "@/helper/helper";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import DatePickerUI from "../shadUI/datepicker";
import { CircleAlert, CloudUpload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import { checkFileSize } from "@/logics/logics";
// import { mandatoryFormValidation } from '@/logics/logics'
import { FaGoogle, FaApple, FaPaypal } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Label } from "../ui/label";
import SelectInput from "./select/selectInput";
import { currencies, majorActivities } from "@/helper/selectingList";
import { fundRaising } from "@/helper/radioList";
import { useCommonStore, useFormStore } from "@/store/zustand";
import { Button } from "../ui/button";
import ComboBox from "./comboBox";
import { toast } from "@/hooks/use-toast";
// import { newCampign1Keys, newCampign2Keys } from '@/helper/formKeys'
import RadioInput from "@/components/shadUI/radioInput";
import ErrorLabel from "./errorLabel";
import { campaignSlider1, campaignSlider2 } from "@/logics/validation";
import { useCampaigns } from "@/hooks/useCampaign";
import supabase from "@/lib/supabase";

const CampaignCreation = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [donationType, setDonationType] = useState("Minimum");
  const [errorInfo, setErrorInfo] = useState<any>({});
  const [createLoading, setCreateLoading] = useState(false);
  const { uploadImage } = useCampaigns();
  const { setCampaignDatas, campaignDatas } = useFormStore();
  const { accessToken } = useCommonStore();

  const handleCampaignType = (campaign: string) =>
    setCampaignDatas({ ...campaignDatas, active_campaign: campaign });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleChange = (e: any) => {
    const value = e?.target?.value;
    const name = e?.target?.name;
    const type = e?.target?.type;
    if (type == "file") {
      const file = e.target.files[0];
      if (file) {
        setErrorInfo({ ...errorInfo, cover_image: "" });
      }
      setCampaignDatas({ [name]: checkFileSize(file, 3) });
    } else {
      setCampaignDatas({ [name]: value });
    }
  };

  const handleBlur = (e: any) => {
    const { name, value } = e.target;
    setErrorInfo({ ...errorInfo, [name]: !value && staticText.requiredField });
  };

  const handleDateChange = (e: Date) => setCampaignDatas({ end_date: e });

  const handleRadioChange = (e: any) => setCampaignDatas({ fundraise_type: e });

  const donationList = ["Minimum", "Fixed"];
  const paymentMethods = [
    { icon: <FaGoogle />, value: "Connect with Google Pay" },
    { icon: <FaApple />, value: "Connect with Apple Pay" },
    { icon: <FaPaypal />, value: "Connect with Paypal" },
  ];
  const amountTxt = donationType == "Minimum" ? "Minimum" : "Fixed";
  const name = amountTxt == "Minimum" ? "minimum_amount" : "fixed_amount";
  const prevNxtBtnCls =
    "flex items-center bg-pimaryBtn hover:bg-primaryClr text-black";
  console.log(current);

  // const hhh = ()
  const handleScroll = (step: number) => {
    // const isMandatoryFields = mandatoryFormValidation(campaignDatas, newCampign1Keys)
    // const keys = campaignDatas.fundraise_type === fundRaising[0].value && 'deadline'
    // const mergingKeys = [keys, name, ...newCampign2Keys];
    // const truthyKeys = mergingKeys.filter(Boolean)
    // const isMandatoryFields2 = mandatoryFormValidation(campaignDatas, truthyKeys)

    if (step > 0) {
      if (current === 0) {
        if (campaignDatas.active_campaign) {
          api?.scrollTo(current + step);
        } else {
          toast({
            title: staticText.selectCampaign,
            status: "error",
          });
          return;
        }
      }
      if (current === 1) {
        const errData = campaignSlider1(campaignDatas);
        setErrorInfo(errData);
        const objKeys = Object.keys(errData).length === 0;
        if (objKeys) {
          api?.scrollTo(current + step);
        } else {
          toast({
            title: staticText.errMsg,
            status: "error",
          });
          return;
        }
      }
      if (current === 2) {
        const errData = campaignSlider2(campaignDatas, amountTxt);
        setErrorInfo(errData);
        const objKeys = Object.keys(errData).length === 0;
        if (objKeys) {
          api?.scrollTo(current + step);
        } else {
          toast({
            title: staticText.errMsg,
            status: "error",
          });
          return;
        }
      }
      if (current === 3) {
        if (campaignDatas?.cover_image) {
          api?.scrollTo(current + step);
        } else {
          toast({
            title: staticText.errMsg,
            status: "error",
          });
          return;
        }
      }
    }
    api?.scrollTo(current + step);
  };

  const createCampaign = async () => {
    setCreateLoading(true);
    let updatedCampaignData;
    if (campaignDatas.cover_image) {
      const publicUrl = await uploadImage(campaignDatas.cover_image as File);
      if (publicUrl) {
        updatedCampaignData = { ...campaignDatas, cover_image: publicUrl };
        // const updateFormData = setCampaignDatas({ cover_image: publicUrl });
        console.log(updatedCampaignData);
        const formatedData = {
          ...updatedCampaignData,
          minimum_amount: Number(updatedCampaignData.minimum_amount),
          fixed_amount: Number(updatedCampaignData.fixed_amount),
          target_amount: Number(updatedCampaignData.target_amount),
          owner: accessToken,
          end_date: updatedCampaignData.end_date
            ? updatedCampaignData.end_date?.toISOString()
            : null,
        };
        console.log(formatedData);
        try {
          const { error, status } = await supabase
            .from("campaign_details")
            .insert([formatedData]);
          if (status === 201) {
            setCreateLoading(false);
            toast({
              title: "Campaign has successfully created",
              status: "success",
            });
            setTimeout(() => {
              window.location.href = "/fundraiser-dashboard";
            }, 0);
          }
          if (error) {
            setCreateLoading(false);
            toast({
              title: error?.message,
              status: "error",
            });
          }
        } catch (error: any) {
          toast({
            title: error?.message,
            status: "error",
          });
        }

        // return data;
        // const res = await addCampaign(updatedCampaignData);
        // console.log(res);

        // if (res) {
        //   setTimeout(() => {
        //     toast({
        //       title: "Campaign has successfully created",
        //       status: "success",
        //     });
        //   }, 800);
        //   navigate("/fundraiser-dashboard");
        // }
      }
    } else {
      setErrorInfo({
        ...errorInfo,
        cover_image: staticText.uploadImg,
      });
      setCreateLoading(false);
      toast({
        title: staticText.errMsg,
        status: "error",
      });
    }
  };

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    setCampaignDatas({ currency: "Indian Rupee INR" });
    campaignDatas?.fundraise_type == "Ongoing" &&
      setCampaignDatas({ end_date: "" });
    campaignDatas?.fixed_amount && setCampaignDatas({ minimum_amount: "" });
    campaignDatas?.minimum_amount && setCampaignDatas({ fixed_amount: "" });
    campaignDatas?.cover_image === null &&
      toast({
        title: staticText.fileSizeLimit,
        status: "error",
      });
  }, [
    campaignDatas?.fundraise_type,
    campaignDatas?.fixed_amount,
    campaignDatas?.minimum_amount,
    campaignDatas?.cover_image,
  ]);
  console.log(campaignDatas);

  return (
    <Carousel setApi={setApi} className="w-full">
      <CarouselContent>
        <CarouselItem key={1}>
          <Card style={{ height: "740px" }}>
            <CardContent className="p-3 sm:p-7">
              <FieldsHead title={staticText.choose} subTxt={staticText.about} />
              <div className="flex">
                <DonationPetition
                  {...campaignTypes.donation}
                  handleCampaignType={handleCampaignType}
                  campaignDatas={campaignDatas}
                />
                {/* <DonationPetition
                  {...campaignTypes.petition}
                  handleCampaignType={handleCampaignType}
                  campaignDatas={campaignDatas}
                /> */}
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem key={2}>
          <Card style={{ height: "740px" }}>
            <CardContent className="p-3 sm:p-7">
              <FieldsHead
                title={staticText.choose2}
                subTxt={staticText.about2}
              />
              <div className="flex flex-col gap-3 md:gap-5">
                <div>
                  <Label className="mandotatory">Campaign Title</Label>
                  <Input
                    className="mt-2 "
                    name="campaign_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={campaignDatas?.campaign_name || ""}
                  />
                  <ErrorLabel errData={errorInfo?.campaign_name} />
                </div>
                <div>
                  <Label className="mandotatory">
                    Major Activity of the Trust
                  </Label>
                  <div className="mt-2">
                    <ComboBox
                      selectList={majorActivities}
                      placeholder="Activities"
                      setState={setCampaignDatas}
                      stateKey="category"
                    />
                    <ErrorLabel
                      errData={!campaignDatas?.category && errorInfo.category}
                    />
                  </div>
                </div>
                <div>
                  <Label className="mandotatory">City</Label>
                  <Input
                    className="mt-2"
                    name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={campaignDatas?.city || ""}
                  />
                  <ErrorLabel errData={errorInfo?.city} />
                </div>
                <div>
                  <Label className="mandotatory">Story</Label>
                  <Textarea
                    className="mt-2"
                    name="description"
                    maxLength={256}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={campaignDatas?.description || ""}
                  />
                  <p className={styles.charRestrict}>
                    {staticText.charRestrict}
                  </p>
                  <ErrorLabel errData={errorInfo?.description} />
                </div>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem key={3}>
          <Card style={{ height: "740px" }}>
            <CardContent className="p-3 sm:p-7">
              <FieldsHead
                title={staticText.choose3}
                subTxt={staticText.about3}
              />
              <div className="flex flex-col gap-3 md:gap-5">
                <div>
                  <Label className="mandotatory">Currency</Label>
                  <div className="mt-2">
                    <SelectInput
                      selectList={currencies}
                      text="Select Currency"
                      isCode={true}
                      isDisable={true}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Label className="mandotatory">Fundraiser Type</Label>
                    {errorInfo.fundraise_type &&
                      !campaignDatas.fundraise_type && (
                        <CircleAlert color="red" size="18" />
                      )}
                  </div>
                  <div className="my-4">
                    <RadioInput
                      handleChange={handleRadioChange}
                      radioList={fundRaising}
                      genderValue={campaignDatas.fundraise_type || ""}
                      flexCol="flex-col lg:flex-row"
                    />
                  </div>
                </div>
                {campaignDatas.fundraise_type === fundRaising[0].value && (
                  <div>
                    <Label className="mandotatory">DeadLine</Label>
                    <div className="mt-2">
                      <DatePickerUI
                        handleDateChange={handleDateChange}
                        stateValue={campaignDatas?.end_date}
                      />
                      <ErrorLabel
                        errData={!campaignDatas.end_date && errorInfo.end_date}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <Label className="mandotatory">Fundraiser Goal Amount</Label>
                  <Input
                    className="mt-2 "
                    type="number"
                    name="target_amount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={campaignDatas?.target_amount || ""}
                  />
                  <ErrorLabel errData={errorInfo.target_amount} />
                </div>
                <div>
                  <Label className="mandotatory">Donation Type</Label>
                  <br />
                  <div className="inline-block my-3">
                    <div className="shadow border rounded flex self-start sm:self-auto mt-3 sm:mt-0">
                      {donationList.map((e) => (
                        <span
                          key={e}
                          className={`cursor-pointer p-1 px-3 flex items-center 
                        border-r ${
                          donationType !== e && "bg-[#F8FAFC] text-[#94A3B8]"
                        }`}
                          onClick={() => {
                            setDonationType(e);
                            setCampaignDatas({ amount_type: e });
                          }}
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="mandotatory">
                    {`${amountTxt}`} Amount(s)
                  </Label>
                  <Input
                    className="mt-2 "
                    type="number"
                    name={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={campaignDatas[name] || ""}
                  />
                  <ErrorLabel errData={errorInfo[name]} />
                </div>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem key={4}>
          <Card style={{ height: "740px" }}>
            <CardContent className="p-3 sm:p-7">
              <FieldsHead
                title={staticText.choose4}
                subTxt={staticText.about4}
              />
              <div className="flex flex-col gap-3 md:gap-5">
                <div>
                  <Label className="mandotatory">Your campaign title</Label>
                  <Input
                    className="my-2 "
                    disabled
                    value={campaignDatas?.campaign_name}
                  />
                </div>
                {/* <p className='mb-2'>Create a deadline for your campaign</p> */}
                {campaignDatas?.end_date && (
                  <div>
                    <Label className="mandotatory">Campaign End Date</Label>
                    <div className="my-2">
                      <DatePickerUI
                        isDisabled={true}
                        stateValue={campaignDatas?.end_date}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <Label className="mandotatory">Campaign Goal Amount</Label>
                  <Input
                    className="my-2"
                    disabled
                    value={campaignDatas?.target_amount || ""}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Label className="mandotatory">
                      Upload a beautiful cover image
                    </Label>
                    {errorInfo.cover_image && (
                      <CircleAlert color="red" size="18" />
                    )}
                  </div>
                  <div
                    className={`${styles.fileUpload}`}
                    onClick={() =>
                      fileInputRef.current && fileInputRef.current.click()
                    }
                  >
                    <div className="flex flex-col justify-center items-center">
                      <input
                        type="file"
                        id="fileInput"
                        ref={fileInputRef}
                        accept=".png, .jpg, .jpeg, .gif, .pdf"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="cover_image"
                        style={{ display: "none" }}
                      />
                      <div className={styles.hashCircle}>
                        <CloudUpload size="20" />
                      </div>
                      <p className={`${styles.uploadTxt} text-[20px]`}>
                        {campaignDatas?.cover_image?.name || "Upload Files"}
                      </p>
                      <p className={styles.format}>{staticText.fileFormat}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <Button
                  className="bg-pimaryBtn hover:bg-primaryClr text-black"
                  onClick={createCampaign}
                  disabled={createLoading}
                >
                  {createLoading ? (
                    <div
                      className="animate-spin rounded-full h-5 w-5 border-t-2 border-black border-opacity-100"
                      role="status"
                    ></div>
                  ) : (
                    "Create Campaign"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem key={5}>
          <Card style={{ height: "740px" }}>
            <CardContent className="p-3 sm:p-7">
              <FieldsHead
                title={staticText.choose5}
                subTxt={staticText.about5}
              />
              <Label>Available payment methods</Label>
              <div className="flex flex-col mt-3 gap-3 md:gap-5">
                {paymentMethods.map((e) => (
                  <Button
                    key={e.value}
                    className="bg-formColor sm:w-[50%] hover:bg-[#25507C]"
                  >
                    {e.icon}&nbsp;{e.value}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <div className="mt-4 flex justify-between items-center">
        <Button
          disabled={current === 0 && true}
          size="sm"
          className={prevNxtBtnCls}
          onClick={() => handleScroll(-1)}
        >
          <FaArrowLeft />
          &nbsp; Previous
        </Button>
        <Button
          disabled={current === 4 && true}
          size="sm"
          className={prevNxtBtnCls}
          onClick={() => handleScroll(1)}
        >
          Next&nbsp; <FaArrowRight />
        </Button>
      </div>
    </Carousel>
  );
};

export default CampaignCreation;
