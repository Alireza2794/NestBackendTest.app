import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ unique: true, nullable: false })
    ClientId: string;

    @Column({ nullable: false })
    FirstName: string;

    @Column({ nullable: false })
    LastName: string;

    @Column({ nullable: false })
    Email: string;

    @Column({ unique: true, nullable: false })
    PhoneNumber: string;

    @Column({ select: false, nullable: false })
    Password: string;

    @Column({ nullable: true })
    ProfileImageFile: string;
}
