import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getCart(@Request() req: any) {
    return this.cartService.getCart(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  addToCart(
    @Request() req: any,
    @Body() body: { productId: string; quantity: number },
  ) {
    return this.cartService.addToCart(
      req.user.userId,
      body.productId,
      body.quantity,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':productId')
  removeFromCart(@Request() req: any, @Param('productId') productId: string) {
    return this.cartService.removeFromCart(req.user.userId, productId);
  }
}
