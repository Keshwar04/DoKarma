import { ClipLoader } from "react-spinners";
const FallbackUI = () => {
  return (
    <div className="grid place-items-center h-screen">
      <ClipLoader color="#3064a2" />
      {/* <p>Loading...</p> */}
    </div>
  );
};

export default FallbackUI;
