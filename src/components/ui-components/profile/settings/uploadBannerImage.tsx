import { staticText } from "@/helper/staticText";
import styles from "@/css/profile.module.css";
import { Label } from "@/components/ui/label";
import { useDropzone, Accept } from "react-dropzone";
import { useCallback, useState } from "react";
import { CloudUpload } from "lucide-react";
const UploadBannerImage = () => {
  const [files, setFiles] = useState<any>([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    // Process the dropped files
    setFiles(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const acceptTypes: Accept = {
    "image/*": [],
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptTypes,
  });
  return (
    <>
      <div className={styles.amountContainer}>
        <span className={styles.rupee}>₹</span>
        <span className={styles.txt}>&nbsp; {staticText.amountPerc}</span>
      </div>
      <div className="flex my-3">
        <div className="w-[28%]">
          <Label>Banner Image</Label>
        </div>
        <div className={styles.bannerContainer}>
          <div className="w-[110px]">
            {files.map((file: any) => (
              <div
                key={file.name}
                style={{ backgroundImage: `url(${file.preview})` }}
                className="w-[110px] h-[100px] bg-cover"
              ></div>
            ))}
          </div>
          <div
            {...getRootProps()}
            className={`w-[75%] md:w-[68%] lg:w-[60%]
                                 ${styles.dropzone}`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the images here ...</p>
            ) : (
              <>
                <div className={styles.hashCircle}>
                  <CloudUpload size="20" />
                </div>
                <p
                  className={styles.uploadTxt}
                  title="Click here to upload or drag here your image"
                >
                  <span>Click here to upload</span>
                  <span> or drag here your image</span>
                </p>
                <p className={styles.sizeTxt} title={staticText.imgSize}>
                  {staticText.imgSize}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadBannerImage;
