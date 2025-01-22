import { staticText } from "@/helper/staticText";

const FileSizeType = () => {
  return (
    <div className="flex gap-5 text-xs">
      <p>
        Size:
        <span className="text-gray-500">&nbsp;{staticText.fileSize}</span>
      </p>
      <p>
        Type:
        <span className="text-gray-500">&nbsp;{staticText.fileType}</span>
      </p>
    </div>
  );
};

export default FileSizeType;
