import { RpgEvent, EventData, RpgPlayer, ShapePositioning} from '@rpgjs/server'
import Vacina from '../database/vacina'

@EventData({
    name: 'VAC',
    hitbox: {
        width: 32,
        height: 32
    }
})

export default class PapEvent extends RpgEvent {
    onInit() {
        this.setGraphic('vacina')
        this.attachShape({
            height: 32,
            width: 32,
            positioning: ShapePositioning.Center
        })
        }

    async onAction(player: RpgPlayer) {
        console.log('Passou')
        if (player.getVariable('Q_10') === true) {
            player.showText('Você já pegou a Vacina contra HPV.')
            return      
        }
        else{
            await player.addItem(Vacina)
            this.getCurrentMap().removeEvent(this.id)
            player.setVariable('Q_10',true)
            player.showText('Você recebeu uma vacina quadrivalente do HPV.')    
        }
        
    }
}