import { defineStore } from "pinia"
import { Language } from "../../assets/lang/zh_CN"

export const useMapStore = defineStore('map', {
    state: () => ({
        isInit: false,
        mapImg: new Image(),
    }),
    getters: {
        mapH(): number {
            return this.mapImg.getBoundingClientRect().height
        },

        mapW(): number {
            return this.mapImg.getBoundingClientRect().width
        }
    },
    actions: {
        init(img: HTMLImageElement) {
            this.mapImg = img
            this.isInit = true
        }
    },
})