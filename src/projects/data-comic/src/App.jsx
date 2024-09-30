import Header from "./components/Header";
import { DataProvider } from "./DataProvider";
import { useState } from "react";
import MainPart from "./components/MainPart";

const App = () => {
  const [selectedDataset, setSelectedDataset] = useState(null); // Initially, no dataset selected
  const [isDatasetSelected, setIsDatasetSelected] = useState(false); // To disable or hide the menu after selection

  const handleDatasetChange = (e) => {
    setSelectedDataset(e.target.value); // Set the chosen dataset
    setIsDatasetSelected(true); // Lock the selection, preventing changes
  };

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        {/* Dataset selection menu, hidden or disabled after selection */}
        {!isDatasetSelected && (
          <>
            <label htmlFor="dataset">Select Dataset: </label>
            <select
              className="mx-2"
              id="dataset"
              value={selectedDataset || ""}
              onChange={handleDatasetChange}
            >
              <option value="" disabled>
                -- Select a Dataset --
              </option>
              <option value="dataset0">Dataset 0</option>
              <option value="dataset1">Dataset 1</option>
              <option value="dataset2">Dataset 2</option>
              <option value="dataset3">Dataset 3</option>
              <option value="dataset4">Dataset 4</option>
              <option value="dataset5">Dataset 5</option>
              <option value="dataset6">Dataset 6</option>
            </select>
          </>
        )}
      </div>

      {/* Render content only after a dataset is selected */}
      {isDatasetSelected && selectedDataset && (
        <DataProvider selectedDataset={selectedDataset}>
          <MainPart />
        </DataProvider>
      )}
    </>
  );
};

export default App;
