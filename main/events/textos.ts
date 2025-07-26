import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

async function showMultipleTexts(player, texts, options = {}) {
    for (const text of texts) {
        await player.showText(text, options);
    }
}

export default function TextosEvent(options: {
    messages: string[],
    name: string
}): object {
    @EventData({
        name: options.name, 
        hitbox: {
            width: 16,
            height: 16
        }
    })
    class TextosEvent extends RpgEvent {
        async onAction(player: RpgPlayer) {
            await showMultipleTexts(player, options.messages, {
                talkWith: this
            });
            player.showAnimation('block', 'default')
        }
    }
    return TextosEvent
}

