import { RpgPlayer } from '@rpgjs/server'
import { Item } from '@rpgjs/database'

@Item({
    name: 'Pap',
    description: 'Ajuda na defesa contra o HPV',
    id: 'pap',
    consumable: true
})
export default class Pap {
    onAdd(player: RpgPlayer) {

    }

    onEquip(player: RpgPlayer, equip: boolean) {
            
    }

    onRemove(player: RpgPlayer) {

    }
    onUse(player: RpgPlayer) {
        player.showText('Você usou o PAP, o corrimento ficou enfraquecido.', {
            talkWith: this
        })
        player.hp += 300
        player.setVariable('pap', true)
    }
}