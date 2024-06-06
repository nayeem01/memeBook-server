import { model, Schema } from 'mongoose'
import { comment } from '../types/comments'

const CommentSchema = new Schema<comment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

CommentSchema.methods.matchID = async function (
  enteredUserID: Schema.Types.ObjectId
) {
  return (await enteredUserID) == this.user
}

export default model<comment>('Comment', CommentSchema)
