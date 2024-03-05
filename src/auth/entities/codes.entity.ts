import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('confirmCodes')
export class ConfirmCodes {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ nullable: false })
    PhoneNumber: string;

    @Column({ nullable: false })
    Code: number;

    @Column({ nullable: false, default: false })
    IsUse: boolean;
}
