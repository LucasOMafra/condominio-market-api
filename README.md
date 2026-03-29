# 🛒 Condomínio Market API

Sistema de mini market para condomínios, desenvolvido com Java Spring Boot no backend e React no frontend. Permite o gerenciamento completo de produtos, categorias, clientes e pedidos, além de um totem de autoatendimento para os moradores.

---

## 🚀 Tecnologias

**Backend**
- Java 21
- Spring Boot 3.5
- Spring Data JPA
- PostgreSQL
- Docker
- Lombok
- Maven

**Frontend**
- React 18
- Vite
- Axios
- React Router DOM

---

## 📁 Estrutura do Projeto
```
condominio-market-api/
├── api/          ← Backend Spring Boot
└── frontend/     ← Frontend React
```

---

## ⚙️ Como rodar o projeto

### Pré-requisitos
- Java 21
- Node.js
- Docker Desktop

### Backend
```bash
cd api
docker compose up -d
./mvnw spring-boot:run
```

A API estará disponível em `http://localhost:8080`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

---

## 📌 Endpoints da API

### Produtos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/produtos` | Lista todos os produtos |
| GET | `/api/produtos/{id}` | Busca produto por ID |
| POST | `/api/produtos` | Cria novo produto |
| PUT | `/api/produtos/{id}` | Atualiza produto |
| DELETE | `/api/produtos/{id}` | Remove produto |

### Categorias
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/categorias` | Lista todas as categorias |
| GET | `/api/categorias/{id}` | Busca categoria por ID |
| POST | `/api/categorias` | Cria nova categoria |
| PUT | `/api/categorias/{id}` | Atualiza categoria |
| DELETE | `/api/categorias/{id}` | Remove categoria |

### Clientes
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/clientes` | Lista todos os clientes |
| GET | `/api/clientes/{id}` | Busca cliente por ID |
| GET | `/api/clientes/cpf/{cpf}` | Busca cliente por CPF |
| POST | `/api/clientes` | Cria novo cliente |
| PUT | `/api/clientes/{id}` | Atualiza cliente |
| DELETE | `/api/clientes/{id}` | Remove cliente |

### Pedidos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/pedidos` | Lista todos os pedidos |
| GET | `/api/pedidos/{id}` | Busca pedido por ID |
| GET | `/api/pedidos/cliente/{clienteId}` | Lista pedidos por cliente |
| POST | `/api/pedidos/cliente/{clienteId}` | Abre novo carrinho |
| POST | `/api/pedidos/{id}/itens` | Adiciona item ao carrinho |
| DELETE | `/api/pedidos/{id}/itens/{itemId}` | Remove item do carrinho |
| POST | `/api/pedidos/{id}/finalizar` | Finaliza pedido e debita estoque |
| POST | `/api/pedidos/{id}/cancelar` | Cancela pedido |

---

## 🖥️ Interfaces

### Painel Administrativo — `http://localhost:5173`
Gerenciamento completo de produtos, categorias, clientes e pedidos.

### Totem do Cliente — `http://localhost:5173/totem`
Interface de autoatendimento para os moradores do condomínio. O cliente se identifica pelo CPF, o operador bipa os produtos e o sistema debita o estoque automaticamente ao finalizar a compra.

---

## 🗺️ Roadmap

- [ ] Tratamento de erros global com respostas HTTP padronizadas
- [ ] Validações de negócio (ex: impedir exclusão de categoria com produtos vinculados)
- [ ] Relatórios e consultas (estoque baixo, histórico por cliente, total vendido por período)
- [ ] Autenticação JWT para separar acesso admin e cliente
- [ ] Melhorias no totem (promoções dinâmicas do backend)

---

## 👨‍💻 Autor

Desenvolvido como projeto de aprendizado de Java Spring Boot e React.
