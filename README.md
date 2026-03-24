# Teste de Velocidade de Digitação

<div align="center">

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

Aplicação de teste de velocidade de digitação desenvolvida como solução para o desafio da plataforma [Frontend Mentor](https://www.frontendmentor.io).

</div>

---

## 📋 Descrição

O **Teste de Velocidade de Digitação** é uma aplicação web que permite ao usuário medir sua velocidade e precisão de digitação. O sistema oferece passagens de texto em três níveis de dificuldade, dois modos de teste distintos e um sistema de recorde pessoal persistente entre sessões.

---

## ✨ Funcionalidades

- **Início de teste** — inicie clicando no botão ou diretamente na passagem de texto
- **Níveis de dificuldade** — Fácil, Médio e Difícil com passagens de complexidade variada
- **Modos de teste**
  - **Temporizado (60s)** — cronômetro regressivo, o teste encerra ao chegar em zero
  - **Passagem** — cronômetro progressivo sem limite, encerra ao completar o texto
- **Reinício a qualquer momento** — nova passagem aleatória mantendo a dificuldade selecionada
- **Estatísticas em tempo real** — WPM, precisão e tempo atualizados durante a digitação
- **Feedback visual por caractere** — corretos em verde, erros em vermelho com sublinhado, cursor visível
- **Correção com Backspace** — permite corrigir erros, porém eles continuam impactando a precisão
- **Tela de resultados** — exibe WPM, precisão e contagem de caracteres (corretos/incorretos)
- **Sistema de recorde pessoal**
  - Primeira conclusão: mensagem *"Baseline Established!"*
  - Novo recorde: mensagem *"High Score Smashed!"* com animação de confete
  - Recorde persistido via `localStorage` entre sessões
- **Design responsivo** — layout adaptado para dispositivos móveis e desktop

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [React](https://react.dev/) | 18 | Biblioteca de interface |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Tipagem estática |
| [Vite](https://vitejs.dev/) | 8 | Bundler e servidor de desenvolvimento |

---

## 🚀 Como Rodar Localmente

**Pré-requisitos:** Node.js 18+ e npm instalados.

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/typing-speed-test.git

# 2. Acesse a pasta do projeto
cd typing-speed-test

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## 📁 Estrutura do Projeto

```
src/
├── data/
│   └── data.json          # Passagens organizadas por dificuldade
├── types/
│   └── index.ts           # Interfaces e tipos TypeScript
├── hooks/
│   ├── usePersonalBest.ts # Gerenciamento do recorde via localStorage
│   ├── useTimer.ts        # Cronômetro para os dois modos de teste
│   └── useTypingEngine.ts # Engine principal de digitação
├── components/            # Componentes de interface
├── App.tsx                # Orquestração geral da aplicação
└── main.tsx               # Ponto de entrada
```

---

## 📚 O que Aprendi

Este projeto foi desenvolvido com foco no aprendizado prático de conceitos fundamentais do ecossistema React com TypeScript:

**Custom Hooks**
Aprendi a extrair lógica de negócio complexa em hooks reutilizáveis (`useTimer`, `useTypingEngine`, `usePersonalBest`), separando responsabilidades e tornando os componentes mais limpos e focados apenas na renderização.

**Gerenciamento de estado com useState e useRef**
Compreendi a diferença entre estado que precisa disparar re-render (`useState`) e valores mutáveis que funcionam melhor sem causar renderizações (`useRef`) — aplicado especialmente no controle do `setInterval` no `useTimer`.

**Efeitos colaterais com useEffect**
Pratiquei o uso correto do `useEffect` para operações externas como leitura do `localStorage` e gerenciamento de intervalos, incluindo a função de limpeza (`cleanup`) para evitar memory leaks.

**Otimização com useMemo e useCallback**
Utilizei `useMemo` para evitar recálculos desnecessários das estatísticas de digitação e `useCallback` para estabilizar funções passadas como props.

**Modelagem de tipos TypeScript**
Desenvolvi a tipagem completa da aplicação antes de escrever qualquer componente, o que reduziu erros e tornou o desenvolvimento mais previsível.

---

## 🔗 Links

- [Solução no Frontend Mentor](#)
- [Deploy da aplicação](#)

---

<div align="center">
  Desenvolvido como parte dos estudos em desenvolvimento Front-end.
</div>
