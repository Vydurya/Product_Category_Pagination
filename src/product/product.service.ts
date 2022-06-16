import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private prodRepository: Repository<Product>,
      ) {}
    
    async addproduct(createproductdto: CreateProductDto){        
        const exists =(await this.prodRepository.count({ where: { productName: createproductdto.productName  } })) != 0 ? true : false;
        if(!exists){
            await this.prodRepository.save(createproductdto);
            return {message : `SUCCESS!! New Product added`};    
        }
        else{
            return { message: `FAILURE!! Product Already Exist`}
        }
    }

    async getAllProducts(ordering: string, offset?: number, limit?: number) {
      const [items, count] = await this.prodRepository.findAndCount({
        relations: ['categoryId'],
        order: { 
          qty: (ordering.toLowerCase()) ==='desc'? 'DESC':'ASC',
          amount: (ordering.toLowerCase()) ==='desc'? 'DESC':'ASC'
        },
        skip: offset,
        take: limit
      });
      if(count === 0){
        return '0 records in product';
      }
      return {
        items,
        count
      }
    }

    async searchForProducts(text: string, ordering: string, offset?: number, limit?: number) {
      const result = this.prodRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.categoryId', 'category')
      .select([
      'product.productName',
      'category.categoryName',
      'product.qty',
      'product.amount',
      ])
      .orderBy('product.qty', (ordering.toLowerCase()) ==='desc'? 'DESC':'ASC')
      .addOrderBy('product.amount', (ordering.toLowerCase()) ==='desc'? 'DESC':'ASC')
      .andWhere('product.productName ilike :searchText', { searchText: `%${text}%` })
      .offset(offset)
      .limit(limit)
      .getMany();

      if((await result).length===0){
        return `No product found with keyword ${text}`;
      }
      return result;
    }

}
