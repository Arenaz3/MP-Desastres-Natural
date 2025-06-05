# 🌍 Marketplace Solidário

**Marketplace Solidário** é uma plataforma digital desenvolvida por estudantes da FIAP para conectar vítimas de desastres naturais com doadores dispostos a ajudar. O sistema permite o cadastro e visualização de desastres, registro de pedidos de doação e um painel administrativo para gerenciamento.

## 📌 Objetivo

O projeto foi criado como parte do desafio da Global Solution 2025, com o tema:  
**Tecnologia aplicada ao enfrentamento de eventos climáticos extremos.**

A solução busca:
- Facilitar a conexão entre quem precisa e quem pode doar
- Organizar e validar pedidos de ajuda
- Monitorar desastres em tempo real através de um mapa interativo

---

## 🧑‍💻 Tecnologias Utilizadas

### Frontend
- React + TypeScript
- Tailwind CSS
- Axios
- Vite

### Backend
- Java 21
- Spring Boot (Spring Web, Lombok, Swagger)
- Oracle Database

---

## 🧩 Estrutura de Pastas (Frontend)

src/
├── api/                  # Requisições para o backend
├── components/           # Componentes reutilizáveis (Navbar, Button, etc.)
├── pages/                # Telas principais do sistema
├── App.tsx               # Roteador e layout base
└── main.tsx              # Ponto de entrada da aplicação

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
- Node.js 18+
- Java 21
- Oracle Database ou Docker com imagem Oracle
- Maven ou Gradle

### Frontend

```bash
cd frontend
npm install
npm run dev


cd backend
./mvnw spring-boot:run
# ou
./gradlew bootRun


O backend estará disponível em http://localhost:8080/api
O frontend estará em http://localhost:5173

🌐 Funcionalidades

Para usuários:
	•	Visualizar desastres no mapa
	•	Registrar pedidos de doação
	•	Navegar por pedidos recentes

Para administradores:
	•	Cadastrar novos desastres
	•	Aprovar ou rejeitar pedidos de ajuda
	•	Acompanhar todos os pedidos registrados

👥 Time do Projeto
	•	Pedro Arenas – Frontend, integração e pitch técnico
	•	João Góes – Frontend e estrutura do banco
	•	Vinícius Baptista – Backend Java + Swagger
	•	Júlia Alves – Wireframe e apresentação comercial
	•	Frederico Garcia – Documentação e Arquitetura

📄 Licença

Este projeto é acadêmico e sem fins lucrativos. Todos os direitos reservados aos autores do grupo 2SIOA - FIAP 2025.
