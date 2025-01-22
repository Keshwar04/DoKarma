import { Helmet } from "react-helmet";
const ReactHelmet = ({ title }: any) => {
  return (
    <Helmet>
      <title>{title + " | " || null} DoKarma</title>
    </Helmet>
  );
};

export default ReactHelmet;
