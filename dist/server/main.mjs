import { expressServer } from "@rpgjs/server/express";
import { EventData, RpgEvent, Components, ShapePositioning, Move, Presets, MapData, RpgMap, RpgWorld, Control, Speed, EventMode, RpgModule } from "@rpgjs/server";
import * as url from "url";
import { Item } from "@rpgjs/database";
const client$3 = null;
const vitePluginRequire_1752345292252_48662087 = "/assets/simplemap.tmx";
var __defProp$n = Object.defineProperty;
var __getOwnPropDesc$n = Object.getOwnPropertyDescriptor;
var __decorateClass$n = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$n(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$n(target, key, result);
  return result;
};
function CorrimentoEvent(options) {
  let CorrimentoEvent2 = class extends RpgEvent {
    onInit() {
      const {
        MAXHP: MAXHP2
      } = Presets;
      this.frequency = options.frequency || 200;
      const name = "Corrimento";
      const life = 20;
      this.paramsModifier = {
        [MAXHP2]: {
          value: -741 + life
        }
      };
      this.setGraphic("corrimento");
      this.hp = life;
      this.setComponentsTop([Components.hpBar({}, name)]);
      this.attachShape({
        height: 200,
        width: 100,
        positioning: ShapePositioning.Center
      });
      this.speed = options.speed || 1;
      this.moving = true;
      this.infiniteMoveRoute([Move.tileRandom()]);
    }
    onAction(player2) {
      if (!player2.getVariable("pap")) {
        player2.hp -= 25;
      }
      this.hp -= 10;
      if (this.hp <= 0) {
        const map = this.getCurrentMap();
        player2.exp += 10;
        map.removeEvent(this.id);
      }
    }
    onDetectInShape(player2, shape) {
      if (player2.type == "player") {
        this.moveTo(player2).subscribe();
        this.breakRoutes(true);
        const dx = this.position.x - player2.position.x;
        const dy = this.position.y - player2.position.y;
        const distanceToPlayer = Math.sqrt(dx * dx + dy * dy) / 100;
        if (distanceToPlayer <= 2) {
          player2.hp -= 10;
        }
      }
    }
  };
  CorrimentoEvent2 = __decorateClass$n([EventData({
    name: options.name,
    hitbox: {
      width: 32,
      height: 16
    }
  })], CorrimentoEvent2);
  return CorrimentoEvent2;
}
var __defProp$m = Object.defineProperty;
var __getOwnPropDesc$m = Object.getOwnPropertyDescriptor;
var __decorateClass$m = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$m(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$m(target, key, result);
  return result;
};
async function showMultipleTexts$2(player2, texts, options = {}) {
  for (const text of texts) {
    await player2.showText(text, options);
  }
}
function NpcsEvent(options) {
  let NpcsEvent2 = class extends RpgEvent {
    onInit() {
      this.setGraphic(options.name);
    }
    async onAction(player2) {
      await showMultipleTexts$2(player2, options.messages, {
        talkWith: this
      });
      if (!player2.getVariable(options.name)) {
        player2.exp += 5;
      }
      player2.setVariable(options.name, true);
      if (options.name === "NPC-24") {
        player2.teleport("final");
        player2.setVariable("perguntas", true);
      }
    }
  };
  NpcsEvent2 = __decorateClass$m([EventData({
    name: options.name,
    hitbox: {
      width: 32,
      height: 16
    }
  })], NpcsEvent2);
  return NpcsEvent2;
}
var __defProp$l = Object.defineProperty;
var __getOwnPropDesc$l = Object.getOwnPropertyDescriptor;
var __decorateClass$l = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$l(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$l(target, key, result);
  return result;
};
function MonstroEvent(options) {
  let MonstroEvent2 = class extends RpgEvent {
    getRandomInt(max) {
      return Math.floor(Math.random() * max) + 1;
    }
    onInit() {
      const {
        MAXHP
      } = Presets;
      this.frequency = options.frequency || 200;
      this.speed = options.speed || 1;
      const life = options.life || 20;
      this.moving = true;
      this.player_hit = 20;
      this.infiniteMoveRoute([Move.tileRandom()]);
      this.setGraphic(options.graphic);
      this.paramsModifier = {
        [MAXHP]: {
          value: -741 + life
        }
      };
      this.hp = life;
      this.setComponentsTop([Components.hpBar({}, options.name)]);
      this.attachShape({
        height: 200,
        width: 100,
        positioning: ShapePositioning.Center
      });
    }
    onAction(player2) {
      if (player2.getVariable("vacinado")) {
        this.player_hit = this.player_hit * 2;
      }
      if (!player2.getVariable("pap") && options.pap) {
        player2.hp -= this.getRandomInt(options.hit);
      }
      this.hp -= this.player_hit;
      if (this.hp <= 0) {
        const map = this.getCurrentMap();
        player2.exp += options.exp;
        map.removeEvent(this.id);
      }
    }
    onDetectInShape(player2, shape) {
      if (player2.type == "player") {
        this.moveTo(player2).subscribe();
        this.breakRoutes(true);
        const dx = this.position.x - player2.position.x;
        const dy = this.position.y - player2.position.y;
        const distanceToPlayer = Math.sqrt(dx * dx + dy * dy) / 100;
        if (distanceToPlayer <= 2) {
          player2.hp -= this.getRandomInt(options.hit);
        }
      }
    }
  };
  MonstroEvent2 = __decorateClass$l([EventData({
    name: options.event,
    hitbox: {
      width: 32,
      height: 32
    }
  })], MonstroEvent2);
  return MonstroEvent2;
}
var __defProp$k = Object.defineProperty;
var __getOwnPropDesc$k = Object.getOwnPropertyDescriptor;
var __decorateClass$k = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$k(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$k(target, key, result);
  return result;
};
async function showMultipleTexts$1(player2, texts, options = {}) {
  for (const text of texts) {
    await player2.showText(text, options);
  }
}
function PerguntasEvent(options) {
  let PerguntasEvent2 = class extends RpgEvent {
    async onInit() {
      if (options.alt_text) {
        return;
      } else {
        this.setGraphic("block");
      }
    }
    async onAction(player2) {
      if (options.alt_text) {
        await showMultipleTexts$1(player2, options.messages, {
          talkWith: this
        });
      } else {
        await player2.showText(options.messages, {
          talkWith: this
        });
        this.getCurrentMap().removeEvent(this.id);
      }
    }
  };
  PerguntasEvent2 = __decorateClass$k([EventData({
    name: options.name,
    hitbox: {
      width: 16,
      height: 16
    }
  })], PerguntasEvent2);
  return PerguntasEvent2;
}
var __defProp$j = Object.defineProperty;
var __getOwnPropDesc$j = Object.getOwnPropertyDescriptor;
var __decorateClass$j = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$j(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$j(target, key, result);
  return result;
};
function RespostasEvent(options) {
  let RespostasEvent2 = class extends RpgEvent {
    async onInit() {
      if (options.type === "v") {
        this.setGraphic("verdadeiro");
      } else {
        this.setGraphic("falso");
      }
    }
    async onAction(player2) {
      if (options.correta) {
        player2.teleport(options.prox);
      } else {
        player2.teleport("Q_start");
      }
    }
  };
  RespostasEvent2 = __decorateClass$j([EventData({
    name: options.name,
    hitbox: {
      width: 32,
      height: 32
    }
  })], RespostasEvent2);
  return RespostasEvent2;
}
var __defProp$i = Object.defineProperty;
var __getOwnPropDesc$i = Object.getOwnPropertyDescriptor;
var __decorateClass$i = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$i(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$i(target, key, result);
  return result;
};
async function showMultipleTexts(player2, texts, options = {}) {
  for (const text of texts) {
    await player2.showText(text, options);
  }
}
function TextosEvent(options) {
  let TextosEvent2 = class extends RpgEvent {
    async onAction(player2) {
      await showMultipleTexts(player2, options.messages, {
        talkWith: this
      });
      player2.showAnimation("block", "default");
    }
  };
  TextosEvent2 = __decorateClass$i([EventData({
    name: options.name,
    hitbox: {
      width: 16,
      height: 16
    }
  })], TextosEvent2);
  return TextosEvent2;
}
var __defProp$h = Object.defineProperty;
var __getOwnPropDesc$h = Object.getOwnPropertyDescriptor;
var __decorateClass$h = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$h(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$h(target, key, result);
  return result;
};
const events_corrimento = Array.from({
  length: 12
}, (_, i) => CorrimentoEvent({
  name: `MC-${i + 1}`
}));
const events_fear = Array.from({
  length: 7
}, (_, i) => MonstroEvent({
  event: `MF-${i + 1}`,
  name: "Medo",
  graphic: "medo",
  frequency: 200,
  speed: 3,
  life: 45,
  pap: false,
  vacina: true,
  exp: 30,
  hit: 75
}));
const events_mutagenico = Array.from({
  length: 2
}, (_, i) => MonstroEvent({
  event: `MMU-${i + 1}`,
  name: "Mutagenico",
  graphic: "mutagenico",
  frequency: 200,
  speed: 3,
  life: 80,
  pap: false,
  vacina: true,
  exp: 45,
  hit: 350
}));
const events_corrimento_2 = Array.from({
  length: 5
}, (_, i) => MonstroEvent({
  event: `MC2-${i + 1}`,
  name: "Corrimento II",
  graphic: "corrimento_2",
  frequency: 200,
  speed: 2,
  life: 30,
  pap: false,
  vacina: false,
  exp: 25,
  hit: 100
}));
const events_desinformacao = Array.from({
  length: 6
}, (_, i) => MonstroEvent({
  event: `MD-${i + 1}`,
  name: "O Desinformante",
  graphic: "desinformacao",
  frequency: 200,
  speed: 5,
  life: 60,
  pap: false,
  vacina: false,
  exp: 45,
  hit: 200
}));
const events_hpv_6 = Array.from({
  length: 4
}, (_, i) => MonstroEvent({
  event: `MHPV6-${i + 1}`,
  name: "HPV 6",
  graphic: "hpv_6",
  frequency: 200,
  speed: 2,
  life: 80,
  pap: true,
  vacina: true,
  exp: 50,
  hit: 100
}));
const events_hpv_11 = Array.from({
  length: 4
}, (_, i) => MonstroEvent({
  event: `MHPV11-${i + 1}`,
  name: "HPV 11",
  graphic: "hpv_11",
  frequency: 200,
  speed: 2,
  life: 80,
  pap: true,
  vacina: true,
  exp: 50,
  hit: 100
}));
const events_hpv_18 = Array.from({
  length: 4
}, (_, i) => MonstroEvent({
  event: `MHPV18-${i + 1}`,
  name: "HPV 18",
  graphic: "hpv_18",
  frequency: 200,
  speed: 3,
  life: 100,
  pap: true,
  vacina: true,
  exp: 60,
  hit: 200
}));
const events_hpv_16 = Array.from({
  length: 4
}, (_, i) => MonstroEvent({
  event: `MHPV16-${i + 1}`,
  name: "HPV 16",
  graphic: "hpv_16",
  frequency: 200,
  speed: 3,
  life: 100,
  pap: true,
  vacina: true,
  exp: 60,
  hit: 200
}));
const events_npcs = [NpcsEvent({
  name: "NPC-1",
  messages: ["Você sabia que o HPV ou Papilomavírus Humano Genital, é uma doença sexualmente transmissível comum em todo mundo?", "Nesse jogo você irá aprender mais sobre esse vírus, para isso basta conversar com meus amigos.", "Para avançar para o próximo nível converse com todos amigos que encontrar pelo caminho.", "Boa sorte na sua jornada do conhecimento!"]
}), NpcsEvent({
  name: "NPC-2",
  messages: ["O HPV causa 5% de todos os cânceres no mundo, sendo um desafio global.", "Em 2022 por exemplo foram 16.000 casos só no Brasil!", "Boa sorte na sua jornada!"]
}), NpcsEvent({
  name: "NPC-3",
  messages: ["A camisinha apesar de ser eficiente contra diversas doenças sexualmente transmissíveis não é suficiente contra o HPV.", "Existem outros meios que são mais eficazes e você os aprenderá ao longo desta jornada.", "Saiba que a informação é um grande aliado ao combate ao HPV.", "Bom aprendizado!"]
}), NpcsEvent({
  name: "NPC-4",
  messages: ["O corrimento vaginal é um dos sintomas do câncer uterino e o tratamento deve ser feito pela mulher e parceiro caso tenha.", "O corrimento infeccioso é amarelado ou esverdeado, pode ser o primeiro sintoma, e possui um cheiro desagradável.", "O corrimento é o sintoma mais comum de infecção e pode estar acompanhado de coceira, ardor, dor ao urinar e maior sensibilidade.", "O ginecologista deve ser procurado nesse caso o quanto antes, o ideal é manter as consultas em dia.", "Continue a aprender!"]
}), NpcsEvent({
  name: "NPC-5",
  messages: ["A prevenção é um passo importante em relação ao câncer de colo de útero.", "Uma das formas de prevenção é através do exame preventivo, conhecido como Papa Nicolau.", "O exame também é conhecido como PAP e ajuda na detecção de células que podem ser cancerigenas.", "As mulheres que não tem vida sexual ativa também, devem fazer o exame."]
}), NpcsEvent({
  name: "NPC-6",
  messages: ["O papanicolau deve ser feito anualmente, nele é coletado amostras da parede do cólo do útero.", "O exame dura poucos minutos para ser coletado.", "E é um exame eficaz e utilizado para detectar lesões pré-canceriginas e um póssível câncer."]
}), NpcsEvent({
  name: "NPC-7",
  messages: ["A vacina é uma outra forma de prevenção.", "E ela é recomendada para meninos e meninas de 9 a 14 anos.", "A vacina está disponível no SUS.", "Porém a vacinação não substitui o exame Papanicolau."]
}), NpcsEvent({
  name: "NPC-8",
  messages: ["Não há cura para a infecção por HPV!", "O tratamento disponível tem como objetivo eliminar ou diminuir as lesões do vírus.", "A tentativa é diminuir as lesões das áreas afetadas e elminar as verrugas genitais.", "Continue a jornada!"]
}), NpcsEvent({
  name: "NPC-9",
  messages: ["As células pré-cancerosas, podem não causar sintomas perceptíveis.", "Por isso, é recomendado a realização de exames de rotina para rastreamento.", "Com os exames de rotina aumentam as chances de detecção precoce da doença."]
}), NpcsEvent({
  name: "NPC-10",
  messages: ["Além do exame Papanicolau que pode ser realizado por um médico ou enfermeiro, há também a Autocoleta", "Ela pode ser realizada pela própria mulher.", "O auto teste é útil para áreas remotas ou onde a mulher não se sinta a vontade para realizar um exame com outra pessoa ou por questões religiosas."]
}), NpcsEvent({
  name: "NPC-11",
  messages: ["O HPV pode ser identificado através de verrugas ou cortes nas áreas centrais de útero e na forma de corrimento.", "Porém a melhor forma é a detecção precoce realizada por um médico e a prevenção através da vacinação."]
}), NpcsEvent({
  name: "NPC-12",
  messages: ["Os homens também devem realizar exames.", "É importante para prevenir lesões relacionadas ao HPV fazendo consultas regulares com o médico de família, médico proctologista ou urologista."]
}), NpcsEvent({
  name: "NPC-13",
  messages: ["Se o câncer de colo de útero for descoberto mais cedo, mais fácil será tratá-lo.", "Caso o câncer não seja tratado de forma correta e o mais cedo possível, há risco de morte."]
}), NpcsEvent({
  name: "NPC-14",
  messages: ["As células pré-cancerosas, podem não causar sintomas perceptíveis.", "Por isso, é recomendado a realização de exames de rotina para rastreamento.", "Com os exames de rotina aumentam as chances de detecção precoce da doença."]
}), NpcsEvent({
  name: "NPC-15",
  messages: ["Além do exame Papanicolau que  pode ser realizado por um médico ou enfermeiro, há também a Autocoleta.", "Ela pode ser realizada pela própria mulher.", "O que é útil para áreas remotas ou onde a mulher não se sinta a vontade para realizar um exame com outra pessoa ou por questões religiosas."]
}), NpcsEvent({
  name: "NPC-16",
  messages: ["O HPV pode ser identificado através de verrugas ou cortes nas áreas centrais de útero e na forma de corrimento", "No entanto a melhor forma é a detecção precoce realizada por um médico e a prevenção através da vacinação."]
}), NpcsEvent({
  name: "NPC-17",
  messages: ["Os homens também devem realizar exames, é importante para prevenir lesões relacionadas ao HPV.", "Através  de consultas regulares com o médico de família, médico proctologista ou urologista.", "No baú ao lado você encontrará a Vacina, que ajuda na defesa contra o HPV."]
}), NpcsEvent({
  name: "NPC-18",
  messages: ["Nem todos os tipos de HPV podem causar câncer. Os mais prevalentes são: HPV16 e HPV18, que são considerados de alto risco e os HPV6 e HPV11 e são de baixo risco.", "Eles são responsáveis pela maioria dos casos de verrugas genitais.", "No Brasil, a vacina quadrivalente está disponível gratuitamente pelo SUUS para todas as meninas de 9 a 14 anos e meninos de 11 a 14 anos."]
}), NpcsEvent({
  name: "NPC-19",
  messages: ["O HPV é altamente contagioso, sendo possível contaminar-se com uma única exposição.", "A principal forma de transmissão do HPV ocorre por contato direto com a pele ou mucosa infectada, principalmente pela via sexual."]
}), NpcsEvent({
  name: "NPC-20",
  messages: ["Quase todos os homens e mulheres sexualmente ativos serão infectados por pelo menos um tipo de HPV em algum momento da vida.", "Sendo que a maior parte das pessoas nunca descobre que estão infectadas e podem transmitir o HPV para o parceiro."]
}), NpcsEvent({
  name: "NPC-21",
  messages: ["O HPV pode ficar no organismo durante anos de maneira latente (forma adormecida sem manifestação) antes de se transformar em uma lesão pré-câncer ou câncer.", "O tempo para o aparecimento de lesões ou verrugas genitais após a pessoa ser infectada pelo HPV é de cerca de dois a oito meses, podendo demorar até 20 anos."]
}), NpcsEvent({
  name: "NPC-22",
  messages: ["A exposição prolongada ao HPV, é um fator de risco para o câncer cervical e aumenta suas chances de desenvolver a doença ao longo do tempo.", "Fumar aumenta o risco de desenvolver câncer cervical, juntamente com outros tipos de câncer."]
}), NpcsEvent({
  name: "NPC-23",
  messages: ["O câncer cervical ainda pode se desenvolver em mulheres que não menstruam(menopausa)", "Portanto, a triagem continua sendo uma medida preventiva importante para mulheres na menopausa."]
}), NpcsEvent({
  name: "NPC-24",
  messages: ["Parabéns por chegar até aqui!", "Você aprendeu muito sobre o HPV e a importância da prevenção.", "Lembre-se de que a informação é a chave para combater essa doença.", "Continue compartilhando o que aprendeu e incentive outras pessoas a se informarem também.", "Agora para finalizar vou te transportar para o desafio final e verificar tudo o que você aprendeu!!"]
})];
const events_perguntas = [PerguntasEvent({
  messages: ["O HPV é facilmente prevenido apenas com o uso de camisinha, que protege completamente contra a infecção pelo vírus.", "Essa afirmação é verdadeira[V] ou falsa[F]?"],
  name: "Q_0",
  alt_text: false
}), PerguntasEvent({
  messages: ["O HPV é facilmente prevenido apenas com o uso de camisinha, que protege completamente contra a infecção pelo vírus.", "Essa afirmação é verdadeira[V] ou falsa[F]?"],
  name: "Q_0_2",
  alt_text: true
}), PerguntasEvent({
  messages: ["Mesmo após tomar a vacina contra o HPV, é necessário continuar fazendo o exame preventivo Papanicolau.", "Essa afirmação é verdadeira[V] ou falsa[F]?"],
  name: "Q_1",
  alt_text: false
}), PerguntasEvent({
  messages: ["Mesmo após tomar a vacina contra o HPV, é necessário continuar fazendo o exame preventivo Papanicolau.", "Essa afirmação é verdadeira[V] ou falsa[F]?"],
  name: "Q_1_2",
  alt_text: true
}), PerguntasEvent({
  messages: ["A autocoleta é uma alternativa válida ao exame de Papanicolau, podendo ser feita pela própria mulher em alguns casos.", "Essa afirmação é verdadeira[V] ou falsa[F]?"],
  name: "Q_2",
  alt_text: false
}), PerguntasEvent({
  messages: ["A autocoleta é uma alternativa válida ao exame de Papanicolau, podendo ser feita pela própria mulher em alguns casos.", "Essa afirmação é verdadeira[V] ou falsa[F]?"],
  name: "Q_2_2",
  alt_text: true
}), PerguntasEvent({
  messages: ["O HPV pode permanecer no corpo por anos sem apresentar sintomas e, mesmo assim, evoluir para uma lesão ou câncer.", "Essa afirmação é verdadeira[V] ou falsa[F]?"],
  name: "Q_3",
  alt_text: false
}), PerguntasEvent({
  messages: ["O HPV pode permanecer no corpo por anos sem apresentar sintomas e, mesmo assim, evoluir para uma lesão ou câncer.", "Essa afirmação é verdadeira[V] ou falsa[F]?"],
  name: "Q_3_2",
  alt_text: true
})];
const events_respostas = [RespostasEvent({
  name: "Q0_V",
  correta: false,
  type: "v",
  prox: "Q_start"
}), RespostasEvent({
  name: "Q0_F",
  correta: true,
  type: "f",
  prox: "Q_1_P"
}), RespostasEvent({
  name: "Q1_V",
  correta: true,
  type: "v",
  prox: "Q_2_P"
}), RespostasEvent({
  name: "Q1_F",
  correta: false,
  type: "f",
  prox: "Q_start"
}), RespostasEvent({
  name: "Q2_V",
  correta: true,
  type: "v",
  prox: "Q_3_P"
}), RespostasEvent({
  name: "Q2_F",
  correta: false,
  type: "f",
  prox: "Q_start"
}), RespostasEvent({
  name: "Q3_V",
  correta: true,
  type: "v",
  prox: "Q_final"
}), RespostasEvent({
  name: "Q3_F",
  correta: false,
  type: "f",
  prox: "Q_start"
})];
const events_texts = [TextosEvent({
  name: "TXT-2",
  messages: ["Entre para testar seus conhecimentos sobre o HPV. Esse é seu desafio Final!"]
}), TextosEvent({
  name: "Q_text",
  messages: ["Parabéns você chegou ao final do desafio!", "Agora você pode compartilhar o conhecimento com seus amigos e familiares."]
})];
const events = [...events_corrimento, ...events_npcs, ...events_fear, ...events_hpv_6, ...events_hpv_11, ...events_hpv_16, ...events_hpv_18, ...events_mutagenico, ...events_desinformacao, ...events_corrimento_2, ...events_perguntas, ...events_respostas, ...events_texts];
let Simplemap = class extends RpgMap {
};
Simplemap = __decorateClass$h([MapData({
  id: "simplemap",
  file: vitePluginRequire_1752345292252_48662087,
  events,
  name: "Simple Map"
})], Simplemap);
const _main_worlds_myworldworld = { "maps": [{ "fileName": "maps/simplemap.tmx", "height": 640, "width": 800, "x": 64, "y": -160 }, { "fileName": "maps/simplemap2.tmx", "height": 640, "width": 640, "x": -160, "y": 480 }], "onlyShowAdjacentMaps": false, "type": "world", "basePath": "./main/worlds", "id": "./main/worlds/myworld.world" };
const player = {
  onDead(player2) {
    RpgWorld.getPlayer(player2.id);
    player2.setVariable("dead", true);
    player2.allRecovery();
    console.log("Player dead", player2.getVariable("LAST_CHECKPOINT"));
    player2.teleport(player2.getVariable("LAST_CHECKPOINT") || "start");
  },
  async onLevelUp(player2, nbLevel) {
    await player2.showText("Parabéns você avançou para o nível " + player2.level + "!");
    player2.allRecovery();
  },
  onConnected(player2) {
    player2.setComponentsTop([
      // Components.text('HP: {hp}'),
      Components.hpBar({}, "{$percent}%")
      // Components.text('{name}')
    ]);
  },
  onInput(player2, {
    input
  }) {
    if (input == Control.Back) {
      player2.callMainMenu();
    }
  },
  async onJoinMap(player2) {
    if (player2.getVariable("AFTER_INTRO")) {
      return;
    }
    await player2.playSound("intro", true);
    await player2.showText("Bem vindo ao jogo de prevenção ao câncer do colo de útero.");
    await player2.showText('1. Converse com todos os NPCs ao longo do caminho, fique ao lado deles e aperte a tecla "Enter" ou "A" na tela.');
    await player2.showText('2. Para atacar os monstros, fique ao lado deles e aperte a tecla "Enter" ou "A" na tela.');
    await player2.showText('3. Para coletar items, fique ao lado deles e aperte a tecla "Enter" ou "A" na tela e depois verifique o menu.');
    await player2.showText("4. Para movimentar, utilize as setas do seu teclado.");
    await player2.showText("5. Seu primeiro objetivo é conversar com todos os NPCs e aprender mais sobre o HPV.");
    player2.setVariable("AFTER_INTRO", true);
    player2.setVariable("LAST_CHECKPOINT", "start");
  },
  async onInShape(player2, shape) {
    if (shape.name == "L-2") {
      if (player2.level == 1 && player2.getVariable("NPC-1") & player2.getVariable("NPC-2") & player2.getVariable("NPC-3") & player2.getVariable("NPC-4") & player2.getVariable("NPC-5") & player2.getVariable("NPC-6") & player2.getVariable("NPC-7") & player2.getVariable("NPC-8")) {
        player2.exp += player2.expForNextlevel;
        player2.setVariable("LAST_CHECKPOINT", "CP-2");
      } else {
        if (player2.level < 2) {
          player2.teleport("start");
          await player2.showText("Precisa ter LEVEL 2 para passar, converse com todos os NPCs.", {
            talkWith: this
          });
        }
      }
    }
    if (shape.name == "L-3") {
      if (player2.getVariable("LAST_CHECKPOINT") == "CP-2" || player2.getVariable("LAST_CHECKPOINT") == "start") {
        player2.setVariable("LAST_CHECKPOINT", "CP-3");
      }
    }
    if ((shape.name == "recover" || shape.name == "castelo" || shape.name == "L-2" || shape.name == "L-3") && player2.getVariable("dead")) {
      player2.allRecovery();
      player2.setVariable("dead", false);
    }
    if (shape.name == "castelo") {
      await player2.showText("Você está ferido, precisa se recuperar antes de entrar no castelo.", {
        talkWith: this
      });
      player2.allRecovery();
    }
  }
};
var __defProp$g = Object.defineProperty;
var __getOwnPropDesc$g = Object.getOwnPropertyDescriptor;
var __decorateClass$g = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$g(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$g(target, key, result);
  return result;
};
let DoorEvent$2 = class DoorEvent extends RpgEvent {
  onInit() {
    this.attachShape({
      height: 32,
      width: 32,
      positioning: ShapePositioning.Center
    });
  }
  async onPlayerTouch(player2) {
    await player2.changeMap(this.map, {
      x: 4760.33,
      y: 1181.33
    });
  }
};
DoorEvent$2 = __decorateClass$g([EventData({
  name: "T-1",
  hitbox: {
    width: 16,
    height: 16
  }
})], DoorEvent$2);
var __defProp$f = Object.defineProperty;
var __getOwnPropDesc$f = Object.getOwnPropertyDescriptor;
var __decorateClass$f = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$f(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$f(target, key, result);
  return result;
};
let PapEvent$2 = class PapEvent extends RpgEvent {
  onInit() {
    this.attachShape({
      height: 32,
      width: 32,
      positioning: ShapePositioning.Center
    });
  }
  async onAction(player2) {
    if (player2.getVariable("perguntas") === true) {
      await player2.showText("Clique nas placas para verificar as perguntas antes de escolher Verdadeiro ou Falso.");
      player2.teleport("Q_start");
    } else {
      await player2.showText("Você ainda não pode acessar as perguntas finais.");
    }
  }
};
PapEvent$2 = __decorateClass$f([EventData({
  name: "final-door",
  hitbox: {
    width: 32,
    height: 32
  }
})], PapEvent$2);
var __defProp$e = Object.defineProperty;
var __getOwnPropDesc$e = Object.getOwnPropertyDescriptor;
var __decorateClass$e = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$e(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$e(target, key, result);
  return result;
};
let HoleEvent$1 = class HoleEvent extends RpgEvent {
  onInit() {
    this.attachShape({
      height: 32,
      width: 32,
      positioning: ShapePositioning.Center
    });
  }
  async onPlayerTouch(player2) {
    await player2.changeMap(this.map, {
      x: 3726,
      y: 403
    });
  }
};
HoleEvent$1 = __decorateClass$e([EventData({
  name: "HO-1",
  hitbox: {
    width: 16,
    height: 16
  }
})], HoleEvent$1);
var __defProp$d = Object.defineProperty;
var __getOwnPropDesc$d = Object.getOwnPropertyDescriptor;
var __decorateClass$d = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$d(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$d(target, key, result);
  return result;
};
let HoleEvent2 = class extends RpgEvent {
  onInit() {
    this.attachShape({
      height: 32,
      width: 32,
      positioning: ShapePositioning.Center
    });
  }
  async onPlayerTouch(player2) {
    await player2.changeMap(this.map, {
      x: 2351,
      y: 791
    });
  }
};
HoleEvent2 = __decorateClass$d([EventData({
  name: "HO-2",
  hitbox: {
    width: 16,
    height: 16
  }
})], HoleEvent2);
var __defProp$c = Object.defineProperty;
var __getOwnPropDesc$c = Object.getOwnPropertyDescriptor;
var __decorateClass$c = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$c(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$c(target, key, result);
  return result;
};
let MonsterEvent$2 = class MonsterEvent extends RpgEvent {
  onInit() {
    const {
      MAXHP: MAXHP2
    } = Presets;
    const name = "HPV";
    const life = 20;
    this.paramsModifier = {
      [MAXHP2]: {
        value: -741 + life
      }
    };
    this.setGraphic("hpv");
    this.hp = life;
    this.setComponentsTop([Components.hpBar({}, name)]);
    this.attachShape({
      height: 200,
      width: 100,
      positioning: ShapePositioning.Center
    });
    this.speed = Speed.Slow;
    this.moving = true;
    this.infiniteMoveRoute([Move.tileRandom()]);
  }
  onAction(player2) {
    if (player2.getVariable("vacinado") === false) {
      player2.hp -= 5;
    }
    this.hp -= 10;
    if (this.hp <= 0) {
      const map = this.getCurrentMap();
      map.removeEvent(this.id);
    }
  }
  onDetectInShape(player2, shape) {
    this.moveTo(player2).subscribe();
    this.breakRoutes(true);
    const dx = this.position.x - player2.position.x;
    const dy = this.position.y - player2.position.y;
    const distanceToPlayer = Math.sqrt(dx * dx + dy * dy) / 100;
    if (distanceToPlayer <= 2) {
      player2.hp -= 5;
    }
  }
};
MonsterEvent$2 = __decorateClass$c([EventData({
  name: "M-2",
  hitbox: {
    width: 32,
    height: 32
  }
})], MonsterEvent$2);
var __defProp$b = Object.defineProperty;
var __getOwnPropDesc$b = Object.getOwnPropertyDescriptor;
var __decorateClass$b = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$b(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$b(target, key, result);
  return result;
};
let DoorEvent$1 = class DoorEvent2 extends RpgEvent {
  onInit() {
    this.attachShape({
      height: 32,
      width: 32,
      positioning: ShapePositioning.Center
    });
  }
  async onPlayerTouch(player2) {
    await player2.changeMap(this.map, {
      x: 5519,
      y: 2535
    });
  }
};
DoorEvent$1 = __decorateClass$b([EventData({
  name: "P-1",
  hitbox: {
    width: 16,
    height: 16
  }
})], DoorEvent$1);
var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$a(target, key, result);
  return result;
};
let DoorEvent3 = class extends RpgEvent {
  onInit() {
    this.attachShape({
      height: 32,
      width: 32,
      positioning: ShapePositioning.Center
    });
  }
  async onPlayerTouch(player2) {
    await player2.changeMap(this.map, {
      x: 2383,
      y: 1194
    });
  }
};
DoorEvent3 = __decorateClass$a([EventData({
  name: "P-2",
  hitbox: {
    width: 32,
    height: 32
  }
})], DoorEvent3);
var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$9(target, key, result);
  return result;
};
let Pap = class {
  onAdd(player2) {
  }
  onEquip(player2, equip) {
  }
  onRemove(player2) {
  }
  onUse(player2) {
    player2.showText("Você usou o PAP, o corrimento ficou enfraquecido.", {
      talkWith: this
    });
    player2.hp += 300;
    player2.setVariable("pap", true);
  }
};
Pap = __decorateClass$9([Item({
  name: "Pap",
  description: "Ajuda na defesa contra o HPV",
  id: "pap",
  consumable: true
})], Pap);
var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$8(target, key, result);
  return result;
};
let PapEvent$1 = class PapEvent2 extends RpgEvent {
  onInit() {
    this.setGraphic("pap");
    this.attachShape({
      height: 16,
      width: 16,
      positioning: ShapePositioning.Center
    });
  }
  async onAction(player2) {
    if (player2.getVariable("Q_9") === true) {
      player2.showText("Você já pegou o PAP.");
      return;
    } else {
      await player2.addItem(Pap);
      this.getCurrentMap().removeEvent(this.id);
      player2.setVariable("Q_9", true);
      player2.showText("Você recebeu um PAP.");
    }
  }
};
PapEvent$1 = __decorateClass$8([EventData({
  name: "PAP",
  hitbox: {
    width: 16,
    height: 16
  }
})], PapEvent$1);
var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$7(target, key, result);
  return result;
};
let MonsterEvent$1 = class MonsterEvent2 extends RpgEvent {
  onInit() {
    const {
      MAXHP: MAXHP2
    } = Presets;
    const name = "Corrimento";
    const life = 20;
    this.paramsModifier = {
      [MAXHP2]: {
        value: -741 + life
      }
    };
    this.setGraphic("corrimento");
    this.hp = life;
    this.setComponentsTop([Components.hpBar({}, name)]);
    this.attachShape({
      height: 200,
      width: 100,
      positioning: ShapePositioning.Center
    });
    this.speed = Speed.Slow;
    this.moving = true;
    this.infiniteMoveRoute([Move.tileRandom()]);
  }
  onAction(player2) {
    player2.hp -= 5;
    this.hp -= 10;
    if (this.hp <= 0) {
      const map = this.getCurrentMap();
      map.removeEvent(this.id);
    }
  }
  onDetectInShape(player2, shape) {
    this.moveTo(player2).subscribe();
    this.breakRoutes(true);
    const dx = this.position.x - player2.position.x;
    const dy = this.position.y - player2.position.y;
    const distanceToPlayer = Math.sqrt(dx * dx + dy * dy) / 100;
    if (distanceToPlayer <= 2) {
      player2.hp -= 5;
    }
  }
};
MonsterEvent$1 = __decorateClass$7([EventData({
  name: "M-1",
  hitbox: {
    width: 32,
    height: 32
  },
  mode: EventMode.Shared
})], MonsterEvent$1);
var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$6(target, key, result);
  return result;
};
let MonsterEvent3 = class extends RpgEvent {
  onInit() {
    const {
      MAXHP
    } = Presets;
    const name = "Corrimento";
    const life = 20;
    this.paramsModifier = {
      [MAXHP]: {
        value: -741 + life
      }
    };
    this.setGraphic("corrimento_2");
    this.hp = life;
    this.setComponentsTop([Components.hpBar({}, name)]);
    this.attachShape({
      height: 200,
      width: 100,
      positioning: ShapePositioning.Center
    });
    this.speed = Speed.Slow;
    this.moving = true;
    this.infiniteMoveRoute([Move.tileRandom()]);
  }
  onAction(player2) {
    player2.hp -= 5;
    this.hp -= 10;
    if (this.hp <= 0) {
      const map = this.getCurrentMap();
      map.removeEvent(this.id);
    }
  }
  onDetectInShape(player2, shape) {
    this.moveTo(player2).subscribe();
    this.breakRoutes(true);
    const dx = this.position.x - player2.position.x;
    const dy = this.position.y - player2.position.y;
    const distanceToPlayer = Math.sqrt(dx * dx + dy * dy) / 100;
    if (distanceToPlayer <= 2) {
      player2.hp -= 5;
    }
  }
};
MonsterEvent3 = __decorateClass$6([EventData({
  name: "M-3",
  hitbox: {
    width: 32,
    height: 32
  }
})], MonsterEvent3);
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$5(target, key, result);
  return result;
};
let VillagerEvent$2 = class VillagerEvent extends RpgEvent {
  async onAction(player2) {
    await player2.showText("Você está avançando na sua caminhada. Passe pelo labirinto e converse com os personages que encontrar, mas cuidado com os vírus do HPV pois você está ainda desprotedid@.", {
      talkWith: this
    });
  }
};
VillagerEvent$2 = __decorateClass$5([EventData({
  name: "TXT-1",
  hitbox: {
    width: 16,
    height: 16
  }
})], VillagerEvent$2);
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$4(target, key, result);
  return result;
};
let VillagerEvent$1 = class VillagerEvent2 extends RpgEvent {
  async onAction(player2) {
    await player2.showText("Entre para testar seus conhecimentos sobre o HPV. Esse é seu desafio Final!", {
      talkWith: this
    });
  }
};
VillagerEvent$1 = __decorateClass$4([EventData({
  name: "TXT-2",
  hitbox: {
    width: 16,
    height: 16
  }
})], VillagerEvent$1);
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$3(target, key, result);
  return result;
};
let Vacina = class {
  onUse(player2) {
    player2.showText("Você recebeu a vacina quadrivalente contra o HPV.");
    player2.setVariable("vacinado", true);
  }
};
Vacina = __decorateClass$3([Item({
  id: "vacina",
  name: "Vacina HPV",
  description: "Vacina de quadrivalente contra o HPV (6,11,16,18), ajuda a evitar o câncer de colo de útero.",
  consumable: true
})], Vacina);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
let PapEvent3 = class extends RpgEvent {
  onInit() {
    this.setGraphic("vacina");
    this.attachShape({
      height: 32,
      width: 32,
      positioning: ShapePositioning.Center
    });
  }
  async onAction(player2) {
    console.log("Passou");
    if (player2.getVariable("Q_10") === true) {
      player2.showText("Você já pegou a Vacina contra HPV.");
      return;
    } else {
      await player2.addItem(Vacina);
      this.getCurrentMap().removeEvent(this.id);
      player2.setVariable("Q_10", true);
      player2.showText("Você recebeu uma vacina quadrivalente do HPV.");
    }
  }
};
PapEvent3 = __decorateClass$2([EventData({
  name: "VAC",
  hitbox: {
    width: 32,
    height: 32
  }
})], PapEvent3);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
let VillagerEvent3 = class extends RpgEvent {
  onInit() {
    this.setGraphic("female");
  }
  async onAction(player2) {
    await player2.showText("I give you 10 gold.", {
      talkWith: this
    });
    player2.gold += 10;
  }
};
VillagerEvent3 = __decorateClass$1([EventData({
  name: "EV-1",
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent3);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
const _lastConnectedCb = player.onConnected;
player.onConnected = async (player2) => {
  if (_lastConnectedCb)
    await _lastConnectedCb(player2);
  if (!player2.server.module.customHookExists("server.player.onAuth")) {
    player2.setGraphic("hero");
    player2.setHitbox(16, 16);
    await player2.changeMap("simplemap");
  }
};
let RpgServerModuleEngine = class {
};
RpgServerModuleEngine = __decorateClass([
  RpgModule({
    player,
    events: [DoorEvent$2, CorrimentoEvent, PapEvent$2, HoleEvent$1, HoleEvent2, MonsterEvent$2, MonstroEvent, NpcsEvent, DoorEvent$1, DoorEvent3, PapEvent$1, PerguntasEvent, RespostasEvent, MonsterEvent$1, MonsterEvent3, TextosEvent, VillagerEvent$2, VillagerEvent$1, PapEvent3, VillagerEvent3].map((val) => {
      if (!val) {
        throw new Error('Do you have "export default" in this file ? :  ./main/events/villager.ts');
      }
      return val;
    }),
    database: [Pap, Vacina].map((val) => {
      if (!val) {
        throw new Error('Do you have "export default" in this file ? :  ./main/database/vacina.ts');
      }
      return val;
    }),
    maps: [Simplemap],
    worldMaps: [_main_worlds_myworldworld]
  })
], RpgServerModuleEngine);
const _main = {
  client: client$3,
  server: RpgServerModuleEngine
};
const client$2 = null;
const _rpgjs_mobile_gui = {
  client: client$2
};
const client$1 = null;
const _rpgjs_default_gui = {
  client: client$1
};
const client = null;
const _rpgjs_gamepad = {
  client
};
const modules = [
  _main,
  _rpgjs_mobile_gui,
  _rpgjs_default_gui,
  _rpgjs_gamepad
];
const globalConfig = { "startMap": "simplemap", "start": { "map": "simplemap", "graphic": "hero", "hitbox": [16, 16] }, "compilerOptions": { "build": { "pwaEnabled": true, "outputDir": "dist" } }, "modulesRoot": "", "autostart": true, "name": "HPV Game" };
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
expressServer(modules, {
  globalConfig,
  basePath: __dirname,
  envs: {
    VITE_BUILT: 1,
    VITE_SERVER_URL: void 0,
    VITE_GAME_URL: void 0,
    VITE_RPG_TYPE: "mmorpg",
    VITE_ASSETS_PATH: "",
    VITE_REACT: true
  }
}).then(({
  server,
  game
}) => {
  if (import.meta["hot"]) {
    import.meta["hot"].on("vite:beforeFullReload", () => {
      server.close();
      RpgWorld.getPlayers().forEach((player2) => {
        player2.gameReload();
      });
      game.stop();
    });
  }
});
