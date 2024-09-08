import { defineStore } from 'pinia'

export class Person {
    constructor(
        public id: number,
        public originNodeId: number,
        public theta: number,
        public r: number
    ) { }
}

export const usePersonStore = defineStore('person', () => {
    const selfId = 4

    // REST API
    const fetchPersons = async (): Promise<Person[]> => {
        return [
            new Person(2, 5, 0, 0),
            new Person(3, 6, 0, 0),
            new Person(4, 7, 0, 0),
            new Person(5, 9, 0.5 * Math.PI, -30),
            new Person(6, 16, 0, 40),
        ]
    }

    return { selfId, fetchPersons }
})