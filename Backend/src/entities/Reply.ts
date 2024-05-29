import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Thread } from "./Thread"
import { User } from "./User"

@Entity({name: 'replies'})
export class Reply {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id : number
    
    @Column()
    thread_id : number

    @Column()
    image: string

    @Column({nullable: true})
    content: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @Column()
    created_by: string

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    @Column()
    updated_by: string

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user : User

    @ManyToOne(() => Thread, thread => thread.id)
    @JoinColumn({ name: 'thread_id' })
    thread : Thread
}
