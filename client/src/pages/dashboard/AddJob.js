
import {FormRow, Alert, FormRowSelect} from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

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
  } = useAppContext()

  const handleSubmit = e => {
    e.preventDefault()

    if (!position || !company || !jobLocation) {
      displayAlert()
      return
    }

    if (isEditing) {
      editJob()
      return
    }

    createJob()
  }


  const handleJobInput = e => {
    const name = e.target.name
    const value = e.target.value

    handleChange({name, value})
  }


  return (
    <Wrapper>
      <form
        className='form'
      >
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}

        <div className='form-center'>
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />

          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />

          {/* location */}
          <FormRow
            labelText='job location'
            type='text'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />

          {/* job type */}
          <FormRowSelect
            labelText='job type'
            name='jobType'
            value={jobType}
            handleChange={handleJobInput}
            listOfOptions={jobTypeOptions}
          />

          {/* job status */}
          <FormRowSelect
            labelText='status type'
            name='status'
            value={status}
            handleChange={handleJobInput}
            listOfOptions={statusOptions}
          />

          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>

            <button
              className='btn btn-block clear-btn'
              onClick={e => {
                e.preventDefault()
                clearValues()
              }}
              disabled={isLoading}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}