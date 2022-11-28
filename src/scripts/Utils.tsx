declare global {
    interface Window {
        bpm: number;
        playRender: boolean;
    }
};

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
export function getPercent(value: number, per: number) {
    const result = (per * value) / 100;
    return Math.floor(result);
}
export async function customSetInterval(callback: ()=>any, variableWait: string, variable: string) {
    function wait() { return new Promise((resolve)=>setTimeout(resolve, window[variableWait as any] as any)); }
    //while (window.playRender) {
    while (window[variable as any]) {
        callback();
        await wait();
    }
}