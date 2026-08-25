# Arquitetura da Solução — Achados e Perdidos (Escola)

## 1. Fluxo do sistema

```mermaid
flowchart TD
    A[Usuário] --> B{Login / Cadastro}
    B --> C[Cadastrar objeto perdido]
    B --> D[Cadastrar objeto achado]
    B --> E[Pesquisar objetos]
    C --> F[(Banco de dados)]
    D --> F
    E --> F
    F --> G[Marcar como devolvido]
    G --> F
```

## 2. Arquitetura em camadas

```mermaid
graph LR
    Frontend[Frontend - Web/Mobile] --> API[Backend API]
    API --> Auth[Módulo de autenticação]
    API --> Obj[Módulo de objetos]
    API --> Busca[Módulo de busca]
    Auth --> DB[(Banco de dados)]
    Obj --> DB
    Busca --> DB
```

## 3. Modelo de dados (entidades principais)

```mermaid
erDiagram
    USUARIO ||--o{ OBJETO : registra
    OBJETO {
        int id PK
        string tipo "perdido ou achado"
        string descricao
        string local
        string foto_url
        date data_registro
        boolean devolvido
    }
    USUARIO {
        int id PK
        string nome
        string email
        string papel "aluno, professor, funcionario, responsavel"
    }
```

## 4. Justificativa das escolhas

- **Frontend web/mobile**: atende ao RNF02 (funcionar em celulares e computadores).
- **Módulo de autenticação**: cobre RF01 e RNF04 (proteção dos dados de login).
- **Módulo de objetos**: cobre RF02, RF03, RF06 e RF07 (cadastro, devolução e data de registro).
- **Módulo de busca**: cobre RF04 e RF05 (listagem e pesquisa por palavra-chave).
- **Link para o Trello:** https://trello.com/b/dQmJsIdZ/achados-e-perdidos-projeto-escolar
