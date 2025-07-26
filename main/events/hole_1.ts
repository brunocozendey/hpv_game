import { RpgEvent, EventData, RpgPlayer, ShapePositioning} from '@rpgjs/server'

@EventData({
    name: 'HO-1', 
    hitbox: {
        width: 16,
        height: 16
    }
})

export default class HoleEvent extends RpgEvent {
   onInit() {
            this.attachShape({
               height: 32,
               width: 32,
               positioning: ShapePositioning.Center
           })
       }
       async onPlayerTouch(player: RpgPlayer) {
        await player.changeMap(this.map,{ x:3726, y:403})      
       }
} 