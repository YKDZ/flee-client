import { defineStore } from 'pinia'

export class Person {
    constructor(
        public id: number,
        public x: number,
        public y: number
    ) { }
}

export const usePersonStore = defineStore('person', () => {
    const selfId = 4

    // REST API
    const fetchPersons = async (): Promise<Person[]> => {
        return [
            new Person(4, 743, 556),
            new Person(9, 853, 425),
            new Person(10, 857, 345),
            new Person(11, 932, 346),
        ]
    }

    return { selfId, fetchPersons }
})