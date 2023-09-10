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
class Shipment {
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column()
  piNo: string;

  @Column()
  shipmentNo: string;

  @Column()
  invoiceNo: string;

  @Column()
  invoiceDate: string;

  @Column()
  invoiceValue: string;

  @Column()
  blNo: string;

  @Column()
  blDate: string;

  @Column()
  maturityDate: string;

  @Column()
  arrivalDate: string;

  @Column()
  bankDocumentType: string;

  @Column()
  bankDocumentDate: string;

  @Column()
  bankorgiginalDate: string;

  @Column()
  bankcancelledDate: string;

  @Column()
  bankexchangeRate: string;

  @Column()
  bankloanApplied: string;

  @Column()
  bankloanGranted: string;

  @Column()
  bankRemarks: string;

  @Column()
  freightDate: string;

  @Column()
  freightAgent: string;

  @Column()
  freightCharges: string;

  @Column()
  freightLocalCharges: string;

  @Column()
  freightPaidBy: string;

  @Column()
  freightContainer: string;

  @Column()
  freightBlno: string;

  @Column()
  freightRefundable: string;

  @Column()
  freightFclDate: string;

  @Column()
  freightSendCollect: string;

  @Column()
  freightRefund: string;

  @Column()
  freightChequ: string;
    
    @OneToMany(() => ShipmentItems, (orderItems) =>(orderItems.shipmentId))
    @JoinTable()
    ShipmentItems!: ShipmentItems[]
}


@Entity({ name : "performa_items"})
class ShipmentItems {
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

    @ManyToOne(() => Shipment, (order) => order.ShipmentItems)
    @JoinTable()
    shipmentId!: Shipment[]
}

export {Shipment, ShipmentItems}