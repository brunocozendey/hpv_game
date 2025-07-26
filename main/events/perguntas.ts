import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

async function showMultipleTexts(player, texts, options = {}) {
    for (const text of texts) {
        await player.showText(text, options);
    }
}

export default function PerguntasEvent(options: {
    messages: string[],
    name: string,
    alt_text: boolean

}): object {
    @EventData({
        name: options.name, 
        hitbox: {
            width: 16,
            height: 16
        }
    })
    class PerguntasEvent extends RpgEvent {
        async onInit() {
            if (options.alt_text) {
                return
            } else {
                this.setGraphic('block')
            }
        }

        async onAction(player: RpgPlayer) {
            if (options.alt_text){
                await showMultipleTexts(player, options.messages, {
                    talkWith: this
                });
            }
            else {
                await player.showText(options.messages, {
                    talkWith: this
                });
                this.getCurrentMap().removeEvent(this.id)         
            }
        }
    }
    return PerguntasEvent
}

