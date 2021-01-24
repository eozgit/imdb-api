import { getRepositoryToken } from '@nestjs/typeorm';
import { cloneDeep } from 'lodash';
import { ObjectId } from 'mongodb';
import { Rating } from './entities/rating.entity';

const mockRating = {
    _id: '5ff8c968ed3c3d8560f7b12c',
    tconst: 'tt0000005',
    averageRating: 6.2,
    numVotes: 2188
}

export const getMockRating = (e2e: boolean = false) => {
    const rating = cloneDeep(mockRating);

    if (!e2e) {
        rating._id = new ObjectId(rating._id);
    }

    return rating;
};

export const getMockUpdatedRating = (e2e: boolean = false) => {
    const rating = {
        ...cloneDeep(mockRating),
        averageRating: 6.3,
        numVotes: 2189
    };

    if (!e2e) {
        rating._id = new ObjectId(rating._id);
    }

    return rating;
};

export const MockRatingRepository = {
    findOne: jest.fn(() => getMockRating()),
    save: jest.fn(() => ([getMockUpdatedRating()]))
};

export const MockRatingRepositoryProvider = {
    provide: getRepositoryToken(Rating),
    useValue: MockRatingRepository,
};

describe('Ratings mocks', () => {
    it('should provide a mock rating', () => {
        expect(getMockRating(true)).toEqual(mockRating);
    });
});
