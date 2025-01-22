import { toast } from "@/hooks/use-toast";

export const checkFileSize = (file: any, max: number) => {
  const maxSize = max * 1024 * 1024;
  return file.size > maxSize ? null : file;
};

export const calculateLines = (textRef: any) => {
  if (textRef.current) {
    const element = textRef.current;
    const computedStyle = window.getComputedStyle(element);
    const lineHeight = parseFloat(computedStyle.lineHeight);
    const count = Math.ceil(element.clientHeight / lineHeight);
    return count;
  }
  return 0;
};

export const handlingFileInput = (e: any, file: any) => {
  const isFileExist = checkFileSize(file, 5);
  if (!isFileExist) {
    toast({
      title: "File size must be less than 5MB",
      status: "error",
    });
    e.target.value = "";
  }
};

export const calculateTips = (amount: any, tip: any) => {
  const amt = Number(amount?.replace(",", ""));
  const result = Math.round((amt * tip) / 100);
  return result;
};

export const calculatePercentage = (current: any, overall: any) => {
  const converted = Number(overall?.replace(",", ""));
  const calculate = (current / converted) * 100;
  const result = Number.isInteger(calculate) ? calculate : calculate.toFixed(2);
  return result;
};

export const mandatoryFormValidation = (FormData: any, label: any) => {
  const isSuit = FormData.suit ? ["suit", "suitDetails"] : [];
  const isFcra = FormData.fcra ? ["fcra", "fcraNo", "fcra_annual_return"] : [];
  const isFema = FormData.fema ? ["fema", "caseDetails"] : [];
  const keys = [...isSuit, ...isFcra, ...isFema, ...label];
  return keys.every((key) => FormData?.[key]);
};
