import { RpgEvent, EventData, Direction, RpgPlayer, RpgShape, Components, Presets, ShapePositioning, Move, Speed } from '@rpgjs/server'

@EventData({
    name: 'M-3',
    hitbox: {
        width: 32,
        height: 32
    }
})

export default class MonsterEvent extends RpgEvent {
    onInit() {
        const { MAXHP} = Presets 
        const name = "Corrimento";
        const life = 20
        this.paramsModifier = {[MAXHP]: {value: -741+life}}
        this.setGraphic('corrimento_2')
        this.hp = life
        this.setComponentsTop([
                    Components.hpBar({}, name)
                ]
                )
        this.attachShape({
            height: 200,
            width: 100,
            positioning: ShapePositioning.Center
        })
        this.speed = Speed.Slow
        this.moving=true
        this.infiniteMoveRoute([Move.tileRandom()])
    }   
    onAction(player: RpgPlayer) {
        player.hp -=5
        this.hp -= 10
        if (this.hp <= 0) {
            const map = this.getCurrentMap()
            map.removeEvent(this.id)
        }
    }
    
    onDetectInShape(player: RpgPlayer, shape: RpgShape){
        this.moveTo(player).subscribe()
        this.breakRoutes(true)
        const dx = this.position.x - player.position.x;
        const dy = this.position.y - player.position.y;
        // Use Euclidean distance to determine if other players are close
        const distanceToPlayer = Math.sqrt(dx * dx + dy * dy)/100;
        if (distanceToPlayer <=2) {player.hp -=5}
   }
}