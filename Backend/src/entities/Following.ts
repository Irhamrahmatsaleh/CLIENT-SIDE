import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Thread } from "./Thread"
import { User } from "./User"

@Entity({name: 'following'})
export class Following {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id : number

    @Column()
    thread_id : number

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"  })
    public update_at: Date;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user : User

    @ManyToOne(() => Thread, thread => thread.id)
    @JoinColumn({ name: 'thread_id' })
    thread : Thread
}
