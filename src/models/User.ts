import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import endpoint from '../config/endpoints.config'
import { user } from '../types/user'

const UserSchema = new Schema<user>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Please add a name'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 4,
      select: false,
    },
    picture: {
      type: String,
      default: '../static/no-photo.jpeg',
    },
    resetPasswordToken: String,
    restPasswordExpire: Date,
  },
  { timestamps: true }
)

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, endpoint.JWT_KEY, {
    expiresIn: endpoint.JWT_EXPIRE,
  })
}

export default model<user>('User', UserSchema)
