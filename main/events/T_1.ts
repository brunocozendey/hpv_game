import { RpgEvent, EventData, RpgPlayer, ShapePositioning, Move} from '@rpgjs/server'

@EventData({
    name: 'T-1',
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
        // await player.changeMap(this.map,{ x:3726, y:403})
        // await player.changeMap(this.map,{ x:717, y:790})
        await player.changeMap(this.map,{ x:4760.33, y:1181.33})
        // player.teleport('Q_start')
        // player.teleport('Q_final')
        // player.teleport('HO-2')
    }
}