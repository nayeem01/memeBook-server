import { model, Schema } from 'mongoose'
import { post } from '../types/posts'

const PostSchema = new Schema<post>(
  {
    // userID: {
    //   type: String,
    //   required: true,
    // },
    meme: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Like',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
)

// PostSchema.methods.matchID = async function (enteredUserID: string) {
//   return (await enteredUserID) == this.userID
// }

export default model<post>('Post', PostSchema)
