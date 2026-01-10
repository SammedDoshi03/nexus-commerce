import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Product } from '../../products/schemas/product.schema';

export type CartDocument = Cart & Document;

@Schema()
export class CartItem {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
    product: Product;

    @Prop({ default: 1 })
    quantity: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema({ timestamps: true })
export class Cart {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: [CartItemSchema], default: [] })
    items: CartItem[];

    @Prop({ default: 0 })
    totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
