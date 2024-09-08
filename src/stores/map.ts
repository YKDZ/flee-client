import { defineStore } from 'pinia'

export class Node {
    constructor(
        public id: number,
        public x: number,
        public y: number
    ) {}
}

export const useMapStore = defineStore('map', () => {

    // REST API
    const fetchNodes = async (): Promise<Node[]> => {
        return [
            new Node(0, 359, 520),
            new Node(1, 400, 419),
            new Node(2, 399, 352),
            new Node(3, 445, 352),
            new Node(4, 447, 418),
            new Node(5, 677, 416),
            new Node(6, 743, 421),
            new Node(7, 743, 556),
            new Node(8, 746, 683),
            new Node(9, 853, 425),
            new Node(10, 857, 345),
            new Node(11, 932, 346),
            new Node(12, 989, 346),
            new Node(13, 1075, 347),
            new Node(14, 859, 214),
            new Node(15, 853, 557),
            new Node(16, 906, 557),
            new Node(17, 1025, 557),
            new Node(18, 906, 660)
        ]
    }

    // REST API
    const fetchPath = async (): Promise<number[]> => {
        return [16, 15, 7, 6, 5, 4, 3]
    }

    return { fetchNodes, fetchPath }
})