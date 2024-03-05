import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('allTask')
export class AllTask {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ unique: true, nullable: false })
    User_ClientId: string;

    @Column({ nullable: false })
    User_FirstName: string;

    @Column({ nullable: false })
    User_LastName: string;
}
