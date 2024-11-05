import { useData } from "../../DataProvider";
import FactualOutro from "./FactualOutro";
import FictionalOutro from "./FictionalOutro";

/**
 * Outro component conditionally renders the appropriate outro 
 * message based on the categorization of the data retrieved from 
 * the DataProvider context. It determines whether to show a fictional 
 * or factual outro depending on the categorization provided in the 
 * API response.
 *
 * @returns {JSX.Element|null} The rendered Outro component or null if no categorization is available.
 */

const Outro = () => {
  const { apiResponse } = useData();
  
  if(apiResponse){
    if(apiResponse.categorization === "fictional"){
      return <FictionalOutro />
    }
    else if(apiResponse.categorization === "factual"){
      return <FactualOutro />
    }
  }
};

export default Outro;
