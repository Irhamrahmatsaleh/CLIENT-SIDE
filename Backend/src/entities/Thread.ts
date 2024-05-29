import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, UpdateDateColumn, CreateDateColumn } from "typeorm"
import { Reply } from "./Reply"
import { Like } from "./Like"
import { User } from "./User"

@Entity({name: 'threads'})
export class Thread {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    content: string

    @Column()
    image: string

    @Column()
    number_of_replies: number

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @Column()
    createdBy: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"  })
    public update_at: Date;

    @Column()
    updatedBy: string

    @OneToMany(() => Reply, reply => reply.thread_id)
    reply : Reply[]

    @OneToMany(() => Like, like => like.thread_id)
    like : Like[]

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'created_by' })
    user : User

}
