import styles from "../../css/newCampaign.module.css";
import { Label } from "../ui/label";
const FieldsHead = ({ title, subTxt }: any) => {
  return (
    <div className={styles.slidersHead}>
      <h1>{title}</h1>
      <Label className="opacity-75">{subTxt}</Label>
      <p className={`mb-8 ${styles.subTxt}`}>{}</p>
    </div>
  );
};

export default FieldsHead;
