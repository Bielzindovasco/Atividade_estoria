document.addEventListener("DOMContentLoaded", function () {
  function getCurrentStep() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('step') || localStorage.getItem('lastStep') || 'inicio';
  }

  function renderStory(step) {
      const storyContainer = document.getElementById('story-container');

      const storySteps = {
          inicio: {
              text: "Você acorda em uma clareira silenciosa, cercado por árvores antigas e uma neblina espessa que cobre o chão. Seu corpo está dolorido, e a única coisa que lembra é uma explosão distante e uma sombra que passou por você. Sem lembrar como chegou ali, você se vê em um lugar que parece desolado e estranho. Há dois caminhos à sua frente: um segue em direção a uma floresta densa e sombria, o outro leva a uma estrada aberta que se estende por entre campos secos e rochas escarpadas. Uma sensação de urgência toma conta de você, como se algo estivesse esperando para ser encontrado. Qual caminho você irá seguir?",
              options: [
                  { text: "Seguir o caminho da floresta sombria", step: 'floresta' },
                  { text: "Ir pela estrada aberta", step: 'estrada' },
              ]
          },

          floresta: {
              text: "Você decide seguir o caminho da floresta sombria. À medida que avança, as árvores se tornam mais altas e densas, e a névoa se intensifica, tornando a visibilidade cada vez mais difícil. O som do vento passando pelas folhas cria uma sensação inquietante, e algo parece te observar. Depois de algum tempo, você chega a uma pequena clareira onde uma figura encapuzada está parada, observando uma pedra grande e esculpida com símbolos antigos. A figura se vira para você e diz: 'Você está em busca do Coração de Yloria, não é?'.",
              options: [
                  { text: "Perguntar sobre o Coração de Yloria", step: 'figura' },
                  { text: "Continuar em silêncio e observar", step: 'figurasilencio' },
              ]
          },

          estrada: {
              text: "Você escolhe seguir pela estrada aberta. O céu está nublado, e uma sensação de vazio parece pairar sobre o caminho. A estrada segue em linha reta, sem desvios, e o som dos seus passos ecoa em um ambiente solitário. Após algum tempo, você encontra um velho viajante sentado ao lado da estrada, com um mapa rasgado nas mãos. Ele olha para você e diz: 'Cuidado, jovem, a estrada à frente não é o que parece. Se você seguir, jamais será o mesmo.'",
              options: [
                  { text: "Perguntar ao viajante sobre o que ele sabe", step: 'viajante' },
                  { text: "Ignorar o viajante e continuar na estrada", step: 'estrada-silencio' },
              ]
          },

          figura: {
              text: "Você pergunta à figura sobre o Coração de Yloria, e ela responde: 'O Coração de Yloria é uma antiga força que pode conceder poderes imensos, mas também pode destruir quem tentar usá-lo sem entender seus perigos. Muitos já caíram em busca dele, mas poucos sobreviveram à jornada. Você tem coragem para enfrentar o que vem a seguir?' Ela então aponta para um portal brilhante, que se materializa diante de seus olhos.",
              options: [
                  { text: "Entrar no portal", step: 'portal' },
                  { text: "Sair da floresta e voltar ao início", step: 'inicio' },
              ]
          },

          figurasilencio: {
              text: "Você decide permanecer em silêncio, apenas observando a figura e a pedra. De repente, o ambiente ao redor começa a mudar. As árvores parecem se mover, e a terra abaixo de seus pés começa a tremer. A figura sorri por baixo do capuz e diz: 'Você sabia que todos os caminhos levam ao mesmo lugar?'. Um portal surge diante de você, pulsando com uma energia estranha.",
              options: [
                  { text: "Entrar no portal", step: 'portal' },
                  { text: "Voltar para o início", step: 'inicio' },
              ]
          },

          viajante: {
              text: "Você pergunta ao velho viajante o que ele sabe sobre a estrada à frente. Ele olha para você com um sorriso triste e diz: 'A estrada parece simples, mas a verdadeira jornada começa quando você escolhe seguir em frente. Muitos que passaram por aqui nunca mais voltaram. Você precisa decidir por si mesmo o que está disposto a arriscar.'",
              options: [
                  { text: "Seguir em frente, ignorando os avisos", step: 'estradafinal' },
                  { text: "Voltar e recomeçar sua jornada", step: 'inicio' },
              ]
          },

          estradasilencio: {
              text: "Você decide ignorar o viajante e continuar na estrada, sem fazer perguntas. O caminho parece não ter fim, e a sensação de solidão se intensifica. Após horas de caminhada, você encontra uma bifurcação no caminho, com duas estradas levando a diferentes direções: uma segue para uma floresta densa e escura, a outra para uma montanha coberta de neve. O que você fará agora?",
              options: [
                  { text: "Seguir para a floresta", step: 'florestafinal' },
                  { text: "Seguir para a montanha", step: 'montanha' },
              ]
          },

          portal: {
              text: "Você decide entrar no portal. Ao atravessar, uma sensação de frio intenso toma conta do seu corpo. Você chega a um novo mundo, onde as cores são distorcidas e o céu parece estar sempre escuro. À sua frente, há uma cidade sombria, com torres altas e ruas vazias. Um homem misterioso aparece e diz: 'Você chegou. Agora, o destino está em suas mãos.'",
              options: [
                  { text: "Explorar a cidade", step: 'cidade' },
                  { text: "Sair da cidade e voltar ao início", step: 'inicio' },
              ]
          },

          cidade: {
              text: "Você decide explorar a cidade sombria. As ruas estão desertas, mas você sente uma presença em cada esquina. As portas das casas estão trancadas, e as janelas estão cobertas. Quando você chega à praça central, uma voz ecoa no ar: 'Você fez sua escolha. Agora, encare as consequências.' De repente, a terra começa a tremer.",
              options: [
                  { text: "Procurar uma saída", step: 'saida' },
                  { text: "Enfrentar o que está por vir", step: 'enfrentar' },
              ]
          },

          saida: {
              text: "Você decide procurar uma saída da cidade sombria. Anda por ruas labirínticas até encontrar uma porta de ferro enferrujada. Quando a abre, é recebido por uma luz intensa, e você é transportado de volta ao início da sua jornada, onde as escolhas são suas para fazer novamente.",
              options: [
                  { text: "Recomeçar sua jornada", step: 'inicio' }
              ]
          },

          enfrentar: {
              text: "Você decide enfrentar o que está por vir. Uma enorme sombra surge da terra, uma criatura gigantesca formada por névoa e fúria. A batalha será difícil, mas você sente que, de alguma forma, está pronto. A luta contra a escuridão começa.",
              options: [
                  { text: "Continuar lutando", step: 'finalluta' },
                  { text: "Tentar fugir", step: 'finalfuga' },
              ]
          },

          finalluta: {
              text: "Após uma luta árdua, você consegue derrotar a criatura. O mundo ao seu redor começa a se desfazer, e você se vê de volta à clareira inicial, agora com uma sensação de poder e sabedoria que jamais imaginou. O Coração de Yloria está em suas mãos.",
              options: [
                  { text: "Recomeçar sua jornada", step: 'inicio' }
              ]
          },

          finalfuga: {
              text: "Você decide fugir da batalha, mas ao virar as costas, a sombra se espalha por todo o mundo. A escuridão consome tudo o que você conheceu. A jornada chega ao fim, e você é envolvido pela escuridão eterna.",
              options: [
                  { text: "Recomeçar sua jornada", step: 'inicio' }
              ]
          }
      };

      const stepData = storySteps[step] || storySteps['inicio'];
      storyContainer.innerHTML = `<p>${stepData.text}</p>`;

      stepData.options.forEach(option => {
          const link = document.createElement('a');
          link.href = `?step=${option.step}`;
          link.textContent = option.text;
          link.addEventListener('click', function (event) {
            event.preventDefault();
            localStorage.setItem('lastStep', option.step);
            window.location.search = `?step=${option.step}`;
        });

        storyContainer.appendChild(link);
        storyContainer.appendChild(document.createElement('br'));
    });
}

const currentStep = getCurrentStep();
renderStory(currentStep);
});
