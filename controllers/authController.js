
import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import {BadRequestError, UnAuthenticatedError} from '../errors/index.js'

const register = async (req, res) => {
  const {name, email, password} = req.body

  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  const userAlreadyExists = await User.findOne({email})
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use')
  }

  const user = await User.create({name, email, password})
  // catch token and send it with user.
  // JSON Web Token is most commonly used to identify an authenticated user!
  const token = user.createJWT()
  res
    .status(StatusCodes.CREATED)
    .json({
      user: {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        location: user.location,
      },
      token,
      location: user.location,
  })
}


const login = async (req, res) => {
  const {email, password} = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  // in order to avoid error we should select ↓ password, because we need this password to check out
  const user = await User.findOne({email}).select('+password')
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  const token = user.createJWT()

  user.password = undefined   // <-- in order to remove password from response

  res
    .status(StatusCodes.OK)
    .json({
      user,
      token,
      location: user.location
    })
}


const updateUser = async (req, res) => {
  const {email, name, lastName, location} = req.body
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOne({_id: req.user.userId})

  user.name = name
  user.email = email
  user.location = location
  user.lastName = lastName

  // this is ↓ instance method that is available on all the documents
  await user.save()

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    user, token, location: user.location
  })
}

export {register, login, updateUser}