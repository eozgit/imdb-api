import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity("movies")
export class Movie {

    @ObjectIdColumn()
    _id: ObjectID;

    @PrimaryColumn()
    tconst: string;

    @Column()
    titleType: string;

    @Column()
    primaryTitle: string;

    @Column()
    originalTitle: string;

    @Column()
    isAdult: number;

    @Column()
    startYear: number;

    @Column()
    endYear: string;

    @Column()
    runtimeMinutes: number;

    @Column()
    genres: string;

}
