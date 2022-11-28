import { customSetInterval } from "./Utils";
import IBackgroundGame from './Background';
import IPlayer from './Player';
import IHUD from './HUD';
import ObjectsOnScreen from "./Objects";

const BackgroundGame = new IBackgroundGame(1280, 720);
const PlayerGame = new IPlayer(1280, 720);
const HUDGame = new IHUD();
const ObjectsGame = new ObjectsOnScreen();

declare global {
    interface Window {
        bpm: number;
        playRender: boolean;
    }
};

export {};
export default class Render {
    constructor() {
        this.render = this.render.bind(this);
    }
    private canvas: HTMLCanvasElement = undefined as any;
    private ctx: CanvasRenderingContext2D = undefined as any;
    private arrayBackground = BackgroundGame.get();
    init() {
        this.canvas = document.getElementById('canvas-game') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        window.bpm = 60;
        window.playRender = true;
        customSetInterval(this.render, 'bpm', 'playRender');
    }
    render() {
        this.ctx.clearRect(0, 0, 1280, 720)
        // Background
        this.arrayBackground.forEach((obj)=>{
            this.ctx.beginPath();
            this.ctx.fillStyle = "#808080";
            this.ctx.fillRect(obj.left, obj.top, obj.width, obj.height);
            this.ctx.closePath();
        });
        this.arrayBackground = BackgroundGame.update(this.arrayBackground, 20);

        // Objects
        ObjectsGame.setContext(this.ctx);
        ObjectsGame.setShoots(PlayerGame.shoots);
        ObjectsGame.render(PlayerGame);
        
        // Player
        const dataPlayer = PlayerGame.get();
        this.ctx.drawImage(dataPlayer.texture, dataPlayer.left, dataPlayer.top, dataPlayer.size.width, dataPlayer.size.height);

        // HUD
        HUDGame.setContext(this.ctx);
        HUDGame.render(PlayerGame);
    }
}