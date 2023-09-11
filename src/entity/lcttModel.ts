import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('lc_tr')
  class lc_tr  {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', unique: true })
    lc_tr_no: string;
  
    @Column({ type: 'varchar' })
    code: string;
  
    @Column({ type: 'varchar' })
    name: string;
  
    @Column({ type: 'date' })
    sdate: Date;
  
    @Column({ type: 'date' })
    sdate1: Date;

    @Column({ type: 'varchar' })
    cur: string;
  
    @Column({ type: 'varchar' })
    rate: string;
  
    @Column({ type: 'varchar', nullable: true })
    amount: string | null;
  
    @Column({ type: 'varchar', nullable: true })
    lkr_val: string | null;
  
    @Column({ type: 'varchar', nullable: true })
    lo_due_date: string | null;
  
    @Column({ type: 'date', nullable: true })
    exp_date: Date | null;
  
    @Column({ type: 'date', nullable: true })
    exp_date2: Date | null;
  
    @Column({ type: 'varchar', nullable: true })
    our_ref: string | null;
  
    @Column({ type: 'varchar', nullable: true })
    supp: string | null;
  
    @Column({ type: 'varchar', nullable: true })
    flag: string | null;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  }
  
  export { lc_tr };