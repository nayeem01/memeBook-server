import { model, Schema } from 'mongoose'
import { comment } from '../types/comments'

const CommentSchema = new Schema<comment>(
  {
    userID: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

CommentSchema.methods.matchID = async function (enteredUserID) {
  return (await enteredUserID) == this.userID
}

export default model<comment>('Comment', CommentSchema)
