import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity("actors")
export class Actor {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    nconst: string;

    @Column()
    primaryName: string;

    @Column()
    birthYear: number;

    @Column()
    deathYear: number;

    @Column()
    primaryProfession: string;

    @Column()
    knownForTitles: string;

}
