
// for send correct status codes
class CustomAPIError extends Error {
  constructor(message) {
    super(message)
  }
}
export default CustomAPIError