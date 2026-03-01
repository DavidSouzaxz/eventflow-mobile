# 🎫 EventFlow Mobile

O **EventFlow Mobile** é a solução mobile da plataforma EventFlow, desenvolvida para conectar organizadores e participantes em uma experiência fluida de gestão de eventos e reserva de ingressos.

<div style="display: flex;flex-direction:column; justify-content: center; align-items: center; gap: 20px;">
    <img src="./assets/images/eventflow.png">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmMye1SIgoKEJA4EuRc8LMGj_HtfJPnVpvJQ&s">
    
</div>

## 🚀 Funcionalidades Principais

- **Exploração de Eventos:** Listagem dinâmica de eventos consumindo API em tempo real.
- **Detalhes Ricos:** Informações sobre lotes (batches), localização, data formatada e descrição.
- **Reserva de Ingressos:** Seletor de quantidade com cálculo de preço dinâmico por lote.
- **Scanner de Check-in (Admin):** Validação de QR Codes integrada ao backend com tratamento de status de ticket.
- **Arquitetura Moderna:** Navegação baseada em arquivos (Expo Router) e tipagem robusta.

## 🛠️ Stack Tecnológica

- **Framework:** [React Native](https://reactnative.dev/) com [Expo](https://expo.dev/) (SDK 50+)
- **Navegação:** Expo Router
- **Linguagem:** TypeScript
- **Cliente HTTP:** Axios (com Interceptors para Auth)
- **Ícones:** Ionicons (@expo/vector-icons)
- **Storage:** AsyncStorage para persistência de Token JWT

## 📂 Estrutura de Pastas

```text
src/
 ├── app/             # Rotas e Páginas (Expo Router)
 ├── components/      # Componentes reutilizáveis (Cards, Inputs)
 ├── services/        # Configuração da API (Axios)
 ├── utils/           # Funções auxiliares (Formatação de data/moeda)
 └── types/           # Definições de Interfaces TypeScript
 └── utils/           # Funções importantes para formatação
```

## ⚙️ Como Instalar e Rodar

1. **Clone o projeto:**

```bash
git clone https://github.com/Davidsouzaxz/eventflow-mobile.git
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure o Ambiente:**
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
EXPO_PUBLIC_API_URL=https://sua-api-no-render.com
```

OU

```env
LOCAL_API_URL=http://sua-api-local.com
```

4. **Inicie o servidor de desenvolvimento:**

```bash
npx expo start
```

## 📝 Notas de Desenvolvimento

- O projeto utiliza **Interceptors** no Axios para anexar automaticamente o Token de autenticação em rotas protegidas.
- A formatação de datas é centralizada em `/utils/formatDate.ts` para converter o padrão ISO do banco em formato legível (PT-BR).
- Listagem de Eventos funcional com detalhamento de cada evento
- Organização de páginas
- Autenticação ativa

---

✨ Desenvolvido por David Souza durante a jornada EventFlow - 2026.
