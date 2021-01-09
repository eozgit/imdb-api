import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity("actorsMovies")
export class ActorMovie {

    @ObjectIdColumn({ name: '_id' })
    id: ObjectID;

    @Column({ name: 'tconst' })
    tid: string;

    @Column()
    ordering: number;

    @Column({ name: 'nconst' })
    nid: string;

    @Column()
    category: string;

    @Column()
    job: string;

    @Column()
    characters: string;

}
