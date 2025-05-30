# Game Rate - Front-end MVC Implementation

Esta é uma aplicação front-end para avaliação de jogos, implementada utilizando o padrão de arquitetura MVC (Model-View-Controller).

## Estrutura MVC

O código foi organizado seguindo o padrão MVC para melhorar a manutenibilidade e escalabilidade:

### 1. Model (Modelo)

Localizado em `js/models/`, os modelos gerenciam os dados e a lógica de negócios da aplicação:

- **UserModel.js**: Gerencia dados e operações relacionadas ao usuário (autenticação, perfil)
- **GameModel.js**: Gerencia dados e operações relacionadas aos jogos (listagem, filtros, detalhes)
- **ReviewModel.js**: Gerencia dados e operações relacionadas às avaliações (criação, listagem, edição)
- **SteamGameModel.js**: Gerencia dados de jogos da Steam obtidos do banco de dados SQLite

### 2. View (Visualização)

Localizado em `js/views/`, as visualizações são responsáveis pela interface do usuário:

- **HomeView.js**: Gerencia a exibição da página inicial
- **FeedView.js**: Gerencia a exibição do feed de avaliações
- **ProfileView.js**: Gerencia a exibição do perfil do usuário
- **GameView.js**: Gerencia a exibição do catálogo de jogos e detalhes
- **AuthView.js**: Gerencia a exibição dos modais de login e registro
- **ReviewModalView.js**: Gerencia a exibição do modal de avaliação

### 3. Controller (Controlador)

Localizado em `js/controllers/`, os controladores conectam os modelos e as visualizações:

- **AppController.js**: Controlador principal que gerencia a navegação e inicialização
- **AuthController.js**: Gerencia as operações de autenticação
- **GameController.js**: Gerencia as operações relacionadas aos jogos
- **ReviewController.js**: Gerencia as operações de avaliação
- **ProfileController.js**: Gerencia as operações do perfil do usuário
- **SteamGameController.js**: Gerencia operações relacionadas aos jogos da Steam

## Fluxo de Dados

1. O usuário interage com a View (ex: clica em um botão)
2. A View notifica o Controller sobre a ação
3. O Controller manipula o Model conforme necessário (ex: busca/atualiza dados)
4. O Model notifica o Controller sobre mudanças nos dados
5. O Controller atualiza a View com os novos dados
6. A View renderiza a nova interface para o usuário

## Integração com Steam

A aplicação inclui integração com a loja Steam, usando um banco de dados SQLite para armazenar informações de jogos populares:

1. Um script Python (`create-games-db.py`) busca informações de 10 jogos populares da API da Steam
2. Os dados são armazenados em um banco de dados SQLite (`games.db`)
3. Um servidor Express (`api-server.js`) fornece endpoints de API para acessar esses dados
4. O frontend consome esses dados através do `SteamGameModel.js`

## Vantagens da Arquitetura MVC

- **Separação de Responsabilidades**: Cada componente tem uma função clara e específica
- **Manutenibilidade**: Facilita a manutenção e evolução do código
- **Testabilidade**: Permite testar componentes de forma isolada
- **Reutilização**: Componentes podem ser reutilizados em diferentes partes da aplicação
- **Escalabilidade**: Facilita a adição de novos recursos sem afetar o código existente

## Como Executar

1. Instale as dependências: `npm install`
2. Crie o banco de dados: `npm run create-db`
3. Inicie o servidor: `npm start`
4. Acesse a aplicação em: `http://localhost:3000`

# Game Rate v4 - Database Creator

Este projeto cria um banco de dados SQLite com informações de jogos populares obtidas da API da Steam.

## 📋 Descrição

O script `create-games-db.py` busca informações de 10 jogos populares na Steam Store API e armazena os dados em um banco SQLite local.

## 🎮 Jogos incluídos

- Elden Ring
- Hades
- Cyberpunk 2077
- Hollow Knight
- FIFA 23
- GTA V
- God of War
- Zelda
- Baldur's Gate 3
- The Witcher 3

## 🚀 Como usar

1. Instale as dependências:
```bash
pip install requests
```

2. Execute o script:
```bash
python create-games-db.py
```

3. O arquivo `games.db` será criado com os dados dos jogos.

## 📊 Estrutura do banco

```sql
CREATE TABLE games (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    price INTEGER
)
```

## 🛠️ Tecnologias

- Python 3
- SQLite3
- Requests
- Steam Store API

## 📝 Notas

- Os preços são obtidos em centavos
- As imagens são URLs das miniaturas da Steam
- O script usa `INSERT OR IGNORE` para evitar duplicatas 