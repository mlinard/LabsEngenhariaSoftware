# API Documentation - Game Rate v4

## 📋 Visão Geral

A API REST do Game Rate v4 fornece endpoints para acessar dados de jogos populares da Steam. Construída com **Express.js** e banco **SQLite**, oferece resposta rápida e dados atualizados.

## 🌐 Base URL

```
http://localhost:3000/api
```

## 🔑 Autenticação

**Atual**: Nenhuma autenticação necessária (API pública)  
**Futuro**: JWT tokens para endpoints protegidos

## 📊 Rate Limiting

**Atual**: Sem limite de requisições  
**Recomendado**: Máximo 100 requests/minuto por IP

## 📡 Endpoints Disponíveis

### 1. Listar Todos os Jogos

Retorna lista completa de jogos populares no banco de dados.

```http
GET /api/steam-games
```

#### Request
```bash
curl -X GET http://localhost:3000/api/steam-games
```

#### Response

**Status**: `200 OK`  
**Content-Type**: `application/json`

```json
[
  {
    "id": 1245620,
    "name": "ELDEN RING",
    "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_sm_120.jpg",
    "price": 14999
  },
  {
    "id": 1030840,
    "name": "Hades", 
    "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030840/capsule_sm_120.jpg",
    "price": 3699
  },
  {
    "id": 1091500,
    "name": "Cyberpunk 2077",
    "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/capsule_sm_120.jpg",
    "price": 19999
  }
]
```

#### Response Schema
```typescript
interface Game {
  id: number;        // Steam ID único do jogo
  name: string;      // Nome do jogo
  image: string;     // URL da thumbnail (120x120px)
  price: number;     // Preço em centavos (BRL)
}

type GamesResponse = Game[];
```

#### Errors

**500 Internal Server Error**
```json
{
  "error": "Database connection failed"
}
```

---

### 2. Buscar Jogo por ID

Retorna detalhes de um jogo específico pelo Steam ID.

```http
GET /api/steam-games/:id
```

#### Parameters
| Parameter | Type   | Required | Description          |
|-----------|--------|----------|----------------------|
| `id`      | number | Yes      | Steam ID do jogo     |

#### Request Examples
```bash
# Buscar Elden Ring (ID: 1245620)
curl -X GET http://localhost:3000/api/steam-games/1245620

# Buscar Hades (ID: 1030840)  
curl -X GET http://localhost:3000/api/steam-games/1030840
```

#### Response - Success

**Status**: `200 OK`  
**Content-Type**: `application/json`

```json
{
  "id": 1245620,
  "name": "ELDEN RING",
  "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_sm_120.jpg",
  "price": 14999
}
```

#### Response - Not Found

**Status**: `404 Not Found`  
**Content-Type**: `application/json`

```json
{
  "error": "Game not found"
}
```

#### Response - Server Error

**Status**: `500 Internal Server Error`  
**Content-Type**: `application/json`

```json
{
  "error": "Database query failed"
}
```

#### Response Schema
```typescript
interface GameResponse {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface ErrorResponse {
  error: string;
}
```

---

## 🎮 Dados dos Jogos

### Lista de Jogos Disponíveis

| ID       | Nome               | Gênero       | Preço (BRL) |
|----------|--------------------|--------------|-------------|
| 1245620  | ELDEN RING         | RPG          | R$ 149,99   |
| 1030840  | Hades              | Roguelike    | R$ 36,99    |
| 1091500  | Cyberpunk 2077     | RPG          | R$ 199,99   |
| 367520   | Hollow Knight      | Metroidvania | R$ 26,99    |
| 1811260  | FIFA 23            | Sports       | R$ 249,99   |
| 271590   | GTA V              | Action       | R$ 79,99    |
| 1593500  | God of War         | Action       | R$ 149,99   |
| 1238810  | Baldur's Gate 3    | RPG          | R$ 199,99   |
| 292030   | The Witcher 3      | RPG          | R$ 99,99    |

### Estrutura dos Dados

#### Campos dos Jogos
- **`id`**: Steam ID único (integer, primary key)
- **`name`**: Nome oficial do jogo (string, max 255 chars)
- **`image`**: URL da thumbnail da Steam (string, formato HTTPS)
- **`price`**: Preço em centavos brasileiros (integer)

#### Formato das Imagens
- **Resolução**: 120x120 pixels
- **Formato**: JPEG
- **CDN**: Steam Content Delivery Network
- **Exemplo**: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_sm_120.jpg`

#### Formato dos Preços
```javascript
// Preço armazenado: 14999 (centavos)
// Preço exibido: R$ 149,99
const formatPrice = (priceInCents) => {
  return `R$ ${(priceInCents / 100).toFixed(2)}`;
};
```

---

## 🔍 Filtragem e Busca

### Query Parameters (Futuro)

Funcionalidades planejadas para filtragem:

```http
GET /api/steam-games?genre=RPG&min_price=1000&max_price=10000&sort=price_asc
```

#### Parâmetros Planejados
| Parameter   | Type   | Description                    | Example      |
|-------------|--------|--------------------------------|--------------|
| `genre`     | string | Filtrar por gênero             | `RPG`        |
| `min_price` | number | Preço mínimo (centavos)        | `1000`       |
| `max_price` | number | Preço máximo (centavos)        | `10000`      |
| `sort`      | string | Ordenação                      | `price_asc`  |
| `limit`     | number | Limite de resultados           | `10`         |
| `offset`    | number | Pular N resultados             | `20`         |
| `search`    | string | Busca por nome                 | `elden`      |

---

## 📝 Request/Response Examples

### JavaScript/Fetch
```javascript
// Listar todos os jogos
const fetchGames = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/steam-games');
    const games = await response.json();
    
    if (response.ok) {
      console.log('Jogos encontrados:', games.length);
      return games;
    } else {
      console.error('Erro da API:', games.error);
    }
  } catch (error) {
    console.error('Erro de rede:', error);
  }
};

// Buscar jogo específico
const fetchGameById = async (gameId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/steam-games/${gameId}`);
    const game = await response.json();
    
    if (response.ok) {
      console.log('Jogo encontrado:', game.name);
      return game;
    } else if (response.status === 404) {
      console.log('Jogo não encontrado');
    } else {
      console.error('Erro da API:', game.error);
    }
  } catch (error) {
    console.error('Erro de rede:', error);
  }
};
```

### jQuery/AJAX
```javascript
// Listar jogos com jQuery
$.ajax({
  url: 'http://localhost:3000/api/steam-games',
  type: 'GET',
  dataType: 'json',
  success: function(games) {
    console.log('Jogos carregados:', games.length);
    // Renderizar jogos na interface
    renderGames(games);
  },
  error: function(xhr, status, error) {
    console.error('Erro ao carregar jogos:', error);
  }
});

// Buscar jogo específico
$.get(`http://localhost:3000/api/steam-games/${gameId}`)
  .done(function(game) {
    console.log('Jogo:', game.name);
  })
  .fail(function(xhr) {
    if (xhr.status === 404) {
      console.log('Jogo não encontrado');
    } else {
      console.log('Erro:', xhr.responseJSON.error);
    }
  });
```

### Python/Requests
```python
import requests

# Listar todos os jogos
def get_all_games():
    try:
        response = requests.get('http://localhost:3000/api/steam-games')
        response.raise_for_status()
        games = response.json()
        print(f'Jogos encontrados: {len(games)}')
        return games
    except requests.exceptions.RequestException as e:
        print(f'Erro: {e}')
        return None

# Buscar jogo por ID
def get_game_by_id(game_id):
    try:
        response = requests.get(f'http://localhost:3000/api/steam-games/{game_id}')
        
        if response.status_code == 200:
            game = response.json()
            print(f'Jogo: {game["name"]}')
            return game
        elif response.status_code == 404:
            print('Jogo não encontrado')
            return None
        else:
            response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f'Erro: {e}')
        return None
```

---

## ⚡ Performance

### Response Times
- **Listar jogos**: ~5-15ms (10 registros)
- **Buscar por ID**: ~3-8ms (query indexada)
- **Cold start**: ~100ms (primeira requisição)

### Otimizações
- **SQLite Indexes**: ID como primary key
- **Connection Reuse**: Uma conexão persistente
- **JSON Serialization**: Automática pelo Express
- **Error Handling**: Responses rápidos para erros

### Benchmarks
```bash
# Teste de carga com Apache Bench
ab -n 1000 -c 10 http://localhost:3000/api/steam-games

# Resultado esperado:
# - Requests per second: 500-800
# - Time per request: 12-20ms  
# - Failed requests: 0
```

---

## 🔒 Segurança

### Headers de Segurança
```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
```

### SQL Injection Prevention
```javascript
// ✅ SEGURO - Query parametrizada
db.get('SELECT * FROM games WHERE id = ?', [req.params.id], callback);

// ❌ VULNERÁVEL - Nunca use concatenação
// db.get(`SELECT * FROM games WHERE id = ${req.params.id}`, callback);
```

### Input Validation
```javascript
// Validação de ID numérico
app.get('/api/steam-games/:id', (req, res) => {
  const gameId = parseInt(req.params.id);
  
  if (isNaN(gameId) || gameId <= 0) {
    return res.status(400).json({ error: 'Invalid game ID' });
  }
  
  // Continuar com query...
});
```

---

## 🐛 Error Handling

### Status Codes
| Status | Description                | When it occurs                    |
|--------|----------------------------|-----------------------------------|
| 200    | OK                         | Requisição bem-sucedida           |
| 400    | Bad Request                | Parâmetros inválidos              |
| 404    | Not Found                  | Jogo não encontrado               |
| 500    | Internal Server Error      | Erro de banco ou servidor         |

### Error Response Format
```json
{
  "error": "Descrição do erro em português",
  "code": "ERROR_CODE_OPTIONAL",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Common Errors
```json
// Jogo não encontrado
{
  "error": "Game not found"
}

// Erro de banco de dados
{
  "error": "Database connection failed"
}

// ID inválido (futuro)
{
  "error": "Invalid game ID format"
}
```

---

## 🧪 Testing

### Manual Testing
```bash
# Testar endpoint de listagem
curl -i http://localhost:3000/api/steam-games

# Testar jogo específico
curl -i http://localhost:3000/api/steam-games/1245620

# Testar jogo inexistente
curl -i http://localhost:3000/api/steam-games/999999

# Testar com ID inválido
curl -i http://localhost:3000/api/steam-games/abc
```

### Automated Testing (Futuro)
```javascript
// Jest test example
describe('Steam Games API', () => {
  test('GET /api/steam-games returns all games', async () => {
    const response = await request(app).get('/api/steam-games');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /api/steam-games/:id returns specific game', async () => {
    const response = await request(app).get('/api/steam-games/1245620');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1245620);
    expect(response.body).toHaveProperty('name');
  });

  test('GET /api/steam-games/:id returns 404 for non-existent game', async () => {
    const response = await request(app).get('/api/steam-games/999999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});
```

---

## 📈 Monitoring & Analytics

### Health Check (Futuro)
```http
GET /api/health
```

```json
{
  "status": "ok",
  "uptime": 3600,
  "memory": {
    "used": 45.2,
    "total": 512
  },
  "database": {
    "connected": true,
    "games_count": 10
  }
}
```

### API Stats (Futuro)
```http
GET /api/stats
```

```json
{
  "total_games": 10,
  "total_requests_today": 1247,
  "avg_response_time": "12ms",
  "top_games": [
    {"id": 1245620, "name": "ELDEN RING", "requests": 89},
    {"id": 1030840, "name": "Hades", "requests": 67}
  ]
}
```

---

## 🚀 Roadmap

### v2.0 Features
- [ ] **Authentication**: JWT para endpoints protegidos
- [ ] **Pagination**: Suporte a `limit` e `offset`
- [ ] **Filtering**: Query params para filtros avançados
- [ ] **Search**: Busca por nome parcial
- [ ] **Caching**: Redis para responses frequentes
- [ ] **Rate Limiting**: Proteção contra spam

### v3.0 Features  
- [ ] **Real-time**: WebSocket para updates live
- [ ] **GraphQL**: Alternativa ao REST
- [ ] **API Versioning**: `/v1/`, `/v2/` endpoints
- [ ] **Analytics**: Métricas detalhadas de uso
- [ ] **Documentation**: Swagger/OpenAPI integration 