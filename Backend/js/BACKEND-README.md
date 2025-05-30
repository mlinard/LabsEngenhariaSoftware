# Game Rate v4 - Backend Documentation

## 📋 Visão Geral

O backend do Game Rate v4 é uma API REST construída com Node.js e Express.js que fornece dados de jogos da Steam através de um banco de dados SQLite local.

## 🏗️ Arquitetura

### Componentes Principais

- **API Server** (`js/api-server.js`): Servidor Express.js principal
- **Database** (`games.db`): Banco de dados SQLite com informações dos jogos
- **Database Creator** (`create-games-db.py`): Script Python para popular o banco

### Stack Tecnológica

- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Database**: SQLite3 5.1.6
- **CORS**: Habilitado para requisições cross-origin

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Python 3.x (para criação do banco)

### Instalação

1. **Instalar dependências do Node.js:**
```bash
npm install
```

2. **Instalar dependências do Python:**
```bash
pip install -r requirements.txt
```

3. **Criar o banco de dados:**
```bash
python create-games-db.py
```

4. **Iniciar o servidor:**
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints Disponíveis

#### 1. Listar Todos os Jogos
```http
GET /api/steam-games
```

**Resposta:**
```json
[
  {
    "id": 1245620,
    "name": "ELDEN RING",
    "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_sm_120.jpg",
    "price": 14999
  },
  ...
]
```

#### 2. Buscar Jogo por ID
```http
GET /api/steam-games/:id
```

**Parâmetros:**
- `id` (integer): ID único do jogo na Steam

**Resposta de Sucesso (200):**
```json
{
  "id": 1245620,
  "name": "ELDEN RING",
  "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_sm_120.jpg",
  "price": 14999
}
```

**Resposta de Erro (404):**
```json
{
  "error": "Game not found"
}
```

## 🗄️ Estrutura do Banco de Dados

### Tabela: `games`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INTEGER | ID único do jogo (Primary Key) |
| `name` | TEXT | Nome do jogo |
| `image` | TEXT | URL da imagem/thumbnail |
| `price` | INTEGER | Preço em centavos |

### Exemplo de Registro
```sql
INSERT INTO games (id, name, image, price) VALUES (
  1245620,
  'ELDEN RING',
  'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_sm_120.jpg',
  14999
);
```

## 🔧 Configuração do Servidor

### CORS
O servidor está configurado para aceitar requisições de qualquer origem:
```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
```

### Arquivos Estáticos
O servidor serve arquivos estáticos do diretório raiz:
```javascript
app.use(express.static('./'));
```

### Tratamento de Erros
- **500**: Erro interno do servidor (problemas com banco de dados)
- **404**: Recurso não encontrado

## 🎮 Jogos Incluídos

O banco de dados é populado com os seguintes jogos populares:

1. **Elden Ring**
2. **Hades**
3. **Cyberpunk 2077**
4. **Hollow Knight**
5. **FIFA 23**
6. **GTA V**
7. **God of War**
8. **Zelda**
9. **Baldur's Gate 3**
10. **The Witcher 3**

## 🔄 Scripts NPM

```json
{
  "start": "node js/api-server.js",
  "create-db": "python create-games-db.py"
}
```

- **`npm start`**: Inicia o servidor de produção
- **`npm run create-db`**: Executa o script de criação do banco

## 🛠️ Desenvolvimento

### Estrutura de Arquivos
```
├── js/
│   ├── api-server.js          # Servidor principal
│   ├── controllers/           # Controladores MVC
│   ├── models/               # Modelos de dados
│   └── views/                # Views do frontend
├── create-games-db.py        # Script de criação do banco
├── games.db                  # Banco de dados SQLite
├── package.json              # Dependências Node.js
└── requirements.txt          # Dependências Python
```

### Logs
O servidor exibe logs para:
- Conexão com o banco de dados
- Requisições HTTP
- Erros de banco de dados
- Shutdown graceful

### Shutdown Graceful
O servidor trata o sinal SIGINT para fechar a conexão com o banco adequadamente:
```javascript
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});
```

## 🔍 Troubleshooting

### Problemas Comuns

1. **Erro: "Cannot find module 'express'"**
   - Solução: Execute `npm install`

2. **Erro: "ENOENT: no such file or directory, open 'games.db'"**
   - Solução: Execute `python create-games-db.py`

3. **Erro: "Port 3000 is already in use"**
   - Solução: Mate o processo na porta 3000 ou altere a porta no código

4. **CORS Error no frontend**
   - Verificar se o servidor está rodando
   - Confirmar que o CORS está habilitado

## 📈 Próximas Melhorias

- [ ] Implementar autenticação JWT
- [ ] Adicionar endpoints para reviews
- [ ] Implementar cache Redis
- [ ] Adicionar testes unitários
- [ ] Implementar rate limiting
- [ ] Adicionar logging estruturado
- [ ] Implementar health check endpoint 