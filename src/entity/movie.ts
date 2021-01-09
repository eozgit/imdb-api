import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity("movies")
export class Movie {

    @ObjectIdColumn({ name: '_id' })
    id: ObjectID;

    @Column({ name: 'tconst' })
    tid: string;

    @Column({ name: 'titleType' })
    type: string;

    @Column({ name: 'primaryTitle' })
    title: string;

    @Column()
    originalTitle: string;

    @Column()
    isAdult: number;

    @Column({ name: 'startYear' })
    year: number;

    @Column()
    endYear: string;

    @Column()
    runtimeMinutes: number;

    @Column()
    genres: string;

}
