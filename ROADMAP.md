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
- [x] Bíblia: **leitor funcionando** com a Tradução Brasileira (domínio público, 66 livros,
      31.100 versículos) — lista de livros, seletor de capítulo, navegação, compartilhar
- [ ] Bíblia: 7 livros deuterocanônicos (Tobias, Judite, 1-2 Macabeus, Sabedoria,
      Eclesiástico, Baruc) + trechos de Ester/Daniel — vêm da revisão da "Bíblia Adonai"
- [ ] "Bíblia Adonai": modernizar o português, começando pelos Evangelhos, com revisão humana
- [x] Catecismo: **Compêndio oficial já linkado** (vatican.va, leitura online). Texto integral
      (© Libreria Editrice Vaticana) segue em decisão: citação por parágrafo ou licença
- [x] Documentos dos Papas: Evangelii Gaudium e Laudato Si' com link oficial (PDF vatican.va);
      os demais da lista ainda sem link
- [x] **Biblioteca** (/livros): livros católicos em PDF/leitura online, só fontes oficiais
      (vatican.va) ou domínio público verificável (Internet Archive) — começou com 5
- [x] **Audiobooks** (/audiobooks): virou seção própria, ao lado de Bíblia e Rosário — não
      fica mais escondido dentro de Comunidade/Pregações
- [x] Ampliados Audiobooks (17 no total): livros sobre Nossa Senhora, vidas de santos e
      doutrina. Vários links vindos de pesquisa externa ("Cláudio"/ChatGPT) estavam
      **quebrados** (domínio bibliotecacatolica.com.br fora do ar) — removidos ou trocados
      por fonte real verificada (ex.: filhosdemaria.org pro Tratado da Verdadeira Devoção).
      Sempre conferir link ao vivo antes de publicar, mesmo vindo de pesquisa pronta
- [x] **Lumine — Cinema Católico** (/lumine): vitrine do streaming católico Lumine (lumine.tv),
      12 filmes em 3 categorias, botão de assinatura em destaque. Lumine não deixa acessar
      página de filme sem login (redireciona pra /apoie) — por isso todo botão leva pro
      site geral, não pra uma página específica de cada filme
- [x] Biblioteca (/livros) ampliada: 5 biografias oficiais de santos (vatican.va,
      vaticannews.va, franciscanos.org.br, arautos.org) + 3 encíclicas novas (Gaudete et
      Exsultate, Dilexit Nos, Deus Caritas Est). **3 PDFs oficiais (Laudato Si', Evangelii
      Gaudium, Código de Direito Canônico) baixados e hospedados em public/livros/** —
      abrem e baixam direto do site, não é só link externo
- [x] Corrigido: 1º vídeo do Padre Paulo Ricardo era sobre nulidade de casamento — trocado
      por "Aprenda a rezar o Terço" e "Exame de consciência" (mais universal)
- [x] **Sagrado Coração de Jesus** (/sagrado-coracao): história completa (Santa Margarida
      Maria Alacoque, Paray-le-Monial, São Cláudio de La Colombière, até o carisma
      dehoniano do Pe. Léon Dehon), as 12 promessas com a Grande Promessa em destaque, e
      o método de consagração com o Ato de Consagração de Leão XIII (1899)
- [ ] Ampliar pregadores já existentes: Padre Léo e Monsenhor Jonas Abib pedidos com "bastante"
      pregação (hoje têm 5 e 6 — a equipe quer bem mais)
- [ ] Tema claro (leitura de dia)
- [x] **Rosário** (/rosario): rezar (passo a passo guiado, com contador de Ave-Marias),
      aprender (tutorial + diagrama do terço), história completa (até São João Paulo II
      e os Mistérios Luminosos), estudo dos 20 mistérios com referência bíblica, e
      aparições de Nossa Senhora (Aparecida em destaque, Guadalupe, Lourdes, Fátima,
      Medalha Milagrosa) — pronto para receber imagem de Nossa Senhora Aparecida
      quando a equipe enviar (fica em `src/content/rosario/aparicoes.ts`, campo `imagem`)
- [ ] **Notícias da fé** (/noticias): Vaticano + Igreja no Brasil + Vale do Paraíba
      (Aparecida/A12 e Canção Nova ficam na região). Só título + resumo + data + link
      pra fonte, com crédito. Precisa de uma função pequena lendo RSS (dá pra fazer no 1º deploy)

## Fase 2 — contas e comunidade (backend: Supabase plano grátis)

- [ ] **Login / cadastro** (prévia da tela já está no Quiz). Login com Instagram é uma opção
      real (OAuth via Meta), mas exige criar um app no Meta for Developers e passar pela
      revisão da Meta — não é imediato. Pode entrar como opção **junto** de e-mail/senha,
      não como único jeito de entrar (nem todo jovem quer linkar o Instagram)
- [ ] **Quiz católico**: pontuação, ranking, dificuldade crescente, perguntas sem repetição
      (banco curado + geração assistida por IA), explicação com fonte
- [ ] **Testemunhos**: usuário conta a história dele (conversão, missão, superação), com nome
      ou anônimo; outros **curtem e comentam**; ver repercussão; moderação antes de publicar
- [ ] **Curtir e comentar** também nas páginas de santos e heróis
- [ ] **Área ADM**: subir pregações (áudio), álbuns de foto (Desperta, encontros, missões,
      eventos), publicar/esconder, revisar textos e sugestões de santos
- [ ] Página "quem somos / o que fazemos" da Missão Adonai
- [ ] Fila de sugestões de santos/pregações/músicas chega para a equipe — hoje fica só no
      aparelho de quem sugeriu (localStorage), ninguém mais vê. Precisa de banco de dados
      central pra isso funcionar de verdade

### Fila de moderação de conteúdo indicado pelo usuário (definido pela equipe)

Quando um usuário logado indica uma música/pregação/livro pelo site:
1. Uma **triagem automática** (checagem simples de palavras-chave, ou um classificador de
   IA) avalia se o conteúdo parece católico antes de qualquer coisa — barra na hora
   indicações claramente fora do tema (funk, sertanejo, autoajuda etc.)
2. O que passar (ou ficar em dúvida) vai pra uma **fila de aprovação** visível só para os
   administradores — nada é publicado sozinho
3. **Administradores** (acesso total): Weslei, Sandro e Bárbara
4. **Revisores** (avaliam a fila, mas sem os poderes de admin): outras pessoas do grupo,
   escolhidas pela equipe
5. Só depois de aprovado o conteúdo aparece pra todo mundo no app

Isso substitui a ideia de "atualizar sozinho de 5 em 5 horas" — publicar automaticamente
sem revisão é arriscado pra um app que promete ser só conteúdo católico. A triagem por IA
pode rodar sozinha e rápido; a aprovação final continua sendo de gente.

## Fase 3 — IA

- [ ] **Católico Responde**: assistente com busca no acervo do site (Catecismo, santos,
      documentos), responde objeções e dúvidas sempre com a fonte; revisão de alguém com formação

## Fase 4 — alcance

- [x] Botão de Instagram em Comunidade (@go.adonai) — leva direto pro perfil/stories.
      **Importante:** não existe API pública pra "embutir" Stories ao vivo dentro do site
      (nem Meta libera isso pra terceiros); o link direto é o equivalente prático que existe
- [ ] Compartilhar conteúdo do site **para** o Instagram Stories: funciona bem em celular via
      o botão "Compartilhar" que já existe (usa o menu nativo do aparelho — a pessoa escolhe
      Instagram como destino ali). Um botão dedicado só pra Stories exigiria app nativo
- [ ] **TikTok**: dá pra embutir vídeos públicos de perfis católicos (like o YouTube — TikTok
      tem oEmbed oficial), sempre com crédito e link pro perfil. Não dá pra puxar Stories/vídeos
      automaticamente sem a pessoa escolher quais
- [ ] **Vitrine de influenciadores católicos**: página dando crédito e linkando perfis
      (Instagram/TikTok/YouTube) de criadores de conteúdo católico como referência — precisa
      da equipe escolher quem
- [ ] Notificações ("Evangelho do dia" no celular)
- [ ] Empacotar como aplicativo (Play Store / App Store)

## Assinatura paga (R$ 9,90–10/mês) — o que falta decidir

A equipe quer cobrar uma mensalidade recorrente (Pix, crédito ou débito) pra sustentar a
missão. Isso é possível, mas com um limite de segurança importante:

- **Eu não posso guardar nem usar dados bancários reais** (conta, agência, cartão) em lugar
  nenhum do código ou do site — isso é dado sensível demais pra ficar em texto num projeto,
  e processar cartão/Pix direto é coisa de instituição financeira licenciada, não de um site.
- O jeito certo: a Missão cria uma conta num **processador de pagamentos** (Mercado Pago é o
  mais simples no Brasil pra assinatura recorrente — aceita Pix, crédito e débito). A conta
  bancária de vocês fica **cadastrada dentro do Mercado Pago**, nunca no nosso código.
- Depois de criada a conta, eu integro o checkout deles no site usando a chave de API que
  o Mercado Pago fornece — sem tocar em número de cartão ou dado bancário em nenhum momento.
- Recomendação: **CNPJ/MEI** facilita bastante cobrança recorrente e imposto; pessoa física
  também dá, com mais limitação.
- Isso entra junto com o login da Fase 2 (precisa saber quem pagou pra liberar o acesso).

- [x] **Pregações de convidados** (/comunidade/pregadores): 7 pastas com vídeos reais do
      YouTube e crédito ao canal — Moisés Rocha (24), Padre Léo, Charles Vieira (com a
      série completa das 7 Moradas do Castelo Interior), Monsenhor Jonas Abib, PHN,
      Glória Polo, Padre Paulo Ricardo (Escola da Fé) e Padre Fábio de Melo (Direção
      Espiritual). "Indique uma pregação" pronto para novas sugestões
- [x] **Músicas Adonai** (/comunidade/musicas): Spotify do grupo embutido (artista "Go Adonai")
- [ ] Pregação própria da Missão ("Até Encontrá-la", Retiro Desperta): aguardando áudio
      comprimido do usuário (arquivo original tem 315 MB, precisa reduzir para MP3)
- [x] **Anderson Reis** adicionado aos pregadores: tríduo Céu/Inferno/Purgatório + 5 outras,
      Instagram confirmado (@andersonpregador, via link oficial do canal dele)
- [x] **Louvor católico** (/comunidade/musicas): Adonai, Colo de Deus, Flavinho, Cristo
      Alegria, Fraternidade O Caminho (todos Spotify, verificados) + playlist "Em alta"
- [x] **Audiobooks católicos** (/comunidade/audiobooks): Glória Polo, Confissões de Santo
      Agostinho, Bíblia Narrada por Cid Moreira (4 livros pra começar)

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

## Pedido novo (anotado, executar depois do deploy)

- [ ] **Leitor de livro dentro do site**: os PDFs da Biblioteca não abrem mais direto/baixam
      por padrão — abrem num leitor no próprio site, com efeito de **virar página** (tipo
      livro de verdade), bonito no celular e no tablet. Manter um botão separado de "baixar
      PDF" pra quem quiser o arquivo. Viável com uma lib de PDF (pdf.js) + efeito de
      passar página (ex. StPageFlip / react-pageflip).

## Regra de acesso definida pelo usuário (executar na Fase 2 — login)

- **Livre, sem login**: hero da Hoje até o card de Evangelho/devocional (a parte de cima da
  tela Hoje) — inclui "Pequenas coisas com grande amor" e o que vem antes dele.
- **Precisa de login + assinatura paga**: a seção "Explorar a fé" inteira pra baixo — Bíblia,
  Catecismo, Heróis da Fé, Heróis Bíblicos, Audiobooks, Livros, Quiz, Testemunhos, Católico
  Responde, Lumine, Sagrado Coração, Rosário, tudo de Comunidade/Pregações — e mais pra baixo.
  Clicar em qualquer um desses sem login pede pra entrar e assinar.
- **Quiz com perguntas geradas por IA**: pedido reforçado de novo — entra depois que o quiz
  básico (banco fixo de perguntas) estiver funcionando.

## Pedido novo (anotado, executar depois do login+pagamento)

- **Sugestões dos usuários com armazenamento persistente**: em Livros, Audiobooks e Músicas,
  cada usuário logado pode indicar/sugerir conteúdo novo — por ex. subir o link de uma
  playlist católica que ele goste, ou pedir um livro específico. Fica guardado num banco
  (não é local do navegador dele) numa fila de sugestões.
- **Puxar automaticamente no deploy**: toda vez que o Weslei subir uma atualização do site
  (como está fazendo agora), o processo deve primeiro checar essa fila/histórico de
  sugestões pendentes e trazer pro conteúdo oficial o que já foi aprovado, sem ele ter que
  copiar/colar um por um.
- Encaixa com o design de moderação já combinado antes: sugestão entra → triagem automática
  → fila de aprovação humana (Weslei, Sandro, Bárbara) → só depois de aprovada é que entra
  no conteúdo de verdade do site.

## Pedido novo (anotado, executar depois do login por e-mail/senha)

- **Login com Instagram**: opção extra de cadastro/login (além de e-mail+senha), puxando
  automaticamente o nome e a fotinho de perfil do Instagram da pessoa. Precisa que o Weslei
  crie uma conta de desenvolvedor no Meta/Facebook e registre um "app" pra gerar as chaves
  (App ID e App Secret) — isso só ele consegue fazer, depois cola as chaves direto no
  Railway. O código de integração (OAuth) quem monta é o Claude.

## Biblioteca católica pra jovens (lista do Weslei, pesquisar PDF de cada um)

Dividir em duas coisas diferentes — não confundir:

1. **Santos pra conhecer** (biografia, sem PDF de livro escrito por eles) → entram/atualizam
   **Heróis da Fé / Santos**, não em "Livros":
   - São Carlo Acutis (✅ já atualizado pra canonizado, 07/09/2025) e São Pier Giorgio
     Frassati (canonizados juntos — falta criar o santo do Frassati ainda)
   - São João Bosco, Santa Gemma Galgani, São Padre Pio, São Francisco de Assis, Santa Clara
     de Assis, Santo Antônio de Pádua, São João Maria Vianney (Cura d'Ars), São Luís
     Gonzaga, São Domingos Sávio, Santa Maria Goretti, São José de Anchieta, Santa Dulce dos
     Pobres — conferir quais já existem em santos.ts antes de duplicar.

2. **Livros de verdade que eles escreveram** (aí sim é conteúdo de "Livros", com PDF pra
   baixar/ler) — pesquisar PDF gratuito e legal, de preferência em português, um por um:
   - Santo Agostinho — Confissões
   - Santa Teresa d'Ávila — Castelo Interior, Livro da Vida
   - São João da Cruz — Noite Escura, Subida do Monte Carmelo
   - Santa Teresinha do Menino Jesus — História de uma Alma (cuidado: tradução moderna pode
     ter direito autoral, igual aconteceu com a Bíblia — procurar tradução antiga/livre)
   - São Francisco de Sales — Introdução à Vida Devota
   - Santo Afonso Maria de Ligório — obras sobre oração e vida moral
   - Santa Catarina de Sena — Diálogo (ou cartas)
   - Santa Hildegarda de Bingen
   - São Tomás de Aquino — Suma Teológica (extensa; talvez só trechos/edição resumida)
   - Tratado da Verdadeira Devoção à Santíssima Virgem (Montfort) — já pesquisado uma vez
     (29/09/2026): só achei edições pagas (Cléofas/Vozes) ou Scribd com login. Continuar
     procurando uma tradução antiga realmente livre antes de desistir.

Progresso desta pesquisa (29/09/2026): baixados e confirmados de verdade — Gaudete et
Exsultate, Dilexit Nos e A Imitação de Cristo (Tomás de Kempis, Internet Archive, 428 pág.).
Deus Caritas Est veio quebrado na fonte oficial (1 página em branco) — mantido como link
"Ler online" em vez de PDF falso.
