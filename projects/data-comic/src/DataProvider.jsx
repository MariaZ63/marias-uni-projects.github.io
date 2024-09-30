import { createContext, useContext, useEffect, useState } from "react";
import * as d3 from "d3";
import dataset0 from "./assets/data/P0_completedData.csv";
import dataset1 from "./assets/data/P1_completedData.csv";
import dataset2 from "./assets/data/P2_completedData.csv";
import dataset3 from "./assets/data/P3_completedData.csv";
import dataset4 from "./assets/data/P4_completedData.csv";
import dataset5 from "./assets/data/P5_completedData.csv";
import dataset6 from "./assets/data/P6_completedData.csv";

import { apiRequest } from "./utils/apiRequest";

const datasets = {
  dataset0,
  dataset1,
  dataset2,
  dataset3,
  dataset4, 
  dataset5, 
  dataset6
};

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children, selectedDataset }) => {
  const [data, setData] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await d3.csv(datasets[selectedDataset]);
        setData(response);

        const message = `Please provide answers to the following bullet points in JSON format based on the attached reader data, so that I can process it in my application. Please keep all the answers brief. Utilize the introductory sentences. Relate to your own experiences.
                        - assessment of the user's reading habits and preferences (2 sentences): "After taking a first look at your reading data, I got the impression that ..."
                        - categorization: factual or fictional (one word, binary decision between fictional or factual, no other answers possible!). This category describes if the reader prefers non-fiction or fictional books.
                        - comment on the gender ratio of the read books (2-3 sentences): "Now, let's take a look at some patterns in the books you read. Regarding the gender ratio of the authors you read, I noticed that ..."
                        - personalized recommendation for a book the reader would like + justification (3 sentences): "If you think about adding one more book to your TBR, I would definitely recommend ..."
                        - tip for tackling the TBR stack (3 sentences): "In my experience, ..."
                        - comment on the distribution of publication years (2 sentences): "When I analyzed the publication years of your books, I noticed ..."
                        - recommendation for a book from a less read time period + justification (3 sentences): "If you want to venture into a time period you've read less so far, I'd recommend you a favorite of mine: ..."
                        - fictional farewell to the reader (2-3 sentences), with summary: "Thank you for visiting us. I enjoyed ..."
                        - factual, non-fiction farewell to the reader (2-3 sentences), with summary
                        Please use the following format to answer. Do NOT wrap the json codes in JSON markers: 
                        {
                          "assessment": "",
                          "categorization": "",
                          "gender_ratio": "",
                          "personalized_recommendation": "",
                          "TBR_tip": "",
                          "distribution_of_years": "",
                          "time_period_recommendation": "", 
                          "fictional_farewell": "", 
                          "factual_farewell": ""
                        }`;


        const result = await apiRequest(message, response);
        console.log(result);
        const res = JSON.parse(result);
        setApiResponse(res);

        // Use sample API output instead
        const sampleAPIOutPut = {
          assessment: "After taking a first look at your reading data, I got the impression that you have a strong preference for engaging narratives, often leaning towards contemporary and young adult fiction. It reminds me of times when I couldn't put down a good series, feeling completely immersed in the worlds authors create.",
          categorization: "fictional",
          gender_ratio: "Now, let's take a look at some patterns in the books you read. Regarding the gender ratio of the authors you read, I noticed that a significant portion of your reading comes from female authors. It’s great to see the varied perspectives they bring to stories!",
          personalized_recommendation: "If you think about adding one more book to your TBR, I would definitely recommend 'The Night Circus' by Erin Morgenstern. It’s such a beautifully written tale that combines magic with intricate storytelling, much like the fantasy elements you seem to enjoy. Plus, you'll love getting lost in its mesmerizing world!",
          TBR_tip: "In my experience, tackling the TBR stack can feel overwhelming at times, but I find that setting aside specific 'reading hours' within the week helps. Also, mixing up genres can keep things fresh and exciting—like alternating between a gripping fiction and a thought-provoking non-fiction. Definitely don’t be afraid to start with shorter reads to build momentum!",
          distribution_of_years: "When I analyzed the publication years of your books, I noticed a strong focus on contemporary titles, especially from the last decade. It’s fascinating how stories from this time often reflect the current societal issues we're facing.",
        
          time_period_recommendation: "If you want to venture into another time period, I'd recommend a favorite of mine: 'The Book Thief' by Markus Zusak. Set in World War II, it’s narrated by Death and beautifully captures the struggles of humanity during a dark time. Diving into historical fiction like this can really complement your current preferences!"
        };

        //setApiResponse(sampleAPIOutPut);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, apiResponse, error }}>
      {children}
    </DataContext.Provider>
  );
};
