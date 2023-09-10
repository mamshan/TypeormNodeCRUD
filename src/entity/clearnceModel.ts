import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Clearnces')
class Clearnce {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  shipmentNo: string;

  @Column({ type: 'date', nullable: false })
  cleanceDate: Date;

  @Column({ type: 'varchar', nullable: false })
  clearValue: string;

  @Column({ type: 'varchar', nullable: false })
  bank: string;

  @Column({ type: 'date', nullable: true })
  loanDate: Date;

  @Column({ type: 'varchar', nullable: true })
  remarks: string;

  @Column({ type: 'date', nullable: false })
  shipmentCleardt: Date;
}

export { Clearnce };