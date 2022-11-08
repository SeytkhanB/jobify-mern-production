
import { StatusCodes } from "http-status-codes"

const errorHandlerMiddleware = (err, req, res, next) => {

  const defaultError = {
    statusCodes: err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  }

  if (err.name === 'ValidationError') {
    defaultError.statusCodes = StatusCodes.BAD_REQUEST
    defaultError.msg = Object.values(err.errors)
      .map(item => item.message)
      .join(', ')
  }
  
  if (err.code && err.code === 11000) {
    defaultError.statusCodes = StatusCodes.BAD_REQUEST
    // email has to be unique ↓
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
  }

  res.status(defaultError.statusCodes).json({ msg: defaultError.msg })
}
export default errorHandlerMiddleware