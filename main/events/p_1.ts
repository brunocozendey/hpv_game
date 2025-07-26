import { RpgEvent, EventData, RpgPlayer, ShapePositioning} from '@rpgjs/server'

@EventData({
    name: 'P-1',
    hitbox: {
        width: 16,
        height: 16
    }
})

export default class DoorEvent extends RpgEvent {
    onInit() {
         this.attachShape({
            height: 32,
            width: 32,
            positioning: ShapePositioning.Center
        })
    }
    async onPlayerTouch(player: RpgPlayer) {
        await player.changeMap(this.map,{ x:5519, y:2535})
    }
}