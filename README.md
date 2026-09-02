# Adonai

Plataforma devocional católica **mobile-first** do grupo de oração Adonai.
Feita para rodar bem na tela do celular e, no futuro, virar aplicativo
(o mesmo código pode ser empacotado com Capacitor / Expo).

Instagram: [@go.adonai](https://www.instagram.com/go.adonai)

---

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5175`.

```bash
npm run build     # gera a versão de produção em dist/
npm run preview   # serve o build para conferir
```

Deploy (quando chegar a hora): qualquer host de site estático no plano
gratuito serve para começar (Vercel, Netlify, Cloudflare Pages). Basta
apontar para este repositório; o comando de build é `npm run build` e a
pasta publicada é `dist/`.

---

## Como o projeto está organizado

```
src/
  components/
    layout/      AppShell, TopBar, BottomNav, ErrorView
    ui/          peças reaproveitáveis (PageHeader, ComingSoon, FireMark)
  features/       uma pasta por seção do app
    hoje/                 tela inicial ("Hoje")
    evangelho/            Evangelho do dia (consome API de liturgia)
    biblia/               navegação dos 73 livros (texto: pendente)
    catecismo/            estrutura das 4 partes (texto: pendente de licença)
    santos/                acervo + santo do dia + página de cada santo
    herois-da-fe/         santos como "heróis" para admirar e imitar
    herois-biblicos/      personagens da Bíblia
    doutores/             filtra os Doutores da Igreja do acervo
    documentos/           encíclicas e documentos conciliares
    devocionais/          reflexões curtas do grupo
    quiz/                 [FASE 2] quiz com login e ranking
    catolico-responde/    [FASE 3] assistente de IA com fontes do acervo
    comunidade/           [FASE 2] pregações, retiro Desperta, fotos
    admin/                [FASE 2] área restrita para publicar conteúdo
    mais/                 menu com tudo
  content/        dados editoriais (santos, devocionais, estrutura da Bíblia)
  lib/            utilidades (datas) e adaptadores de API (lib/api)
  styles/         tokens.css (paleta e tipografia) + global.css
```

Cada `feature` é isolada: dá para mexer numa sem quebrar as outras.
Novas seções entram como uma nova pasta em `features/` + uma rota em
`src/router.tsx`.

### Design

Paleta e tipografia ficam em `src/styles/tokens.css` — mudar ali muda o app
inteiro. Tema escuro, tirado da logo (preto, chama vermelha, dourado brasa).
Fontes: Cinzel (títulos), Spectral (leitura), Figtree (interface).

---

## Fases

| Fase | O que entra | Precisa de |
| --- | --- | --- |
| **1 — agora** | Evangelho do dia, santos, heróis, devocionais, navegação da Bíblia e do Catecismo, PWA instalável | só hospedagem estática (grátis) |
| **2** | Contas de usuário, Quiz + ranking, área ADM, galerias de fotos e pregações | backend com banco + armazenamento (ex.: Supabase, plano grátis) |
| **3** | Católico Responde (IA com busca no acervo) | modelo de linguagem + índice do conteúdo (custo por uso) |
| **4** | Instagram, notificações ("Evangelho do dia"), empacotar como app | conta Meta Business, serviço de push |

---

## Pendências de conteúdo (decisões abertas)

- **Bíblia**: definir a tradução. Quase todas em português são protegidas
  (Ave-Maria, CNBB, Pastoral). Opções: usar uma versão de uso livre,
  pedir licença, ou consumir uma API autorizada.
- **Catecismo**: texto © Libreria Editrice Vaticana / Loyola. Decidir entre
  linkar o oficial, citar por parágrafo ou pedir autorização.
- **Documentos dos Papas**: `vatican.va` permite uso com atribuição — trazer
  resumos próprios + link.
- **Revisão teológica**: todo texto de fé e as respostas da IA precisam da
  revisão de alguém com formação (padre / teólogo) antes de publicar.
- **Liturgia**: hoje usa uma API comunitária (`liturgia.up.railway.app`) com
  texto de reserva em domínio público. Confirmar fonte e licença.
