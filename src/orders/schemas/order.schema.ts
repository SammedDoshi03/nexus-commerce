import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Product } from '../../products/schemas/product.schema';

export type OrderDocument = Order & Document;

@Schema()
export class OrderItem {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
    product: Product;

    @Prop()
    quantity: number;

    @Prop()
    price: number;
}
export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: [OrderItemSchema] })
    items: OrderItem[];

    @Prop()
    totalAmount: number;

    @Prop({ default: 'pending' })
    status: string;

    @Prop()
    paymentId?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
