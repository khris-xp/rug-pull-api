import mongoose from 'mongoose';
import { TableType } from '../types/table.type';
const { Schema } = mongoose;

const tableSchema = new Schema<TableType>(
  {
    number: { type: String, trim: true, max: 128, required: true },
    capacity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Table = mongoose.model<TableType>('Table', tableSchema);

export default Table;
