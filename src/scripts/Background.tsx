import { getPercent, getRandomInt } from "./Utils";

type ObjectGen = { top: number; left: number; width: number; height: number; };

export {};
export default class BackgroundGame {
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
    private width: number = 0;
    private height: number = 0;
    
    get(): ObjectGen[] {
        var objects: ObjectGen[] = [];
        for (let i = 0; i < 32; i++) {
            objects.push(this.generate(objects));
        }
        return objects;
    }
    private generate(gen: ObjectGen[]): ObjectGen {
        const width = getRandomInt(2, 8);
        const height = getRandomInt(100, getPercent(this.height, 50));
        const top = getRandomInt(0, getPercent(this.height, 90));
        var left = 0;
        var isRepeat = true;
        while (isRepeat) {
            left = getRandomInt(0, this.width);
            var isNowRepeat = false;
            gen.forEach((vals)=>{
                const inArea = this.inArea(vals.left, left);
                if (inArea) isNowRepeat = true;
            });
            isRepeat = isNowRepeat;
        }
        return {
            top,
            left,
            width,
            height
        };
    }
    private inArea(num: number, now: number): boolean {
        const min = num - 10;
        const max = num + 10;
        if ((now > min && now < max) || num == now) return true;
        return false;
    }
    update(array: ObjectGen[], velocity = 10) {
        const newArray = array.map((values)=>{
            const top = (values.top == this.height || values.top > this.height)? values.height * -1: values.top + velocity;
            return {
                ...values,
                top
            };
        });
        return newArray;
    }
}