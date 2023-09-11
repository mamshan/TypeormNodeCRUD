import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm" 

@Entity({ name : "performas"})
class Performa {
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({ type: 'varchar', nullable: false })
  orderNo: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    piNo: string;

    @Column({ type: 'varchar', nullable: false })
    piDate: string;

    @Column({ type: 'varchar', nullable: false })
    bank: string;

    @Column({ type: 'varchar', nullable: true })
    currency: string;

    @Column({ type: 'varchar', nullable: true })
    value: string;

    @Column({ type: 'varchar', nullable: true })
    rate: string;

    @Column({ type: 'varchar', nullable: true })
    deliveryTerms: string;

    @Column({ type: 'varchar', nullable: true })
    paymentTerm: string;

    @Column({ type: 'varchar', nullable: true })
    paymentRef: string;

    @Column({ type: 'varchar', nullable: true })
    paymentDate: string;

    @Column({ type: 'varchar', nullable: true })
    paymentValue: string;

    @Column({ type: 'varchar', nullable: true })
    tolerance: string;

    @Column({ type: 'varchar', nullable: true })
    loanApplied: string;

    @Column({ type: 'varchar', nullable: true })
    loanGranted: string;

    @Column({ type: 'varchar', nullable: true })
    usancePeriod: string;

    @Column({ type: 'varchar', nullable: true })
    expiryDate: string;

    @Column({ type: 'varchar', nullable: true })
    amendments: string;

    @Column({ type: 'varchar', nullable: true })
    remarks: string;

    @Column({ type: 'varchar', nullable: true })
    insuranceDate: string;

    @Column({ type: 'varchar', nullable: true })
    debitNote: string;

    @Column({ type: 'varchar', nullable: true })
    policy: string;

    @Column({ type: 'varchar', nullable: true })
    insuracePaymentDt: string;

    @Column({ type: 'varchar', nullable: true })
    insuraceCancellDt: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToMany(() => PerformaItems, (orderItems) =>(orderItems.performa))
    @JoinTable()
    PerformaItems!: PerformaItems[]
}


@Entity({ name : "performa_items"})
class PerformaItems {
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({ type: 'varchar', length: 255 })
    code: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'integer', nullable: true })
    qty: number;
    
    @Column({ type: 'integer', nullable: true })
    piqty: number;

    @Column({ type: 'float', nullable: true })
    fob: number;

    @ManyToOne(() => Performa, (order) => order.PerformaItems)
    @JoinTable()
    performa!: Performa[]
}

export {Performa, PerformaItems}