# 🐾 PetCare API

Uma API RESTful desenvolvida em TypeScript para gerenciamento de cadastro de pets, utilizando Express.js, TypeORM e SQLite.

## 📋 Sobre o Projeto

A PetCare API é um sistema completo para cadastro e gerenciamento de informações de pets. Desenvolvida com TypeScript, oferece tipagem estática e uma estrutura robusta para operações CRUD completas.

## 🚀 Tecnologias Utilizadas

- **TypeScript** - Superset JavaScript com tipagem estática
- **Express.js** - Framework web para Node.js
- **TypeORM** - ORM para TypeScript e JavaScript
- **SQLite** - Banco de dados embutido
- **ts-node** - Execução de TypeScript diretamente no Node.js

## 📦 Estrutura do Projeto

```
src/

├── repositories/
|   └── interfaces/   
|   |   └── interfacesAdotante.ts   
|   |   └── interfacesPet.ts  
|   |   └── interface.Endereco.ts
|   └── adotanteRepository.ts   
|   └── petRepository.ts   
|   └── enderecoRepository.ts   
|
├── entities/
│   └── PetEntity.ts              # Entidade Pet
|   └── AdotanteEntity.ts         # Entidade Adotante
|   └── EnderecoEntity.ts         # Entidade Endereco
├── controllers/
│   └── controllerPet.ts    # Controlador das rotas
│   └── controllerEndereco.ts    # Controlador das rotas
│   └── controllerAdotante.ts    # Controlador das rotas
├── routes/
│   └── petRoutes.ts        # Definição das rotas
├── config/
│   └── database.ts         # Configuração do TypeORM
└── app.ts                  # Aplicação principal
```

## 🗄️ Modelo de Dados (Entidade Pet)

A entidade Pet possui as seguintes propriedades:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| **`id`** | number | Identificador único (auto-incremento) |
| **`nome`** | string | Nome do pet |
| **`especie`** | string | Espécie (cachorro, gato, etc.) |
| **`idade`** | string | Raça do pet |
| **`adotado`** | number | Idade em anos |

## 📡 Endpoints da API

### 🐕‍🦺 Rotas disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| **GET** | `/pets` | Retorna todos os pets |
| **GET** | `/pets/:id` | Retorna um pet específico |
| **GET** | `/pets/query` | Filtragem genérica|
| **POST** | `/pets` | Cria um novo pet |
| **PUT** | `/pets/:id` | Atualiza um pet existente |
| **DELETE** | `/pets/:id` | Remove um pet |

### 🔍 Exemplos de Uso

#### Listar todos os pets
```bash
GET /pets
```

#### Buscar pet por ID
```bash
GET /pets/1
```

#### Criar novo pet
```bash
POST /pets
Content-Type: application/json

{
  "nome": "Rex",
  "especie": "Cachorro",
  "idade": 3,
  "adotado": false,
}
```

#### Atualizar pet
```bash
PUT /pets/1
Content-Type: application/json

{
  "adotado": true,
  "idade": 4
}
```

#### Deletar pet
```bash
DELETE /pets/1
```

## ⚙️ Instalação e Configuração

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Passo a passo

1. **Clone o repositório**
```bash
git clone https://github.com/pedro-rogel/typeToBack.git
cd typeToBack
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o banco de dados**
O SQLite será configurado automaticamente com o arquivo `database.sqlite` na raiz do projeto.

4. **Execute as migrações** (se necessário)
```bash
npm run typeorm -- migration:run
```

5. **Inicie o servidor**
```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm run build
npm start
```

## 🧪 Testando a API

### Com curl
```bash
# Criar um pet
curl -X POST http://localhost:3000/pets \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Mel",
    "especie": "Gato",
    "idade": 2,
    "adotado": false,
  }'

# Listar todos os pets
curl http://localhost:3000/pets

# Buscar pet por ID
curl http://localhost:3000/pets/1
```

### Com HTTPie
```bash
# Criar pet
http POST :3000/pets nome="Buddy" especie="Cachorro" idade=5 adotado=false"

# Listar pets
http :3000/pets
```

## 📊 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento com hot-reload
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Inicia o servidor em produção
- `npm run typeorm` - Executa comandos do TypeORM

## 🔧 Configuração do TypeORM

O arquivo `ormconfig.json` contém a configuração do banco de dados:

```json
{
  "type": "sqlite",
  "database": "database.sqlite",
  "entities": ["src/entities/*.ts"],
  "synchronize": true,
  "logging": false
}
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Em caso de problemas ou dúvidas:

1. Verifique se todas as dependências foram instaladas corretamente
2. Confirme que a porta 3000 não está sendo usada por outro processo
3. Verifique os logs do servidor para mensagens de erro detalhadas

## 👨‍💻 Desenvolvido por

[Pedro Rogel] - [pedrorogel3@gmail.com]

---

**Nota:** Esta API utiliza SQLite como banco de dados embutido, ideal para desenvolvimento e testes. Para ambiente de produção, considere utilizar PostgreSQL ou MySQL.
