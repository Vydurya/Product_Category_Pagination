import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaginationParams } from 'src/paginationparams.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

// Example : http://localhost:3000/product?limit=5&offset=5&ordering=desc

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() prod: CreateProductDto){
    return this.productService.addproduct(prod);
  }

  @Get('getallproductsbyfilter')
  async getPosts(
    @Query('search') search: string,
    @Query('ordering') ordering: string,
    @Query() { offset, limit }: PaginationParams
  ) {
    if (search) {
      return this.productService.searchForProducts(search, ordering ,offset, limit);
    }
    return this.productService.getAllProducts(ordering, offset, limit);
  }
}
