import { SORT_OPTIONS } from "../utils/sortBooksBySortOption";
import { useState } from 'react';

/**
 * Component for rendering star ratings and handling user interaction to update ratings.
 * @param {object} props - Component props.
 * @param {Function} props.onPanelClick - A function to call when submit or reset button is clicked.It takes two parameters: searchInput = { searchOption:"title", searchText:""} and searchOption.
 * @returns {JSX.Element} - InputPanel component.
*/
const InputPanel = ({ onPanelClick }) => {

    /**
     * States to check the user inputs in the input panel
     */
    const [searchOption, setSearchOption] = useState("title");
    const [searchText, setSearchText] = useState("");
    const [sortOption, setSortOption] = useState(SORT_OPTIONS.NO_SORTING);

    /**
     * Handles click event on the submit button by sending
     *  the user inputs back to parent component
     */
    const handlePanelSubmit = () => {
        onPanelClick({ searchOption, searchText }, sortOption);
    }

    /**
     *  Handles click event on the reset button by changing the input states to default values
     * and sending them to parent component
     */
    const handlePanelReset = () => {
        setSearchOption("title");
        setSearchText("");
        setSortOption(SORT_OPTIONS.NO_SORTING)
        onPanelClick({ searchOption: "title", searchText: "" }, SORT_OPTIONS.NO_SORTING);
    }

    return (
        <div className="form-row">
            <div className="form-group col-sm-4">
                <input type="text" className="form-control" id="inputSearchText" placeholder="Search Text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </div>
            <div className="form-group col-sm-3">
                <select id="inputSearchOption" className="form-control" value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="isbn">ISBN</option>
                </select>
            </div>
            <div className="form-group col-sm-3">
                <select id="sortOption" className="form-control" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value={SORT_OPTIONS.NO_SORTING}>No Sorting</option>
                    <option value={SORT_OPTIONS.TITLE_ASCENDING}>Title Ascending</option>
                    <option value={SORT_OPTIONS.TITLE_DESCENDING}>Title Descending</option>
                    <option value={SORT_OPTIONS.AUTHOR_ASCENDING}>Author Ascending</option>
                    <option value={SORT_OPTIONS.AUTHOR_DESCENDING}>Author Descending</option>
                    <option value={SORT_OPTIONS.STARS_ASCENDING}>Stars Ascending</option>
                    <option value={SORT_OPTIONS.STARS_DESCENDING}>Stars Descending</option>
                </select>
            </div>
            <div className="form-group col-6 col-sm-1">
                <button id="input-panel-submit" className="btn btn-primary btn-block" onClick={handlePanelSubmit}><i className="fa fa-check"></i></button>
            </div>
            <div className="form-group col-6 col-sm-1">
                <button id="input-panel-reset" className="btn btn-secondary btn-block" onClick={handlePanelReset}>X</button>
            </div>
        </div>
    );
}

export default InputPanel;