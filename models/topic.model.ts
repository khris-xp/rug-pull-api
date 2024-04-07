import mongoose from 'mongoose';
import { TopicType } from '../types/topic.type';
const { Schema } = mongoose;

const topicSchema = new Schema<TopicType>(
  {
    title: { type: String, trim: true, max: 128, required: true },
    description: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.model<TopicType>('Topic', topicSchema);

export default Topic;
