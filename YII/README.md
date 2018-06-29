# Trabalho Prático Final
> 21/06/2018 ⇒ 04/07/2018

## regras do trabalho prático

1. [ ] Todos os exercícios propostos ao longo dos slides sobre o framework Yii deverão ser implementados dentro do próprio sistema. São um total de 17 exercícios práticos.
2. [ ] Deverá ser criado um controlador chamado Jogo (`JogoController`), que deverá possuir apenas três actions: `index`, `ranking` e `save`. O jogo SkiFree deverá ser incorporado na action `jogo/index`. Deverá ser criado um botão com o label **Iniciar Jogo!** na páginal principal do sistema, que ao ser clicado irá direcionar o usuário para essa action.
3. [ ] A action `jogo/ranking` deverá mostrar um ranking com os jogadores que mais pontuaram no jogo SkiFree.
4. [ ] A action `jogo/save` deverá ser usada para salvar (na tabela jogada do banco de dados) a pontuação que os usuários obtiveram no jogo SkiFree. Como o jogo foi implementado em JavaScript, a pontuação alcançada por um dado usuário em uma dada partida do jogo será armazenada em uma variável dessa linguagem. Para que essa pontuação seja guardada no banco de dados, ela deverá ser passada da view `index` (onde está o código do jogo SkiFree) para a action `jogo/save` através de uma requisição AJAX. Esta, por sua vez, deverá ler a pontuação enviada através da requisição AJAX, identificar o `id` do jogador, e salvar tais dados em uma nova linha (ou atualizar) da tabela **jogada**.