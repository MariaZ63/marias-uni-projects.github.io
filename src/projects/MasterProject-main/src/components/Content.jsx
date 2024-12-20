import TaleOfTime from "./taleOfTime/TaleOfTime";
import ReadAroundTheWorld from "./readAroundTheWorld/ReadAroundTheWorld";
import BackToTheFuture from "./backToTheFuture/BackToTheFuture";
import PublishingPatterns from "./publishingPatterns/PublishingPatterns";
import Outro from "./outro/Outro";
import Navigation from "./Navigation";
import { useState } from "react";
import QuestionFeature from "./question/QuestionFeature";

// Mapping component names to actual components
const componentMapping = {
  TaleOfTime,
  ReadAroundTheWorld,
  BackToTheFuture,
  PublishingPatterns,
};

/**
 * Content component that manages the display of various 
 * interactive components based on user selection.
 *
 * It maintains the state of selected components and 
 * handles navigation between them.
 *
 * @returns {JSX.Element} The rendered Content component, which includes 
 * navigation and dynamically loaded components.
 */
const Content = () => {
  const [config, setConfig] = useState([]);
  const [showQuestion, setShowQuestion] = useState(false);

  return (
    <>
      <Navigation index={0} config={config} setConfig={setConfig} setShowQuestion={setShowQuestion}/>
      {config.map((componentName, index) => {
        const Component = componentMapping[componentName];
        
        return (
          <div key={index}>
            <Component />
            <Navigation
              index={index + 1}
              config={config}
              setConfig={setConfig}
              setShowQuestion={setShowQuestion}
            />
          </div>
        );
      })}
      {showQuestion && <QuestionFeature />}
    </>
  );
};

export default Content;
