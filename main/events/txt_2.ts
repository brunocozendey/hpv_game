import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'TXT-2', 
    hitbox: {
        width: 16,
        height: 16
    }
})
export default class VillagerEvent extends RpgEvent {
    async onAction(player: RpgPlayer) {
        await player.showText('Entre para testar seus conhecimentos sobre o HPV. Esse é seu desafio Final!', {
            talkWith: this
        })
    }
} 