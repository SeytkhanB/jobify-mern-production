import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useNavigate } from "react-router-dom";

export default function AddJob() {
  const {
    company,
    position,
    showAlert,
    displayAlert,
    isEditing,
    jobLocation,
    jobTypeOptions,
    jobType,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    isLoading,
    editJob,
  } = useAppContext();
  const navigate = useNavigate();

  const redirect = () => {
    setTimeout(() => {
      navigate("/all-jobs");
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }

    if (isEditing) {
      editJob();
      redirect();
      return;
    }

    createJob();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />

          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />

          {/* location */}
          <FormRow
            labelText="job location"
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />

          {/* job type */}
          <FormRowSelect
            labelText="job type"
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            listOfOptions={jobTypeOptions}
          />

          {/* job status */}
          <FormRowSelect
            labelText="status type"
            name="status"
            value={status}
            handleChange={handleJobInput}
            listOfOptions={statusOptions}
          />

          <div className="btn-container">
            {isEditing ? (
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-block submit-btn"
                onClick={handleSubmit}
              >
                modify
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-block submit-btn"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                submit
              </button>
            )}

            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
              disabled={isLoading}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}
