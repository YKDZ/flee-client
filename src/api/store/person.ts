import { defineStore } from "pinia";
import { useMapStore } from "./map";

export const usePersonStore = defineStore('person', {
    state: () => ({
        personX: 0,
        personY: 0
    }),
    actions: {
        moveUp() {
            this.personY -= 1
        },

        moveDown() {
            const map = useMapStore()
            if (this.personY < map.mapH) {
                this.personY += 1
            }
        },

        moveLeft() {
            if (this.personX > 0) {
                this.personX -= 1
            }
        },

        moveRight() {
            const map = useMapStore()
            if (this.personX < map.mapW) {
                this.personX += 1
            }
        }
    }
})