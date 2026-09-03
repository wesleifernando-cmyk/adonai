# Roadmap — Adonai

Ideias e pedidos da equipe, na ordem em que foram surgindo. Marcar `[x]` quando entrar.

## Fase 1 — conteúdo e identidade (host grátis, sem backend)

- [x] Estrutura mobile-first (PWA), navegação por abas
- [x] Arte oficial (coração em chamas) no app, favicon e ícone
- [x] Tela **Hoje**: Evangelho do dia (API de liturgia), santo do dia, jovem de referência, devocional
- [x] **Lemas** em destaque: "Eu tenho para onde voltar." + pirâmide "Vai sair um fogo deste lugar que vai queimar o mundo todo" (FOGO e QUEIMAR em vermelho)
- [x] "Missão Adonai" no lugar de "grupo de oração" em todo o app
- [x] **Santos**: acervo + página de cada santo + santo do dia
- [x] **Heróis da Fé** e **Heróis Bíblicos**
- [x] **Doutores da Igreja**, **Devocionais**
- [x] **Ajude-nos** (/ajude): tela pronta pra receber o QR do Pix da Missão
- [x] **Compartilhar** santo (menu nativo / copiar) com link do site junto — divulgação pelos próprios usuários
- [x] **Indique um santo**: campo pra sugerir santos (por ora salvo no aparelho)
- [ ] **Imagens dos santos**: retrato de cada um.
      - Históricos (arte anterior a ~1900): domínio público (Wikimedia Commons) → pode entrar
      - Modernos (Carlo Acutis, Padre Pio, Maria Goretti...): fotos têm direitos autorais →
        usar imagem oficial com autorização, arte/ícone, ou o monograma que já existe
- [ ] Bíblia: definir tradução de uso livre e carregar o texto dos capítulos
- [ ] Catecismo: decidir forma (link oficial / citação por parágrafo / licença)
- [ ] Documentos dos Papas: resumos próprios + link vatican.va
- [ ] Tema claro (leitura de dia)
- [ ] **Notícias da fé** (/noticias): Vaticano + Igreja no Brasil + Vale do Paraíba
      (Aparecida/A12 e Canção Nova ficam na região). Só título + resumo + data + link
      pra fonte, com crédito. Precisa de uma função pequena lendo RSS (dá pra fazer no 1º deploy)

## Fase 2 — contas e comunidade (backend: Supabase plano grátis)

- [ ] **Login / cadastro** (prévia da tela já está no Quiz)
- [ ] **Quiz católico**: pontuação, ranking, dificuldade crescente, perguntas sem repetição
      (banco curado + geração assistida por IA), explicação com fonte
- [ ] **Testemunhos**: usuário conta a história dele (conversão, missão, superação), com nome
      ou anônimo; outros **curtem e comentam**; ver repercussão; moderação antes de publicar
- [ ] **Curtir e comentar** também nas páginas de santos e heróis
- [ ] **Área ADM**: subir pregações (áudio), álbuns de foto (Desperta, encontros, missões,
      eventos), publicar/esconder, revisar textos e sugestões de santos
- [ ] Página "quem somos / o que fazemos" da Missão Adonai
- [ ] Fila de sugestões de santos chega para a equipe (hoje fica só no aparelho)

## Fase 3 — IA

- [ ] **Católico Responde**: assistente com busca no acervo do site (Catecismo, santos,
      documentos), responde objeções e dúvidas sempre com a fonte; revisão de alguém com formação

## Fase 4 — alcance

- [ ] Compartilhar fotos direto no Instagram (@go.adonai)
- [ ] Notificações ("Evangelho do dia" no celular)
- [ ] Empacotar como aplicativo (Play Store / App Store)

## Bíblia — situação da licença (pesquisado em set/2026)

O texto antigo da Bíblia é livre, mas **toda tradução moderna tem direitos autorais**
(70 anos após a morte do tradutor). Em português:

- **Com direitos (precisam de licença):** Ave-Maria, CNBB, Pastoral (Paulinas),
  Jerusalém (Paulus), Vozes, Matos Soares (livre só a partir de ~2027)
- **Livre + católica (73 livros):** só a **Bíblia de Figueiredo** (traduzida da Vulgata,
  Pe. António Pereira de Figueiredo, †1797 → domínio público). Português arcaico e hoje
  existe mais como PDF escaneado (archive.org) — precisa digitalizar/limpar
- **Livre mas cânon protestante (faltam 7 livros):** Almeida 1911, Tradução Brasileira 1917,
  "Bíblia Livre" — não servem sozinhas para app católico

**Encaminhamento:** (1) pedir por escrito à CNBB / Editora Ave-Maria / Diocese de Taubaté
autorização de uso não comercial em app de missão; (2) enquanto isso, usar o texto de
Figueiredo rotulado como tradução antiga e/ou link para uma Bíblia oficial online.

## Decisões abertas (precisam da equipe)

- Tradução da Bíblia (ver acima) · forma de usar o Catecismo
- Quem faz a **revisão teológica** dos textos e das respostas da IA
- Print da tela de login (referência de design)
- Chave/QR do Pix da Missão Adonai
