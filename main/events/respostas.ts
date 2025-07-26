import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

export default function RespostasEvent(options: {
    name: string,
    correta: boolean,
    type: string,
    prox: string 
}): object {
    @EventData({
        name: options.name, 
        hitbox: {
            width: 32,
            height: 32
        }
    })
    class RespostasEvent extends RpgEvent {
        async onInit() {
            if (options.type === 'v') {
                this.setGraphic('verdadeiro')
            } else {
                this.setGraphic('falso')
            }
        }

        async onAction(player: RpgPlayer) {
            if (options.correta) {
                player.teleport(options.prox)
            }
            else {
                player.teleport('Q_start')
            }
        }
    }
    return RespostasEvent
}

