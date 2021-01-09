import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity("actors")
export class Actor {

    @ObjectIdColumn({ name: '_id' })
    id: ObjectID;

    @Column({ name: 'nconst' })
    nid: string;

    @Column({ name: 'primaryName' })
    name: string;

    @Column({ name: 'birthYear' })
    yearOfBirth: number;

    @Column({ name: 'deathYear' })
    yearOfDeath: number;

    @Column({ name: 'primaryProfession' })
    professions: string;

    @Column({ name: 'knownForTitles' })
    knownFor: string;

}
