import { useData } from "../DataProvider";
import { useState } from "react";
import Intro from "./intro/Intro";
import Content from "./Content";
import Loader from "./Loader";

const MainPart = () => {
  const { apiResponse } = useData();
  const [content, setContent] = useState(false);

  return (
    <>
      {!apiResponse ? (
        <Loader />
      ) : (
        <>
          {console.log("Rendering Intro")} {/* Add this to debug */}
          <Intro setContent={setContent} />
          {content && <Content />}
        </>
      )}
    </>
  );
};

export default MainPart;
