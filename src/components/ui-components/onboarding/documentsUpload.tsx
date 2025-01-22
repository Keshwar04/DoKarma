import Header from "@/components/utils/text/header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { staticText } from "@/helper/staticText";
import FileSizeType from "@/components/utils/fileSizeType";
import SwitchInput from "@/components/utils/switch/switchInput";
import { useFormErrorStore, useFormStore } from "@/store/zustand";
import ErrorLabel from "@/components/utils/errorLabel";
import { useEffect, useRef, useState } from "react";
import { CircleX } from "lucide-react";
import { handlingFileInput } from "@/logics/logics";
import { useCampaigns } from "@/hooks/useCampaign";
import { toast } from "@/hooks/use-toast";
import { removeImageFromBucket } from "@/store/campaignSlice";

const DocumentsUpload = ({
  handleChange,
  fileClass,
  userData,
  handleSwitchInput,
  handleBlur,
}: any) => {
  const [files, setFiles] = useState<any>([]);
  const [fileUrl, setFileUrl] = useState<any>([]);
  const [isActive, setIsActive] = useState(false);
  const { onBoardingDatas, setOnBoardingDatas } = useFormStore();
  const { uploadImage } = useCampaigns();
  const { onboardingErrorInfo, setOnboardingErrInfo } = useFormErrorStore();
  const fileInputRef = useRef<any>(null);
  const isFormSubmittedUser = Object.keys(userData).length > 0;

  const handleMultipleFileChange = async (eve: any) => {
    if (files.length < 3) {
      setIsActive(true);
      const selectedFiles = Array.from(eve.target.files);
      handlingFileInput(eve, selectedFiles[0]);
      if (eve.target.files[0]) {
        setFiles([...files, ...selectedFiles]);
        const publicUrl = await uploadImage(eve.target.files[0] as File);
        if (publicUrl) {
          setFileUrl([...fileUrl, publicUrl]);
        }
      }
    } else {
      toast({
        title: staticText.maxFileUpload,
        status: "error",
      });
    }
  };
  const handleRemoveFile = async (index: number, file: any) => {
    const url = fileUrl.find((e: string) =>
      e.includes(file.replace(/\s+/g, ""))
    );
    const fileName = url?.split("campaign/")[1];
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    const updatedFileUrl = [...fileUrl];
    updatedFileUrl.splice(index, 1);
    setFileUrl(updatedFileUrl);
    await removeImageFromBucket(fileName);
  };

  useEffect(() => {
    if (isActive) {
      setOnboardingErrInfo({
        it_copy: files.length > 0 ? "" : staticText.requiredField,
      });
    }
  }, [files]);

  useEffect(() => {
    setOnBoardingDatas({ it_copy: fileUrl });
  }, [fileUrl]);

  useEffect(() => {
    setOnBoardingDatas({
      ...onBoardingDatas,
      certificate_12a_12ab: onBoardingDatas.is_documents_upload
        ? onBoardingDatas.certificate_12a_12ab
        : "",
      certificate_80g: onBoardingDatas.is_documents_upload
        ? onBoardingDatas.certificate_80g
        : "",
      certificate_10_23: onBoardingDatas.is_documents_upload
        ? onBoardingDatas.certificate_10_23
        : "",
      it_copy: onBoardingDatas.is_documents_upload
        ? onBoardingDatas.it_copy
        : "",
    });
  }, [onBoardingDatas.is_documents_upload]);
  console.log(onBoardingDatas);

  return (
    <>
      <div className="-ms-2">
        <Header txt="Document Upload" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 mb-6">
        <div>
          <SwitchInput
            label="Trust/ Foundation is registered under 12AB/ 80G/ 10(23) etc"
            id="is_documents_upload"
            handleChange={handleSwitchInput}
            field="switch"
            isDisabled={isFormSubmittedUser}
            defaultValue={
              isFormSubmittedUser
                ? userData.is_documents_upload
                : onBoardingDatas.is_documents_upload
            }
          />
          <ErrorLabel errData={onboardingErrorInfo.is_documents_upload} />
        </div>
        {userData.is_documents_upload || onBoardingDatas.is_documents_upload ? (
          <>
            <div>
              <Label className="mandotatory">
                12A/ 12AB certificates of the Trust
              </Label>
              <Input
                className={`mt-2 ${fileClass}`}
                type="file"
                onChange={handleChange}
                onBlur={handleBlur}
                name="certificate_12a_12ab"
                accept=".jpg,.png,.pdf"
                disabled={isFormSubmittedUser}
              />
              <FileSizeType />
              <ErrorLabel errData={onboardingErrorInfo.certificate_12a_12ab} />
            </div>
            <div>
              <Label className="mandotatory">
                80G Certificates of the Trust
              </Label>
              <Input
                className={`mt-2 ${fileClass}`}
                type="file"
                onChange={handleChange}
                onBlur={handleBlur}
                name="certificate_80g"
                accept=".jpg,.png,.pdf"
                disabled={isFormSubmittedUser}
              />
              <FileSizeType />
              <ErrorLabel errData={onboardingErrorInfo.certificate_80g} />
            </div>
            <div>
              <Label className="mandotatory">
                10(23) Certificates/ Approval
              </Label>
              <Input
                className={`mt-2 ${fileClass}`}
                type="file"
                onChange={handleChange}
                onBlur={handleBlur}
                name="certificate_10_23"
                accept=".jpg,.png,.pdf"
                disabled={isFormSubmittedUser}
              />
              <FileSizeType />
              <ErrorLabel errData={onboardingErrorInfo.certificate_10_23} />
            </div>
            <div>
              <Label className="mandotatory">{staticText.ITCopy}</Label>
              <Input
                className={`mt-2 ${fileClass} hidden`}
                type="file"
                ref={fileInputRef}
                onChange={handleMultipleFileChange}
                onBlur={handleBlur}
                name="it_copy"
                accept=".jpg,.png,.pdf"
                multiple
                disabled={isFormSubmittedUser}
              />
              {/* <FileSizeType />
              <ErrorLabel errData={onboardingErrorInfo.it_copy} /> */}

              <div className="relative">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 mt-2 file:bg-formColor file:text-white"
                  name="it_copy"
                  onClick={() => fileInputRef.current.click()}
                  disabled={isFormSubmittedUser}
                />
                <div
                  className={`absolute top-2 left-3 flex items-center space-x-2 text-sm ${
                    isFormSubmittedUser && "opacity-50"
                  }`}
                >
                  <span
                    className="bg-formColor text-white px-[4px] py-[2px]"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Choose Files
                  </span>
                  <span onClick={() => fileInputRef.current.click()}>
                    {files.length > 0
                      ? `${files.length} file(s) selected`
                      : `No file chosen`}
                  </span>
                </div>
                <FileSizeType />
                <ErrorLabel errData={onboardingErrorInfo.it_copy} />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              {
                <ul>
                  {files.map((file: any, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      {file.name}{" "}
                      <CircleX
                        size="16"
                        color="#FF0000"
                        className="cursor-pointer"
                        onClick={() => handleRemoveFile(idx, file.name)}
                      />
                    </li>
                  ))}
                </ul>
              }
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default DocumentsUpload;
