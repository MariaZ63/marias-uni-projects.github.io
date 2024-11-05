import { useData } from "../DataProvider";
import { useState } from "react";
import Intro from "./intro/Intro";
import Content from "./Content";
import Loader from "./Loader";

/**
 * MainPart component that serves as the primary content area of the application.
 *
 * It displays a loading indicator while waiting for the API response,
 * an introduction section for user interaction, and the main content
 * once the user has progressed past the intro.
 *
 * @returns {JSX.Element} The rendered MainPart component.
 */
const MainPart = () => {
  const { apiResponse } = useData();
  const [content, setContent] = useState(false);

  return (
    <>
      {!apiResponse ? (
        <Loader />
      ) : (
        <>
          <Intro setContent={setContent} />
          {content && <Content />}
        </>
      )}
    </>
  );
};

export default MainPart;
