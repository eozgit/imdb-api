import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity("ratings")
export class Rating {

    @ObjectIdColumn({ name: '_id' })
    id: ObjectID;

    @Column({ name: 'tconst' })
    tid: string;

    @Column({ name: 'averageRating' })
    rating: number;

    @Column({ name: 'numVotes' })
    voteCount: number;

}
