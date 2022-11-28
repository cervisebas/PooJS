import IPlayer from "./Player";

export {};
export default class HUD {
    constructor() {}
    private ctx: CanvasRenderingContext2D = undefined as any;
    setContext(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }
    calcLife(Player: IPlayer) {
        return (Player.life * 200) / 100;
    }
    render(Player: IPlayer) {
        const life = this.calcLife(Player);
        this.ctx.beginPath();
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(16, 16, 200, 24);
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(16, 16, 200, 4);
        this.ctx.fillRect(16, 40, 200, 4);
        this.ctx.fillRect(16, 16, 4, 24);
        this.ctx.fillRect(212, 16, 4, 24);
        this.ctx.fillRect(16, 16, (life <= 0)? 0: life, 24);
        this.ctx.closePath();

        if (life <= 0) {
            alert('Perdiste :(');
            window.close();
            return;
        }
    }
}