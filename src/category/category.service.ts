import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createcategoryDto: CreateCategoryDto) {
    const exists =(await this.categoryRepository.count({ where: { categoryName: createcategoryDto.categoryName  } })) != 0 ? true : false;
    if(!exists){
      await this.categoryRepository.save(createcategoryDto);
      return { message : `SUCCESS!! New Category added`};
    }
    else{
      return { message: `FAILURE!! Category Already Exist`}
    }
  }
  
  async findAllRecord() {
    const [list, count] = await this.categoryRepository.findAndCount();
    if(count!=0){
      return list;
    }
    return '0 records in category';
  }
}
