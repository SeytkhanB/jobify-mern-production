
export default function FormRow({
    type, name, labelText, value, handleChange
  }) {

  return (
    <div className='form-row'>
      <label 
        htmlFor={name}
        className='form-label'
      >
        {labelText || name}
      </label>

      <input
        type={type}
        value={value}
        name={name}
        className='form-input'
        onChange={handleChange}
      />
    </div>
  )
}