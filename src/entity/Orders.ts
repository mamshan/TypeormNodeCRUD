import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm" 

@Entity({ name : "Orders"})
class Order {
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({ type: 'varchar', length: 255, unique: true })
    orderNo: string;

    @Column({ type: 'date' })
    orderDate: Date;

    @Column({ type: 'varchar', length: 255 })
    supplier: string;

    @Column({ type: 'varchar', length: 255 })
    buyer: string;
    
    @OneToMany(() => OrderItems, (orderItems) =>(orderItems.orderId))
    @JoinTable()
    OrderItems!: OrderItems[]
}


@Entity({ name : "order_items"})
class OrderItems {
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({ type: 'varchar', length: 255 })
    code: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'integer', nullable: true })
    qty: number;
    
    
    @ManyToOne(() => Order, (order) => order.OrderItems)
    @JoinTable()
    orderId!: Order[]
}

export {Order, OrderItems}