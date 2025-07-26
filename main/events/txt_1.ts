import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'TXT-1', 
    hitbox: {
        width: 16,
        height: 16
    }
})
export default class VillagerEvent extends RpgEvent {
    async onAction(player: RpgPlayer) {
        await player.showText('Você está avançando na sua caminhada. Passe pelo labirinto e converse com os personages que encontrar, mas cuidado com os vírus do HPV pois você está ainda desprotedid@.', {
            talkWith: this
        })
    }
} 