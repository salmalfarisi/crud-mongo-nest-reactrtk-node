import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type CrudDocument = HydratedDocument<Crud>;

@Schema({ collection: "crud" })
export class Crud {
  @Prop()
  _id: mongoose.Types.ObjectId;
  
  @Prop()
  title: string;  
  
  @Prop()
  description: string;
  
  @Prop({ type: Date })
  createdAt: Date;
  
  @Prop({ type: Date })
  updatedAt: Date;
  
  @Prop({ type: Boolean })
  is_delete: Boolean;
}

export const CrudSchema = SchemaFactory.createForClass(Crud);