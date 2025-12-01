# SmartMarket - Lista de Compras Inteligente

Aplicativo móvel de lista de supermercado desenvolvido com React Native e Firebase Firestore.

## 📋 Funcionalidades

- ✅ Adicionar, editar e excluir produtos
- ✅ Cálculo automático do valor total
- ✅ Sincronização em tempo real com Firebase Firestore
- ✅ Marcar produtos como comprados
- ✅ Resumo detalhado da compra
- ✅ Interface moderna e intuitiva

## 🚀 Como Começar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- Conta no Firebase com projeto criado

### Instalação

1. **Clone o repositório e instale as dependências:**

```bash
npm install
```

2. **Configure o Firebase:**

Edite o arquivo `firebaseConfig.js` e substitua os valores pelos dados do seu projeto Firebase:

```javascript
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-auth-domain",
  projectId: "seu-project-id",
  storageBucket: "seu-storage-bucket",
  messagingSenderId: "seu-messaging-sender-id",
  appId: "seu-app-id"
};
```

3. **Crie a coleção no Firestore:**

- Acesse o Console do Firebase
- Vá em Firestore Database
- Crie uma coleção chamada `produtos`
- A coleção será populada automaticamente quando você adicionar produtos

### Executando o Aplicativo

```bash
npm start
```

Isso iniciará o Expo DevTools. Você pode então:
- Pressionar `a` para abrir no Android
- Pressionar `i` para abrir no iOS
- Escanear o QR code com o app Expo Go no seu dispositivo

## 📱 Estrutura do Projeto

```
smart-market/
├── components/
│   ├── ProductItem.js       # Componente de item de produto
│   ├── AddProductModal.js   # Modal para adicionar/editar
│   └── TotalSummary.js      # Resumo da compra
├── services/
│   └── productService.js    # Serviços do Firestore
├── styles/
│   └── theme.js            # Tema e cores
├── App.js                   # Componente principal
├── firebaseConfig.js        # Configuração do Firebase
├── package.json
└── app.json
```

## 🎨 Recursos

### Gerenciamento de Produtos

Cada produto contém:
- **Nome do Produto** (obrigatório)
- **Quantidade** (numérico, obrigatório)
- **Preço Unitário** (numérico, obrigatório)
- **Data de Adição** (gerado automaticamente)
- **Status de Comprado** (checkbox)

### Cálculos Automáticos

- **Total por Produto**: Quantidade × Preço Unitário
- **Total Geral**: Soma de todos os produtos
- **Gasto Atual**: Soma apenas dos produtos comprados
- **Falta Comprar**: Diferença entre total e gasto atual

### Interface

- Lista de produtos com opções de editar e excluir
- Checkbox para marcar como comprado
- Diferenciação visual (riscado e opacidade) para itens comprados
- Resumo com estatísticas completas
- Botão flutuante para adicionar novos produtos

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **Firebase Firestore** - Banco de dados em nuvem
- **React Native Paper** - Biblioteca de componentes UI

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.
