import { RpgEvent, EventData, RpgPlayer, RpgShape, Components, Presets, ShapePositioning, Move, Speed, EventMode } from '@rpgjs/server'

export default function MonstroEvent(options: {
    event: string,
    name: string,
    graphic: string,
    frequency?: number,
    speed?: number,
    life: number,
    pap?: boolean | false,
    vacina?: boolean | false,
    exp?: number | 10,
    hit: number | 20

}): object {
    @EventData({
        name: options.event, 
        hitbox: {
            width: 32,
            height: 32
        }
    })
    class MonstroEvent extends RpgEvent {
        
        getRandomInt(max) {
            return Math.floor(Math.random() * (max)) + 1;
        }

        onInit() {
            const { MAXHP} = Presets 
            this.frequency = options.frequency || 200;
            this.speed = options.speed || 1;
            const life = options.life || 20;
            this.moving=true
            this.player_hit = 20
            
            this.infiniteMoveRoute([Move.tileRandom()])
            this.setGraphic(options.graphic)
            
            this.paramsModifier = {[MAXHP]: {value: -741+life}}
            this.hp = life
            this.setComponentsTop([
                        Components.hpBar({}, options.name)
                    ]
                    )
            this.attachShape({
                height: 200,
                width: 100,
                positioning: ShapePositioning.Center
            })
        }

        onAction(player: RpgPlayer) {
            if (player.getVariable('vacinado')) {
                this.player_hit = this.player_hit*2
            }
            if (!player.getVariable('pap') && options.pap) {
                player.hp -= this.getRandomInt(options.hit);
            }
            this.hp -= this.player_hit;
            if (this.hp <= 0) {
                const map = this.getCurrentMap()
                player.exp += options.exp;
                map.removeEvent(this.id)
            }
        }
        
        onDetectInShape(player: RpgPlayer, shape: RpgShape){
            if (player.type == 'player') {
                this.moveTo(player).subscribe()
                this.breakRoutes(true)
                const dx = this.position.x - player.position.x;
                const dy = this.position.y - player.position.y;
                // Use Euclidean distance to determine if other players are close
                const distanceToPlayer = Math.sqrt(dx * dx + dy * dy)/100;
                if (distanceToPlayer <=2) {player.hp -=this.getRandomInt(options.hit)}
            }
       }
    }
    return MonstroEvent
}