import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

async function showMultipleTexts(player, texts, options = {}) {
    for (const text of texts) {
        await player.showText(text, options);
    }
}

export default function NpcsEvent(options: {
    messages: string[],
    name: string
}): object {
    @EventData({
        name: options.name, 
        hitbox: {
            width: 32,
            height: 16
        }
    })
    class NpcsEvent extends RpgEvent {
        onInit() {
            this.setGraphic(options.name)
        }
    
        async onAction(player: RpgPlayer) {
            await showMultipleTexts(player, options.messages, {
                    talkWith: this
                });
            if (!player.getVariable(options.name)){
                player.exp += 5
            }
            player.setVariable(options.name,true)
            if (options.name === 'NPC-24') {
                player.teleport('final')
                player.setVariable('perguntas',true)
                
            }
            
        }
    }
    return NpcsEvent
}

