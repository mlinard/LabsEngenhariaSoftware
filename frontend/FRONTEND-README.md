# Frontend Documentation - Game Rate v4

## 📋 Visão Geral

O frontend é uma Single Page Application (SPA) construída com **JavaScript vanilla** seguindo o padrão **MVC (Model-View-Controller)**. Interface moderna e responsiva para avaliação de jogos.

## 🏗️ Arquitetura

### Stack Tecnológica
- **Frontend**: JavaScript ES6+, HTML5, CSS3
- **Arquitetura**: MVC Pattern
- **Styling**: CSS3 com Flexbox e Grid
- **Icons**: Emoji + CSS personalizado
- **Build**: Vanilla JavaScript (sem frameworks)

### Padrão MVC

#### Models (js/models/)
Gerenciam dados e lógica de negócio:

```javascript
// UserModel.js - Gerencia usuários e autenticação
class UserModel {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('gameRateUsers')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    }
    
    register(userData) { /* Lógica de registro */ }
    login(credentials) { /* Lógica de login */ }
    logout() { /* Lógica de logout */ }
}
```

- **UserModel.js** (357 linhas): Autenticação e perfil
- **GameModel.js** (166 linhas): Jogos e filtros  
- **ReviewModel.js** (333 linhas): Avaliações CRUD
- **SteamGameModel.js** (217 linhas): Integração Steam

#### Views (js/views/)
Renderizam interface do usuário:

```javascript
// Exemplo de renderização dinâmica
renderGameCard(game) {
    return `
        <div class="game-card" data-game-id="${game.id}">
            <img src="${game.image}" alt="${game.name}" loading="lazy">
            <div class="game-info">
                <h3>${game.name}</h3>
                <p class="price">R$ ${(game.price / 100).toFixed(2)}</p>
                <div class="game-actions">
                    <button class="btn btn-primary add-to-collection">
                        ➕ Adicionar
                    </button>
                    <button class="btn btn-outline rate-game">
                        ⭐ Avaliar
                    </button>
                </div>
            </div>
        </div>
    `;
}
```

#### Controllers (js/controllers/)
Conectam Models e Views:

- **AppController.js** (775 linhas): Controlador principal
- **AuthController.js** (120 linhas): Autenticação
- **GameController.js** (45 linhas): Operações de jogos
- **ReviewController.js** (255 linhas): Sistema de avaliações
- **ProfileController.js** (107 linhas): Perfil do usuário
- **CollectionController.js** (122 linhas): Coleção pessoal

## 🎯 Funcionalidades

### 🔐 Sistema de Autenticação
- **Login/Registro**: Modal responsivo
- **Validação**: Email, username, senha
- **Sessão**: Persistência via localStorage
- **Feedback**: Mensagens visuais de erro/sucesso

### 🎮 Catálogo de Jogos
- **Grid Responsivo**: Cards de jogos adaptáveis
- **Busca em Tempo Real**: Filtro por nome
- **Lazy Loading**: Carregamento otimizado de imagens
- **Integração Steam**: Dados da API local

### ⭐ Sistema de Avaliações
- **Modal de Avaliação**: Sistema de 5 estrelas
- **Feed de Reviews**: Timeline da comunidade
- **CRUD Completo**: Criar, editar, excluir
- **Validação**: Nota obrigatória + comentário opcional

### 📚 Coleção Pessoal
- **Minha Biblioteca**: Jogos salvos pelo usuário
- **Status**: Jogando, Concluído, Desejo Jogar
- **Estatísticas**: Contadores e métricas

### 👤 Perfil do Usuário
- **Dashboard**: Atividade e estatísticas
- **Avatar**: Upload de imagem de perfil
- **Histórico**: Todas as avaliações do usuário

## 🎨 Interface e Design

### Design System
```css
:root {
    /* Cores Primárias */
    --primary-blue: #007bff;
    --success-green: #28a745;
    --danger-red: #dc3545;
    --warning-yellow: #ffc107;
    
    /* Tipografia */
    --font-main: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
    --font-size-base: 16px;
    --line-height-base: 1.5;
    
    /* Espaçamento */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
}
```

### Componentes Principais

#### Header Navigation
```html
<header class="main-header">
    <div class="container">
        <div class="header-content">
            <div class="logo">
                <span class="logo-icon">🎮</span>
                <h1>Game Rate</h1>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="Buscar jogos...">
                <button class="search-btn">🔍</button>
            </div>
            <nav class="main-nav">
                <ul>
                    <li><a href="#home">Início</a></li>
                    <li><a href="#games">Jogos</a></li>
                    <li><a href="#collection">Coleção</a></li>
                    <li><a href="#profile">Perfil</a></li>
                </ul>
            </nav>
        </div>
    </div>
</header>
```

#### Game Cards
```css
.game-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    overflow: hidden;
}

.game-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.game-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
```

#### Review Modal
- **Sistema de Estrelas**: Interativo com hover effects
- **Textarea**: Comentários com contador de caracteres
- **Validação**: Feedback visual em tempo real
- **Responsivo**: Adaptável a mobile/desktop

## 📱 Responsividade

### Breakpoints
```css
/* Mobile First Approach */
.container {
    max-width: 100%;
    padding: 0 16px;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        max-width: 750px;
        margin: 0 auto;
    }
    
    .games-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
    }
    
    .games-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

/* Large Desktop */
@media (min-width: 1440px) {
    .games-grid {
        grid-template-columns: repeat(5, 1fr);
    }
}
```

### Mobile Features
- **Touch-friendly**: Botões 44px+ para toque
- **Swipe Gestures**: Navegação por gestos (planejado)
- **Responsive Images**: Otimização automática
- **Viewport Meta**: Configuração adequada

## 🔍 Busca e Filtros

### Implementação
```javascript
class SearchController {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Debounce para otimização
        let timeout;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });
    }
    
    performSearch(query) {
        const filteredGames = this.gameModel.searchGames(query);
        this.gameView.renderGamesList(filteredGames);
    }
}
```

### Funcionalidades de Busca
- **Busca Instantânea**: Resultados em tempo real
- **Debounce**: Otimização de performance (300ms)
- **Filtros**: Por gênero, preço, nota
- **Ordenação**: Nome, preço, popularidade, data

## 💾 Gerenciamento de Estado

### LocalStorage Strategy
```javascript
const Storage = {
    // Salvar dados
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    },
    
    // Carregar dados
    load(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Storage error:', error);
            return defaultValue;
        }
    },
    
    // Remover dados
    remove(key) {
        localStorage.removeItem(key);
    }
};
```

### Estado Global
```javascript
const AppState = {
    currentUser: null,
    games: [],
    reviews: [],
    collections: [],
    currentPage: 'home',
    isLoading: false,
    
    // Observers para mudanças de estado
    observers: [],
    
    setState(newState) {
        Object.assign(this, newState);
        this.notifyObservers();
    },
    
    subscribe(callback) {
        this.observers.push(callback);
    }
};
```

## 🎯 Performance

### Otimizações Implementadas
- **Lazy Loading**: Imagens carregadas sob demanda
- **Event Delegation**: Gerenciamento eficiente de eventos
- **Debouncing**: Busca otimizada
- **Virtual Scrolling**: Para listas grandes (planejado)
- **Code Splitting**: Carregamento modular (planejado)

### Web Vitals Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s  
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1

## 🔒 Segurança Frontend

### Validações
```javascript
const Validator = {
    email(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    
    username(username) {
        // 3-20 caracteres, alfanumérico + underscore
        const regex = /^[a-zA-Z0-9_]{3,20}$/;
        return regex.test(username);
    },
    
    password(password) {
        // Mínimo 8 caracteres, 1 letra, 1 número
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    },
    
    sanitizeInput(input) {
        return input
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/[<>'"]/g, '');
    }
};
```

### Proteções
- **XSS Prevention**: Sanitização de inputs
- **Input Validation**: Validação client-side robusta
- **CSRF**: Headers personalizados (planejado)
- **Content Security Policy**: Meta tags adequadas

## 🧪 Testing & Quality

### Browser Support
- ✅ **Chrome 80+**: Suporte completo
- ✅ **Firefox 75+**: Suporte completo  
- ✅ **Safari 13+**: Suporte completo
- ✅ **Edge 80+**: Suporte completo
- ⚠️ **IE 11**: Não suportado

### Manual Testing Checklist
- ✅ **Navegação**: Todas as páginas funcionais
- ✅ **Autenticação**: Login/logout/registro
- ✅ **CRUD Reviews**: Criar/editar/excluir avaliações
- ✅ **Responsividade**: Mobile/tablet/desktop
- ✅ **Performance**: Carregamento < 3s
- ✅ **Acessibilidade**: Keyboard navigation

## 🚀 Roadmap

### Próximas Features
- [ ] **PWA**: Service Worker e offline support
- [ ] **Dark Mode**: Tema escuro configurável
- [ ] **Real-time**: WebSocket para updates live
- [ ] **Social**: Seguir usuários, comments em reviews
- [ ] **Advanced Search**: Filtros mais sofisticados
- [ ] **Gamification**: Sistema de pontos e badges
- [ ] **i18n**: Suporte a múltiplos idiomas
- [ ] **Voice Search**: Busca por voz
- [ ] **AR/VR**: Preview de jogos em realidade aumentada

### Performance Goals
- [ ] **Lighthouse Score**: 95+ em todas as métricas
- [ ] **Bundle Size**: < 100KB gzipped
- [ ] **Time to Interactive**: < 2s
- [ ] **Memory Usage**: < 50MB em mobile

## 🐛 Troubleshooting

### Problemas Comuns

1. **Página em Branco**
```javascript
// Debug no console
console.log('App initialized:', window.app);
console.log('Current user:', AppState.currentUser);
console.log('LocalStorage data:', localStorage);
```

2. **Login Não Funciona**
```javascript
// Verificar dados salvos
console.log('Users:', JSON.parse(localStorage.getItem('gameRateUsers')));
console.log('Current user:', JSON.parse(localStorage.getItem('currentUser')));
```

3. **Imagens Não Carregam**
```javascript
// Verificar CORS e URLs
fetch('http://localhost:3000/api/steam-games')
    .then(response => response.json())
    .then(data => console.log('API Response:', data))
    .catch(error => console.error('API Error:', error));
```

### Debug Mode
```javascript
// Ativar logs detalhados
window.DEBUG = true;
window.app.enableDebugMode();

// Logs automáticos
if (window.DEBUG) {
    console.log(`[${new Date().toISOString()}] Action:`, action, data);
}
``` 