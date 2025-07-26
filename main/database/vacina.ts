import { Item } from '@rpgjs/database'

@Item({
    id: 'vacina',
    name: 'Vacina HPV',
    description: 'Vacina de quadrivalente contra o HPV (6,11,16,18), ajuda a evitar o câncer de colo de útero.',
    consumable: true
})

export default class Vacina { 
    onUse(player) {
        player.showText('Você recebeu a vacina quadrivalente contra o HPV.')
        player.setVariable('vacinado', true)
    }
}