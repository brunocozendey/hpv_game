import { MapData, RpgMap } from "@rpgjs/server";
import { MobSpawnList, getMobsOnMapCount } from "../spawn/MapUtils";
import { Spawner } from "../spawn/Spawner";
import CorrimentoEvent from "../events/corrimento";
import NpcsEvent from "../events/npcs";
import MonstroEvent from "../events/monstro";
import PerguntasEvent from "../events/perguntas";
import RespostasEvent from "../events/respostas";
import TextosEvent from "../events/textos";


import { Sound } from "@rpgjs/client";

const events_corrimento = Array.from({ length: 12 }, (_, i) => 
    CorrimentoEvent({ name: `MC-${i + 1}` })
);

const events_fear = Array.from({ length: 7 }, (_, i) => 
    MonstroEvent({ event:`MF-${i + 1}`, name: "Medo", graphic: 'medo', frequency: 200, speed: 3, life: 45, pap: false, vacina: true, exp: 30, hit: 75 }),
);

const events_mutagenico = Array.from({ length: 2 }, (_, i) => 
    MonstroEvent({ event:`MMU-${i + 1}`, name: "Mutagenico", graphic: 'mutagenico', frequency: 200, speed: 3, life: 80, pap: false, vacina: true, exp: 45, hit: 350 }),
);

const events_corrimento_2 = Array.from({ length: 5 }, (_, i) => 
    MonstroEvent({ event:`MC2-${i + 1}`, name: "Corrimento II", graphic: 'corrimento_2', frequency: 200, speed: 2, life: 30, pap: false, vacina: false, exp: 25, hit: 100 }),
);

const events_desinformacao = Array.from({ length: 6 }, (_, i) => 
    MonstroEvent({ event:`MD-${i + 1}`, name: "O Desinformante", graphic: 'desinformacao', frequency: 200, speed: 5, life: 60, pap: false, vacina: false, exp: 45, hit: 200 }),
);

const events_hpv_6 = Array.from({ length: 4 }, (_, i) => 
    MonstroEvent({ event:`MHPV6-${i + 1}`, name: "HPV 6", graphic: 'hpv_6', frequency: 200, speed: 2, life: 80, pap: true, vacina: true, exp: 50, hit: 100 }),
);

const events_hpv_11 = Array.from({ length: 4 }, (_, i) => 
    MonstroEvent({ event:`MHPV11-${i + 1}`, name: "HPV 11", graphic: 'hpv_11', frequency: 200, speed: 2, life: 80, pap: true, vacina: true, exp: 50, hit: 100 }),
);

const events_hpv_18 = Array.from({ length: 4 }, (_, i) => 
    MonstroEvent({ event:`MHPV18-${i + 1}`, name: "HPV 18", graphic: 'hpv_18', frequency: 200, speed: 3, life: 100, pap: true, vacina: true, exp: 60, hit: 200 }),
);

const events_hpv_16 = Array.from({ length: 4 }, (_, i) => 
    MonstroEvent({ event:`MHPV16-${i + 1}`, name: "HPV 16", graphic: 'hpv_16', frequency: 200, speed: 3, life: 100, pap: true, vacina: true, exp: 60, hit: 200 }),
);

const events_npcs = [
    NpcsEvent({ 
        name: 'NPC-1', 
        messages:[
            "Você sabia que o HPV ou Papilomavírus Humano Genital, é uma doença sexualmente transmissível comum em todo mundo?",
            "Nesse jogo você irá aprender mais sobre esse vírus, para isso basta conversar com meus amigos.",
            "Para avançar para o próximo nível converse com todos amigos que encontrar pelo caminho.",
            "Boa sorte na sua jornada do conhecimento!"
    ]}),
    NpcsEvent({ 
        name: 'NPC-2', 
        messages:[
            "O HPV causa 5% de todos os cânceres no mundo, sendo um desafio global.",
            "Em 2022 por exemplo foram 16.000 casos só no Brasil!",
            "Boa sorte na sua jornada!"
    ]}),
    NpcsEvent({ 
        name: 'NPC-3', 
        messages:[
            "A camisinha apesar de ser eficiente contra diversas doenças sexualmente transmissíveis não é suficiente contra o HPV.",
            "Existem outros meios que são mais eficazes e você os aprenderá ao longo desta jornada.",
            "Saiba que a informação é um grande aliado ao combate ao HPV.",
            "Bom aprendizado!"
    ]}),
    NpcsEvent({ 
        name: 'NPC-4', 
        messages:[
            "O corrimento vaginal é um dos sintomas do câncer uterino e o tratamento deve ser feito pela mulher e parceiro caso tenha.",
            "O corrimento infeccioso é amarelado ou esverdeado, pode ser o primeiro sintoma, e possui um cheiro desagradável.",
            "O corrimento é o sintoma mais comum de infecção e pode estar acompanhado de coceira, ardor, dor ao urinar e maior sensibilidade.",
            "O ginecologista deve ser procurado nesse caso o quanto antes, o ideal é manter as consultas em dia.",
            "Continue a aprender!"
    ]}),
    NpcsEvent({ 
        name: 'NPC-5', 
        messages:[
            "A prevenção é um passo importante em relação ao câncer de colo de útero.",
            "Uma das formas de prevenção é através do exame preventivo, conhecido como Papa Nicolau.",
            "O exame também é conhecido como PAP e ajuda na detecção de células que podem ser cancerigenas.",
            "As mulheres que não tem vida sexual ativa também, devem fazer o exame."
    ]}),
    NpcsEvent({ 
        name: 'NPC-6', 
        messages:[
            "O papanicolau deve ser feito anualmente, nele é coletado amostras da parede do cólo do útero.",
            "O exame dura poucos minutos para ser coletado.",
            "E é um exame eficaz e utilizado para detectar lesões pré-canceriginas e um póssível câncer."
    ]}),
    NpcsEvent({ 
        name: 'NPC-7', 
        messages:[
            "A vacina é uma outra forma de prevenção.",
            "E ela é recomendada para meninos e meninas de 9 a 14 anos.",
            "A vacina está disponível no SUS.",
            "Porém a vacinação não substitui o exame Papanicolau."
    ]}),
    NpcsEvent({ 
        name: 'NPC-8', 
        messages:[
            "Não há cura para a infecção por HPV!",
            "O tratamento disponível tem como objetivo eliminar ou diminuir as lesões do vírus.",
            "A tentativa é diminuir as lesões das áreas afetadas e elminar as verrugas genitais.",
            "Continue a jornada!"
    ]}),
    NpcsEvent({ 
        name: 'NPC-9', 
        messages:[
            "As células pré-cancerosas, podem não causar sintomas perceptíveis.", 
            "Por isso, é recomendado a realização de exames de rotina para rastreamento.",
            "Com os exames de rotina aumentam as chances de detecção precoce da doença."
    ]}),
    NpcsEvent({ 
        name: 'NPC-10', 
        messages:[
            "Além do exame Papanicolau que pode ser realizado por um médico ou enfermeiro, há também a Autocoleta",
            "Ela pode ser realizada pela própria mulher.",
            "O auto teste é útil para áreas remotas ou onde a mulher não se sinta a vontade para realizar um exame com outra pessoa ou por questões religiosas."        
    ]}),
    NpcsEvent({ 
        name: 'NPC-11', 
        messages:[
            "O HPV pode ser identificado através de verrugas ou cortes nas áreas centrais de útero e na forma de corrimento.",
            "Porém a melhor forma é a detecção precoce realizada por um médico e a prevenção através da vacinação."
    ]}),
    NpcsEvent({ 
        name: 'NPC-12', 
        messages:[
            "Os homens também devem realizar exames.",
            "É importante para prevenir lesões relacionadas ao HPV fazendo consultas regulares com o médico de família, médico proctologista ou urologista."        
    ]}),
    NpcsEvent({ 
        name: 'NPC-13', 
        messages:[
            "Se o câncer de colo de útero for descoberto mais cedo, mais fácil será tratá-lo.",
            "Caso o câncer não seja tratado de forma correta e o mais cedo possível, há risco de morte."        
    ]}),
    NpcsEvent({ 
        name: 'NPC-14', 
        messages:[
            "As células pré-cancerosas, podem não causar sintomas perceptíveis.",
            "Por isso, é recomendado a realização de exames de rotina para rastreamento.",
            "Com os exames de rotina aumentam as chances de detecção precoce da doença."        
    ]}),
    NpcsEvent({ 
        name: 'NPC-15', 
        messages:[
            "Além do exame Papanicolau que  pode ser realizado por um médico ou enfermeiro, há também a Autocoleta.",
            "Ela pode ser realizada pela própria mulher.",
            "O que é útil para áreas remotas ou onde a mulher não se sinta a vontade para realizar um exame com outra pessoa ou por questões religiosas."        
    ]}),
    NpcsEvent({ 
        name: 'NPC-16', 
        messages:[
            "O HPV pode ser identificado através de verrugas ou cortes nas áreas centrais de útero e na forma de corrimento",
            "No entanto a melhor forma é a detecção precoce realizada por um médico e a prevenção através da vacinação."        
    ]}),
    NpcsEvent({ 
        name: 'NPC-17', 
        messages:[
            "Os homens também devem realizar exames, é importante para prevenir lesões relacionadas ao HPV.",
            "Através  de consultas regulares com o médico de família, médico proctologista ou urologista.",
            "No baú ao lado você encontrará a Vacina, que ajuda na defesa contra o HPV."        
    ]}),
    NpcsEvent({ 
        name: 'NPC-18', 
        messages:[
            "Nem todos os tipos de HPV podem causar câncer. Os mais prevalentes são: HPV16 e HPV18, que são considerados de alto risco e os HPV6 e HPV11 e são de baixo risco.",
            "Eles são responsáveis pela maioria dos casos de verrugas genitais.",
            "No Brasil, a vacina quadrivalente está disponível gratuitamente pelo SUUS para todas as meninas de 9 a 14 anos e meninos de 11 a 14 anos."
       
    ]}),
    NpcsEvent({ 
        name: 'NPC-19', 
        messages:[
            "O HPV é altamente contagioso, sendo possível contaminar-se com uma única exposição.",
            "A principal forma de transmissão do HPV ocorre por contato direto com a pele ou mucosa infectada, principalmente pela via sexual."        
    ]}),
    NpcsEvent({ 
        name: 'NPC-20', 
        messages:[
            "Quase todos os homens e mulheres sexualmente ativos serão infectados por pelo menos um tipo de HPV em algum momento da vida.",
            "Sendo que a maior parte das pessoas nunca descobre que estão infectadas e podem transmitir o HPV para o parceiro."        
    ]}),
    NpcsEvent({ 
        name: 'NPC-21', 
        messages:[
            "O HPV pode ficar no organismo durante anos de maneira latente (forma adormecida sem manifestação) antes de se transformar em uma lesão pré-câncer ou câncer.",
            "O tempo para o aparecimento de lesões ou verrugas genitais após a pessoa ser infectada pelo HPV é de cerca de dois a oito meses, podendo demorar até 20 anos."        
    ]}),
    NpcsEvent({ 
        name: 'NPC-22', 
        messages:[
            "A exposição prolongada ao HPV, é um fator de risco para o câncer cervical e aumenta suas chances de desenvolver a doença ao longo do tempo.",
            "Fumar aumenta o risco de desenvolver câncer cervical, juntamente com outros tipos de câncer."        
    ]}),
    NpcsEvent({ 
        name: 'NPC-23', 
        messages:[
            "O câncer cervical ainda pode se desenvolver em mulheres que não menstruam(menopausa)",
            "Portanto, a triagem continua sendo uma medida preventiva importante para mulheres na menopausa."        
    ]}),

    NpcsEvent({ 
        name: 'NPC-24', 
        messages:[
            "Parabéns por chegar até aqui!",
            "Você aprendeu muito sobre o HPV e a importância da prevenção.",
            "Lembre-se de que a informação é a chave para combater essa doença.",
            "Continue compartilhando o que aprendeu e incentive outras pessoas a se informarem também.",
            "Agora para finalizar vou te transportar para o desafio final e verificar tudo o que você aprendeu!!"       
    ]}),
]

const events_perguntas = [
    PerguntasEvent({
            messages: ["O HPV é facilmente prevenido apenas com o uso de camisinha, que protege completamente contra a infecção pelo vírus.", "Essa afirmação é verdadeira[V] ou falsa[F]?"],
            name: 'Q_0',
            alt_text: false
        }),
        PerguntasEvent({
            messages: ["O HPV é facilmente prevenido apenas com o uso de camisinha, que protege completamente contra a infecção pelo vírus.", "Essa afirmação é verdadeira[V] ou falsa[F]?"],
            name: 'Q_0_2',
            alt_text: true
        }),
        PerguntasEvent({
            messages: ["Mesmo após tomar a vacina contra o HPV, é necessário continuar fazendo o exame preventivo Papanicolau.", "Essa afirmação é verdadeira[V] ou falsa[F]?"],
            name: 'Q_1',
            alt_text: false,
        }),
        PerguntasEvent({
            messages: ["Mesmo após tomar a vacina contra o HPV, é necessário continuar fazendo o exame preventivo Papanicolau.", "Essa afirmação é verdadeira[V] ou falsa[F]?"],
            name: 'Q_1_2',
            alt_text: true,
        }),
        PerguntasEvent({
            messages: ["A autocoleta é uma alternativa válida ao exame de Papanicolau, podendo ser feita pela própria mulher em alguns casos.", "Essa afirmação é verdadeira[V] ou falsa[F]?"],
            name: 'Q_2',
            alt_text: false,
        }),
        PerguntasEvent({
            messages: ["A autocoleta é uma alternativa válida ao exame de Papanicolau, podendo ser feita pela própria mulher em alguns casos.", "Essa afirmação é verdadeira[V] ou falsa[F]?"],
            name: 'Q_2_2',
            alt_text: true,
        }),
        PerguntasEvent({
            messages: ["O HPV pode permanecer no corpo por anos sem apresentar sintomas e, mesmo assim, evoluir para uma lesão ou câncer.", "Essa afirmação é verdadeira[V] ou falsa[F]?"],
            name: 'Q_3',
            alt_text: false,
        }),
        PerguntasEvent({
            messages: ["O HPV pode permanecer no corpo por anos sem apresentar sintomas e, mesmo assim, evoluir para uma lesão ou câncer.", "Essa afirmação é verdadeira[V] ou falsa[F]?"],
            name: 'Q_3_2',
            alt_text: true,
        })
]

const events_respostas = [
    RespostasEvent({
            name: 'Q0_V',
            correta: false,
            type: 'v',
            prox: 'Q_start' 
        }),
    RespostasEvent({
            name: 'Q0_F',
            correta: true,
            type: 'f',
            prox: 'Q_1_P' 
        }),
    RespostasEvent({
            name: 'Q1_V',
            correta: true,
            type: 'v',
            prox: 'Q_2_P' 
        }),
    RespostasEvent({
            name: 'Q1_F',
            correta: false,
            type: 'f',
            prox: 'Q_start' 
        }),
    RespostasEvent({
            name: 'Q2_V',
            correta: true,
            type: 'v',
            prox: 'Q_3_P' 
        }),
    RespostasEvent({
            name: 'Q2_F',
            correta: false,
            type: 'f',
            prox: 'Q_start' 
        }),
    RespostasEvent({    
            name: 'Q3_V',
            correta: true,
            type: 'v',
            prox: 'Q_final' 
        }),
    RespostasEvent({
            name: 'Q3_F',
            correta: false,
            type: 'f',
            prox: 'Q_start' 
        })
]

const events_texts = [
    TextosEvent({name: 'TXT-2',
        messages: ['Entre para testar seus conhecimentos sobre o HPV. Esse é seu desafio Final!']
    }),
    TextosEvent({name: 'Q_text',
        messages: ['Parabéns você chegou ao final do desafio!', 'Agora você pode compartilhar o conhecimento com seus amigos e familiares.']
    })
]

const events = [
    ...events_corrimento,
    ...events_npcs,
    ...events_fear,
    ...events_hpv_6,
    ...events_hpv_11,
    ...events_hpv_16,
    ...events_hpv_18,
    ...events_mutagenico,
    ...events_desinformacao,
    ...events_corrimento_2,
    ...events_perguntas,
    ...events_respostas,
    ...events_texts
];

@MapData({
    id: 'simplemap',
    file: require('../worlds/maps/simplemap.tmx'),
    events: events,
    name: 'Simple Map'
})
export default class Simplemap extends RpgMap {
}
