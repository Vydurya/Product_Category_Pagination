import { Category } from "src/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    productId: number;

    @Column()
    productName: string;

    @Column()
    qty: number;

    @Column()
    amount: number;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "categoryId", referencedColumnName: "categoryId" })
    categoryId: number;
}