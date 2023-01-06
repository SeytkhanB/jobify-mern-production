import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import { useState, useMemo } from "react";
import Wrapper from "../assets/wrappers/SearchContainer";

export default function SearchContainer() {
  const [localSearch, setLocalSearch] = useState("");
  const {
    isLoading,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    const { name, value } = e.target;
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  const debounce = () => {
    let timeoutID;
    return (e) => {
      const { name, value } = e.target;
      setLocalSearch(value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name, value });
      }, 1000);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search by position */}
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />

          {/* search by status */}
          <FormRowSelect
            labelText="job status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            listOfOptions={["All", ...statusOptions]}
          />

          {/* search by job type */}
          <FormRowSelect
            labelText="job type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            listOfOptions={["All", ...jobTypeOptions]}
          />

          {/* search by sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            listOfOptions={sortOptions}
          />

          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
