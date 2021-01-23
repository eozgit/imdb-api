import { getRepositoryToken } from '@nestjs/typeorm';
import { cloneDeep } from 'lodash';
import { ObjectId } from 'mongodb';
import { Actor } from './entities/actor.entity';

const mockActor = {
    _id: '5ff8cdd7e65563629d215c65',
    nconst: 'nm0000011',
    primaryName: 'Gary Cooper',
    birthYear: 1901,
    deathYear: 1961,
    primaryProfession: 'actor,soundtrack,producer',
    knownForTitles: 'tt0027996,tt0035896,tt0044706,tt0034167'
};

export const getMockActor = (e2e: boolean = false) => {
    const actor = cloneDeep(mockActor);

    if (!e2e) {
        actor._id = new ObjectId(actor._id);
    }

    return actor;
};

export const getMockUpdatedActor = (e2e: boolean = false) => {
    const actor = {
        ...cloneDeep(mockActor),
        runtimeMinutes: 2
    };

    if (!e2e) {
        actor._id = new ObjectId(actor._id);
    }

    return actor;
};

export const MockActorRepository = {
    insertOne: jest.fn(() => getMockActor()),
    find: jest.fn(() => [getMockActor()]),
    findOneOrFail: jest.fn(() => getMockActor()),
    save: jest.fn(() => ([getMockUpdatedActor()])),
    deleteOne: jest.fn(() => null)
};

export const MockActorRepositoryProvider = {
    provide: getRepositoryToken(Actor),
    useValue: MockActorRepository,
};

describe('Movies mocks', () => {
    it('should provide a mock movie', () => {
        expect(getMockActor(true)).toEqual(mockActor);
    });
});
