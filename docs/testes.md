# Relatório de Validação — Achados e Perdidos

Esse arquivo mostra os testes que eu fiz no sistema pra garantir que tudo
funciona como deveria.

## O que testei

**1. Criar conta e fazer login**
Criei uma conta com e-mail e senha. Deu certo, entrei direto na tela de
listagem de objetos.

**2. Cadastrar um objeto achado**
Cadastrei um objeto achado ("Achei o Shadow fugindo do Sonic", achado na
diretoria do CTBJ), com foto, descrição e local. O objeto apareceu
certinho na listagem, com a data de registro preenchida sozinha.

**3. Cadastrar um objeto perdido**
Cadastrei também um objeto perdido ("perdi meu jogo", na sala do 3B).
Apareceu na listagem marcado como "Perdido".

**4. Buscar por palavra-chave**
Testei buscar por "Diretoria" e por "Sala do 3B" no campo de busca. Em
cada busca, só apareceu o objeto correspondente, confirmando que o filtro
funciona certo.

**5. Filtrar por tipo (Perdidos / Achados)**
Cliquei nas abas "Perdidos" e "Achados" separadamente, e a lista mudou
corretamente pra mostrar só os objetos de cada tipo.

**6. Marcar objeto como devolvido**
Abri um objeto que eu mesma tinha cadastrado e cliquei em "Marcar como
devolvido". O status mudou na hora pra "Devolvido".

**7. Teste de segurança — só o dono pode marcar como devolvido**
Sem nem planejar, acabei
