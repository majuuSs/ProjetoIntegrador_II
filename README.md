# ProjetoIntegrador_II

# Achados e Perdidos - Escola
Sistema para registro e consulta de objetos achados e perdidos dentro do ambiente escolar, facilitando o reencontro entre donos e itens encontrados.
## Sobre o Projeto
O projeto busca facilitar a comunicação sobre objetos perdidos e encontrados na escola. Pelo sistema, qualquer pessoa poderá registrar algo que perdeu ou encontrou e consultar os objetos cadastrados, sem precisar ficar procurando pela escola.
## Objetivo
Centralizar em um único sistema as informações sobre objetos perdidos e achados na escola, reduzindo o tempo e o esforço necessários para reencontrar pertences. Pois as vezes as pessoas saem procurando pelo objeto perdido na escola toda e não encontra, o aplicativo tem como objetivo reduzir essa perda de tempo.
## Público-alvo
Alunos, professores, funcionários das escolas e pais ou responsáveis.
Os responsáveis poderão utilizar quando a escola for uma escola infantil onde muitas crianças não têm celular ainda, aí o responsável pala criança pode procurar objetos que a criança perdeu ou cadastrar algo.
##Tecnologias
A definir nas próximas etapas do projeto 
## Resultado final
Link do site finalizado: https://majuuss.github.io/ProjetoIntegrador_II/
Sistema de achados e perdidos da escola, com login, cadastro de objetos
achados e perdidos, busca por palavra-chave e controle de devolução.
## Como executar o projeto

Pra rodar o projeto, o caminho mais simples é esse:

1. Clona o repositório: (git clone)
2. Abre a pasta no VS Code.
3. Instala a extensão **Live Server**.
4. Clica com o botão direito no arquivo `index.html` e escolhe **"Open with Live Server"**.
5. O site abre no navegador, já conectado ao banco de dados na nuvem, não precisa instalar mais nada além do Live Server.

## Resultados finais

No fim das contas, o sistema ficou funcionando exatamente do jeito que planejei lá no início:

- Dá pra criar conta e fazer login com segurança
- Dá pra cadastrar um objeto achado ou perdido, com foto, descrição, local e data de registro automática
- Dá pra buscar por palavra-chave ou filtrar entre perdidos e achados
- Dá pra marcar um objeto como devolvido — e essa função só funciona mesmo pra quem cadastrou o item, a eu testei na prática e confirmo que funciona certinho
- O site se ajusta bem tanto no computador quanto no celular
- Os dados de login ficam protegidos pelo próprio sistema de autenticação do Firebase, sem nenhuma senha exposta

Os testes completos que fiz estão detalhados no arquivo testes.md.
