# 🎮 GameRate

**GameRate** é uma aplicação web desenvolvida como projeto acadêmico, com o objetivo de permitir que usuários avaliem, comentem e organizem seus jogos de videogame favoritos. O sistema foi inspirado no funcionamento do Letterboxd, mas adaptado ao universo gamer.

---

## 📁 Organização do Repositório

O repositório está dividido em duas partes principais: **backend** e **frontend**, com subpastas e arquivos bem definidos para cada camada do projeto.

### 🔧 `/backend`
Responsável pela lógica de negócio e persistência de dados da aplicação.

**Estrutura:**
- `js/controllers/` – Contém os controladores responsáveis pelas rotas:
  - `AppController.js`
  - `AuthController.js`
  - `CollectionController.js`
  - `GameController.js`
  - `ProfileController.js`
  - `ReviewController.js`
  - `SteamGameController.js`

- `js/models/` – Define os modelos que interagem com o banco de dados:
  - `GameModel.js`
  - `ReviewModel.js`
  - `SteamGameModel.js`
  - `UserModel.js`

- `js/views/` – Componentes visuais e modais JS para renderização no front-end:
  - `AuthView.js`, `GameView.js`, `ProfileView.js`, etc.

**Arquivos adicionais:**
- `api-server.js` – Servidor principal da aplicação
- `games.db` – Banco de dados SQLite
- `create-games-db.py` – Script para geração do banco
- `login.js`, `main.js`, `script.js` – Scripts auxiliares

**Documentação do back-end:**
- `BACKEND-README.md`
- `API-README.md`
- `SETUP-README.md`
- `PROJECT-STRUCTURE-README.md`

---

### 🖥️ `/frontend`
Contém a interface do usuário, desenvolvida com HTML, CSS e JavaScript.

**Estrutura:**
- `index.html` – Página principal
- `test-auth.html` – Tela de login/cadastro
- `css/` – Arquivos de estilo (`style.css`, `login.css`)
- `js/` – Scripts de interação
- `public/` – Imagens e assets do projeto
  - Inclui subpastas como `img/` e imagens de jogos

**Documentação do front-end:**
- `FRONTEND-README.md`

---

## 📂 Outras pastas e arquivos

- `.gitignore` – Padrões ignorados no versionamento
- `package.json` e `package-lock.json` – Gerenciadores de dependências
- `node_modules/` – Dependências do projeto
- `docs/` – Documentação complementar

---


