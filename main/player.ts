import { RpgWorld, Presets, RpgPlayer, type RpgPlayerHooks, Control, Components, RpgShape } from '@rpgjs/server'

const player: RpgPlayerHooks = {
    onDead(player: RpgPlayer){
        const currentPlayer = RpgWorld.getPlayer(player.id)
        player.setVariable('dead', true)
        player.allRecovery()
        console.log('Player dead', player.getVariable('LAST_CHECKPOINT'))   
        player.teleport(player.getVariable('LAST_CHECKPOINT') || 'start')      
    },
    
    async onLevelUp(player: RpgPlayer, nbLevel: number){
        await player.showText('Parabéns você avançou para o nível '+player.level+"!")
        player.allRecovery()
    },
    onConnected(player: RpgPlayer) {
        //player.name = "Teste";
        player.setComponentsTop([
            // Components.text('HP: {hp}'),
            Components.hpBar({}, '{$percent}%'),
            // Components.text('{name}')
        ]
        )
    },
    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()
        }
    },
    async onJoinMap(player: RpgPlayer) {
        if (player.getVariable('AFTER_INTRO')) {
            return
        }

        await player.playSound('intro',true)
        await player.showText('Bem vindo ao jogo de prevenção ao câncer do colo de útero.')
        await player.showText('1. Converse com todos os NPCs ao longo do caminho, fique ao lado deles e aperte a tecla "Enter" ou "A" na tela.')
        await player.showText('2. Para atacar os monstros, fique ao lado deles e aperte a tecla "Enter" ou "A" na tela.')
        await player.showText('3. Para coletar items, fique ao lado deles e aperte a tecla "Enter" ou "A" na tela e depois verifique o menu.')
        await player.showText('4. Para movimentar, utilize as setas do seu teclado.')
        await player.showText('5. Seu primeiro objetivo é conversar com todos os NPCs e aprender mais sobre o HPV.')
        player.setVariable('AFTER_INTRO', true)
        player.setVariable('LAST_CHECKPOINT', 'start')
    },
    async onInShape(player: RpgPlayer, shape: RpgShape) {
        if (shape.name == 'L-2') {
            if (player.level == 1 && (player.getVariable('NPC-1') & player.getVariable('NPC-2') & player.getVariable('NPC-3') & player.getVariable('NPC-4') & player.getVariable('NPC-5') & player.getVariable('NPC-6') & player.getVariable('NPC-7') & player.getVariable('NPC-8')) ){
                player.exp += player.expForNextlevel
                player.setVariable('LAST_CHECKPOINT', 'CP-2')
            }
            else {
                if (player.level<2) {
                    player.teleport('start')
                    await player.showText('Precisa ter LEVEL 2 para passar, converse com todos os NPCs.', { talkWith: this})
                }
            
        }
        }
        if (shape.name == 'L-3') {
            if ((player.getVariable('LAST_CHECKPOINT') == 'CP-2') || (player.getVariable('LAST_CHECKPOINT') == 'start')) {
                player.setVariable('LAST_CHECKPOINT', 'CP-3')
            }
        }

        if ((shape.name == 'recover' || shape.name == 'castelo' || shape.name == 'L-2' || shape.name == 'L-3' )  && player.getVariable('dead')){
            player.allRecovery()
            player.setVariable('dead', false)
            
        }
        if (shape.name == 'castelo') {
            await player.showText('Você está ferido, precisa se recuperar antes de entrar no castelo.', { talkWith: this})
            player.allRecovery()
        }

        // if ((shape.name == 'final') && (player.getVariable('perguntas') === true)) {
        //         player.teleport('Q_start')
        // }
        // else {
        //     await player.showText('Você precisa conhecer mais sobre o HPV antes de responder as perguntas.', { talkWith: this})
        // }
    }
}

export default player