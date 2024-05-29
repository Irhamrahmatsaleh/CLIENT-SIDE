import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm"
import { Reply } from "./Reply"

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({unique: true, nullable: true})
    username: string

    @Column({nullable: true})
    full_name: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({nullable: true})
    photo_profile: string

    @Column({nullable: true})
    bio: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @Column()
    created_by: string

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    @Column()
    updated_by: string

    @OneToMany(() => Reply, reply => reply.user_id)
    reply : Reply[]
}
