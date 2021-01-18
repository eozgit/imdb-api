import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity("actorsMovies")
export class ActorMovie {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    tconst: string;

    @Column()
    ordering: number;

    @Column()
    nconst: string;

    @Column()
    category: string;

    @Column()
    job: string;

    @Column()
    characters: string;

}
