import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ collection: "users" })
export class Users {
  @Prop()
  _id: mongoose.Types.ObjectId;
  
  @Prop()
  name: string;

  @Prop()
  username: string;  
  
  @Prop()
  email: string;
  
  @Prop()
  password: string;
  
  @Prop({ required: false })
  token: string;
  
  @Prop({ type: Date, required: false })
  tokenexpired: Date;
  
  @Prop({ type: Date })
  createdAt: Date;
  
  @Prop({ type: Date })
  updatedAt: Date;
  
  @Prop({ type: Boolean })
  active: Boolean;
}

export const UserSchema = SchemaFactory.createForClass(Users);