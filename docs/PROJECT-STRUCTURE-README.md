# Project Structure - Game Rate v4

## 📋 Visão Geral

O Game Rate v4 é organizado em uma estrutura **full-stack** que combina backend (Node.js/Express) e frontend (JavaScript vanilla MVC) em um único repositório. Arquitetura monolítica com separação clara de responsabilidades.

## 🌳 Estrutura Completa do Projeto

```
gameRatev4/
├── 📁 .git/                          # Controle de versão Git
├── 📁 .vscode/                       # Configurações do VS Code
├── 📁 node_modules/                  # Dependências Node.js (ignorado)
├── 📁 css/                           # Estilos do frontend
│   ├── 📄 style.css                 # Estilos principais (1567 linhas)
│   └── 📄 login.css                 # Estilos de autenticação (388 linhas)
├── 📁 html/                          # Páginas HTML auxiliares
│   └── 📄 test-auth.html            # Página de teste de autenticação
├── 📁 js/                           # JavaScript (backend + frontend)
│   ├── 📄 api-server.js             # 🔧 Servidor Express (68 linhas)
│   ├── 📄 main.js                   # 🎯 Entry point do frontend (31 linhas)
│   ├── 📄 login.js                  # 🔐 Script de login (259 linhas)
│   ├── 📁 controllers/              # 🎮 Controladores MVC
│   │   ├── 📄 AppController.js      # Controlador principal (775 linhas)
│   │   ├── 📄 AuthController.js     # Autenticação (120 linhas)
│   │   ├── 📄 GameController.js     # Jogos (45 linhas)
│   │   ├── 📄 ProfileController.js  # Perfil (107 linhas)
│   │   ├── 📄 ReviewController.js   # Avaliações (255 linhas)
│   │   ├── 📄 CollectionController.js # Coleção (122 linhas)
│   │   └── 📄 SteamGameController.js # Steam API (34 linhas)
│   └── 📁 models/                   # 📊 Modelos de dados
│       ├── 📄 GameModel.js          # Modelo de jogos (166 linhas)
│       ├── 📄 UserModel.js          # Modelo de usuários (357 linhas)
│       ├── 📄 ReviewModel.js        # Modelo de reviews (333 linhas)
│       └── 📄 SteamGameModel.js     # Modelo Steam (217 linhas)
├── 📁 imagens/                       # Assets visuais
│   └── 📄 Jogo Elden Ring.jpeg      # Imagem de exemplo
├── 📄 index.html                     # 🏠 Página principal (431 linhas)
├── 📄 create-games-db.py            # 🐍 Script Python para popular DB (48 linhas)
├── 📄 games.db                       # 🗄️ Banco SQLite (8KB, ~10 jogos)
├── 📄 package.json                   # 📦 Dependências Node.js
├── 📄 package-lock.json              # 🔒 Lock das dependências
├── 📄 requirements.txt               # 🐍 Dependências Python
├── 📄 .gitignore                     # 🚫 Arquivos ignorados pelo Git
├── 📄 FRONTEND-README.md             # 📚 Doc do Frontend
├── 📄 BACKEND-README.md              # 📚 Doc do Backend
├── 📄 API-README.md                  # 📚 Doc da API
├── 📄 PROJECT-STRUCTURE-README.md    # 📚 Doc da Estrutura (este arquivo)
└── 📄 SETUP-README.md                # 📚 Doc de Instalação
```

## 🏗️ Arquitetura em Camadas

### Layer 1: Frontend (Presentation)
```
frontend/
├── index.html              # Single Page Application
├── css/                    # Styling layer
│   ├── style.css          # Core styles, components, responsive
│   └── login.css          # Authentication-specific styles
└── js/                     # JavaScript MVC architecture
    ├── main.js            # Application bootstrap
    ├── login.js           # Authentication logic
    ├── controllers/       # User interaction handlers
    ├── models/            # Data management & business logic
    └── views/             # DOM manipulation & rendering
```

### Layer 2: Backend (Business Logic)
```
backend/
├── js/api-server.js       # Express.js REST API server
├── models/                # Data access layer
└── middleware/            # CORS, static files, error handling
```

### Layer 3: Data (Persistence)
```
data/
├── games.db               # SQLite database
├── create-games-db.py     # Database seeding script
└── requirements.txt       # Python dependencies
```

## 📁 Detalhamento por Diretório

### `/css/` - Estilos e Design
**Propósito**: Toda a camada visual da aplicação

| Arquivo    | Tamanho | Responsabilidade                      |
|------------|---------|---------------------------------------|
| style.css  | 26KB    | Layout, componentes, responsive design|
| login.css  | 6.4KB   | Modais de auth, forms, validação     |

**Estrutura do CSS:**
```css
/* style.css organization */
:root { /* CSS Custom Properties */ }
* { /* CSS Reset */ }
.container { /* Layout system */ }
.btn { /* Button components */ }
.modal { /* Modal components */ }
.game-card { /* Game display */ }
@media { /* Responsive breakpoints */ }
```

### `/js/` - Lógica da Aplicação
**Propósito**: Toda a lógica JavaScript (frontend + backend)

#### `/js/controllers/` - Controladores MVC
| Arquivo                | Linhas | Responsabilidade                    |
|------------------------|--------|-------------------------------------|
| AppController.js       | 775    | 🎯 Core app, navigation, routing   |
| AuthController.js      | 120    | 🔐 Login, register, session mgmt   |
| GameController.js      | 45     | 🎮 Game operations, display        |
| ProfileController.js   | 107    | 👤 User profile management         |
| ReviewController.js    | 255    | ⭐ Reviews CRUD operations         |
| CollectionController.js| 122    | 📚 Personal game collection        |
| SteamGameController.js | 34     | 🎯 Steam API integration           |

#### `/js/models/` - Modelos de Dados
| Arquivo           | Linhas | Responsabilidade                     |
|-------------------|--------|--------------------------------------|
| UserModel.js      | 357    | 👥 User data, auth, localStorage    |
| GameModel.js      | 166    | 🎮 Game data, filtering, search     |
| ReviewModel.js    | 333    | ⭐ Reviews data, CRUD operations    |
| SteamGameModel.js | 217    | 🎯 Steam API calls, caching        |

#### Arquivos Principais
| Arquivo       | Linhas | Responsabilidade                      |
|---------------|--------|---------------------------------------|
| api-server.js | 68     | 🔧 Express server, REST endpoints    |
| main.js       | 31     | 🎯 Frontend entry point              |
| login.js      | 259    | 🔐 Standalone login functionality    |

### `/html/` - Páginas Auxiliares
**Propósito**: Páginas HTML especializadas para testes e desenvolvimento

| Arquivo         | Responsabilidade                    |
|-----------------|-------------------------------------|
| test-auth.html  | 🧪 Testing authentication flows   |

### `/imagens/` - Assets Visuais
**Propósito**: Imagens locais, logos, placeholders

| Arquivo              | Uso                              |
|----------------------|----------------------------------|
| Jogo Elden Ring.jpeg | 🖼️ Hero section, exemplo visual |

## 🔧 Arquivos de Configuração

### `package.json` - Configuração Node.js
```json
{
  "name": "game-rate",
  "version": "1.0.0",
  "main": "api-server.js",
  "scripts": {
    "start": "node js/api-server.js",
    "create-db": "python create-games-db.py"
  },
  "dependencies": {
    "express": "^4.18.2",
    "sqlite3": "^5.1.6"
  }
}
```

### `requirements.txt` - Dependências Python
```
requests==2.31.0
```

### `.gitignore` - Arquivos Ignorados
```gitignore
# Database files
*.db
*.sqlite

# Node.js
node_modules/
npm-debug.log*

# Python
__pycache__/
*.py[cod]

# IDE & System
.vscode/
.DS_Store
```

## 📊 Métricas do Projeto

### Tamanho do Código
```
Total Lines of Code: ~3,500
├── JavaScript: ~2,100 linhas (60%)
├── CSS: ~1,900 linhas (35%)
├── HTML: ~450 linhas (13%)
├── Python: ~50 linhas (1%)
└── Config: ~50 linhas (1%)
```

### Distribuição por Componente
```
Frontend MVC: ~1,500 linhas
├── Controllers: ~900 linhas
├── Models: ~600 linhas
└── Views: Integrated in HTML/CSS

Backend API: ~70 linhas
CSS Styling: ~1,900 linhas
HTML Markup: ~450 linhas
```

### Arquivos por Categoria
```
📁 JavaScript Files: 12
├── Controllers: 7
├── Models: 4
└── Main files: 3

📁 Configuration: 6
├── package.json
├── requirements.txt
├── .gitignore
└── Documentation: 5 READMEs

📁 Assets: 2
├── CSS: 2
└── Images: 1
```

## 🔄 Fluxo de Dados

### Frontend ↔ Backend Communication
```
Browser
    ↓ HTTP Request
Express.js Server (api-server.js)
    ↓ SQL Query
SQLite Database (games.db)
    ↓ Results
Express.js Response
    ↓ JSON Data
Frontend MVC Processing
    ↓ DOM Update
User Interface
```

### MVC Data Flow
```
User Interaction
    ↓
View (DOM Events)
    ↓
Controller (Event Handlers)
    ↓
Model (Data Processing)
    ↓
LocalStorage/API Calls
    ↓
Controller (Response Handling)
    ↓
View (DOM Updates)
    ↓
Updated UI
```

## 🔐 Padrões de Segurança

### File Organization Security
```
✅ Separation of Concerns
├── Public files in root (index.html, css/, js/)
├── Private logic in js/models/ (data handling)
├── Database isolated (games.db)
└── No sensitive data in frontend

⚠️ Security Considerations
├── API server CORS configuration
├── SQLite query parameterization
├── No authentication secrets in code
└── Input validation in models
```

## 📦 Dependências e Bibliotecas

### Runtime Dependencies
```json
{
  "express": "^4.18.2",    // Web server framework
  "sqlite3": "^5.1.6"      // Database driver
}
```

### Development Tools
- **Git**: Version control
- **VS Code**: IDE configuration (.vscode/)
- **Python**: Database seeding script

### External APIs
- **Steam Store API**: Game data source
- **No authentication required**
- **Rate limiting**: Not implemented yet

## 🚀 Build and Deployment

### Local Development
```bash
# No build step required
npm install              # Install Node.js deps
python create-games-db.py  # Create database
npm start               # Start server
```

### Production Ready
```
✅ Static file serving via Express
✅ Single SQLite database file
✅ No external dependencies for frontend
✅ Self-contained backend
⚠️ No minification/bundling yet
⚠️ No production database solution
```

## 🎯 Pontos de Entrada

### Main Entry Points
1. **`index.html`**: Main application page
2. **`js/api-server.js`**: Backend server startup
3. **`js/main.js`**: Frontend application initialization
4. **`create-games-db.py`**: Database setup

### Development Entry Points
1. **`html/test-auth.html`**: Authentication testing
2. **`js/login.js`**: Standalone auth logic
3. **Package.json scripts**: npm start, npm run create-db

## 🔄 Data Flow Patterns

### Request/Response Cycle
```
1. User opens index.html
2. main.js initializes MVC components
3. Controllers bind to DOM events
4. User actions trigger controller methods
5. Controllers call model methods
6. Models make API calls to js/api-server.js
7. API server queries games.db
8. Results flow back through the chain
9. Views update DOM with new data
```

### State Management
```
LocalStorage (Client-side)
├── User authentication data
├── User preferences
├── Game collection data
└── Review drafts

SQLite Database (Server-side)
├── Steam games catalog
└── Game metadata (id, name, image, price)
```

## 🧩 Módulos e Componentes

### Frontend Modules
```javascript
// Core MVC Architecture
AppController.js        // Main application orchestrator
├── AuthController.js   // Authentication module
├── GameController.js   // Game management
├── ReviewController.js // Review system
├── ProfileController.js // User profiles
└── CollectionController.js // Personal collections

// Data Layer
UserModel.js           // User data management
├── GameModel.js       // Game data processing
├── ReviewModel.js     // Review CRUD operations
└── SteamGameModel.js  // Steam API integration
```

### Backend Modules
```javascript
// Single-file Express server
api-server.js
├── CORS middleware
├── Static file serving
├── SQLite connection
├── REST endpoints
└── Error handling
```

## 📈 Escalabilidade

### Current Architecture Limits
- **Single SQLite file**: ~1M records max
- **No caching**: Each request hits database
- **No load balancing**: Single server instance
- **LocalStorage only**: No user persistence between devices

### Planned Improvements
- **Database**: Migration to PostgreSQL
- **Caching**: Redis for frequent queries
- **Authentication**: JWT tokens
- **File organization**: Separate frontend/backend repos
- **Build process**: Webpack/Vite for frontend bundling