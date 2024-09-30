import { useData } from "../../DataProvider";
import FactualOutro from "./FactualOutro";
import FictionalOutro from "./FictionalOutro";

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
