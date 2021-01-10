import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity("ratings")
export class Rating {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    tconst: string;

    @Column()
    averageRating: number;

    @Column()
    numVotes: number;

}
