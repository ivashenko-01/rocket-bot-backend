import mongoose from 'mongoose';

const PostSiteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserSite',
      required: true,
    },
    imageUrl: String,
    dateTime: {
      type: String,
      default: "Не указали",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('PostSite', PostSiteSchema);