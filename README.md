Pokédex Explorer (React Native + Expo)

Descrição

Aplicativo Pokedex simples construído com React Native e Expo. Suporta visualização de lista de Pokémon, detalhes, favoritos e modo claro/escuro via ThemeContext.

Principais recursos

- Lista de Pokémon com paginação
- Tela de detalhes de cada Pokémon
- Favoritos persistidos (AsyncStorage)
- Suporte a temas Light / Dark com ThemeContext
- Roda no celular (iOS/Android) e no navegador (expo web)

Pré-requisitos

- Node.js (16+ recomendado)
- npm ou yarn
- Expo CLI (opcional: npm i -g expo-cli)

Instalação

1. Clonar o repositório
   git clone <repo>
2. Instalar dependências
   npm install

Rodando o aplicativo

- No dispositivo/emulador Android
  npm run android

- No iOS (macOS)
  npm run ios

- No navegador (web)
  npm run web

Tema (Dark / Light)

O app já inclui ThemeContext (src/contexts/ThemeContext.tsx). O tema inicial segue a preferência do sistema. Para alternar programaticamente, chame toggleTheme() a partir do hook useTheme().

Exemplo rápido

- Abrir src/contexts/ThemeContext.tsx para ver as cores definidas em lightColors e darkColors.
- Inserir um botão em um header ou tela para chamar toggleTheme() e alternar o modo.

Estrutura do projeto (resumo)

- src/
  - api/         -> chamadas à PokeAPI
  - components/  -> componentes reutilizáveis (PokemonCard)
  - contexts/    -> ThemeContext, FavoritesContext
  - navigation/  -> AppNavigator
  - screens/     -> HomeScreen, DetailsScreen, FavoritesScreen
  - types/       -> tipos TypeScript
  - utils/       -> utilitários (ex.: typeColors)

Contribuição

Pull requests são bem-vindos. Para mudanças maiores, abra uma issue primeiro para discutir.

Projeto Feito por Guilherme Sampaio Furquim

