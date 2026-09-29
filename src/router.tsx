import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { ErrorView } from "./components/layout/ErrorView";
import { HojePage } from "./features/hoje/HojePage";
import { BibliaPage } from "./features/biblia/BibliaPage";
import { LivroPage } from "./features/biblia/LivroPage";
import { CapituloPage } from "./features/biblia/CapituloPage";
import { CatecismoPage } from "./features/catecismo/CatecismoPage";
import { SantosPage } from "./features/santos/SantosPage";
import { SantoPage } from "./features/santos/SantoPage";
import { HeroisFePage } from "./features/herois-da-fe/HeroisFePage";
import { HeroisBiblicosPage } from "./features/herois-biblicos/HeroisBiblicosPage";
import { DoutoresPage } from "./features/doutores/DoutoresPage";
import { DocumentosPage } from "./features/documentos/DocumentosPage";
import { DevocionaisPage } from "./features/devocionais/DevocionaisPage";
import { EvangelhoPage } from "./features/evangelho/EvangelhoPage";
import { QuizPage } from "./features/quiz/QuizPage";
import { CatolicoRespondePage } from "./features/catolico-responde/CatolicoRespondePage";
import { ComunidadePage } from "./features/comunidade/ComunidadePage";
import { PregadoresPage } from "./features/comunidade/PregadoresPage";
import { PregadorPage } from "./features/comunidade/PregadorPage";
import { MusicasPage } from "./features/comunidade/MusicasPage";
import { MusicaPage } from "./features/comunidade/MusicaPage";
import { AudiobooksPage } from "./features/audiobooks/AudiobooksPage";
import { AudiobookPage } from "./features/audiobooks/AudiobookPage";
import { LivrosPage } from "./features/livros/LivrosPage";
import { LerLivroPage } from "./features/livros/LerLivroPage";
import { SagradoCoracaoPage } from "./features/sagrado-coracao/SagradoCoracaoPage";
import { HistoriaSagradoCoracaoPage } from "./features/sagrado-coracao/HistoriaSagradoCoracaoPage";
import { PromessasPage } from "./features/sagrado-coracao/PromessasPage";
import { ConsagracaoPage } from "./features/sagrado-coracao/ConsagracaoPage";
import { LuminePage } from "./features/lumine/LuminePage";
import { AdminPage } from "./features/admin/AdminPage";
import { AjudePage } from "./features/ajude/AjudePage";
import { TestemunhosPage } from "./features/testemunhos/TestemunhosPage";
import { NoticiasPage } from "./features/noticias/NoticiasPage";
import { RosarioPage } from "./features/rosario/RosarioPage";
import { RezarPage } from "./features/rosario/RezarPage";
import { AprendaPage } from "./features/rosario/AprendaPage";
import { HistoriaRosarioPage } from "./features/rosario/HistoriaPage";
import { MisteriosPage } from "./features/rosario/MisteriosPage";
import { ConjuntoPage } from "./features/rosario/ConjuntoPage";
import { AparicoesPage } from "./features/rosario/AparicoesPage";
import { AparicaoPage } from "./features/rosario/AparicaoPage";
import { MaisPage } from "./features/mais/MaisPage";
import { RequireAcesso } from "./components/auth/RequireAcesso";
import { RequireAdmin } from "./components/auth/RequireAdmin";
import { EntrarPage } from "./features/auth/EntrarPage";
import { CadastroPage } from "./features/auth/CadastroPage";
import { AssinarPage } from "./features/assinar/AssinarPage";
import { FacebookCallbackPage } from "./features/auth/FacebookCallbackPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    errorElement: <ErrorView />,
    children: [
      { index: true, element: <HojePage /> },
      { path: "evangelho", element: <EvangelhoPage /> },
      { path: "santos", element: <SantosPage /> },
      { path: "santos/:slug", element: <SantoPage /> },
      { path: "doutores", element: <DoutoresPage /> },
      { path: "documentos", element: <DocumentosPage /> },
      { path: "devocionais", element: <DevocionaisPage /> },
      { path: "ajude", element: <AjudePage /> },
      { path: "noticias", element: <NoticiasPage /> },
      { path: "mais", element: <MaisPage /> },
      { path: "entrar", element: <EntrarPage /> },
      { path: "cadastro", element: <CadastroPage /> },
      { path: "assinar", element: <AssinarPage /> },
      { path: "auth/instagram/callback", element: <FacebookCallbackPage /> },
      {
        element: <RequireAdmin />,
        children: [{ path: "admin", element: <AdminPage /> }],
      },
      {
        // Tudo de "Explorar a fé" pra baixo: precisa de login + assinatura ativa.
        element: <RequireAcesso />,
        children: [
          { path: "biblia", element: <BibliaPage /> },
          { path: "biblia/:livro", element: <LivroPage /> },
          { path: "biblia/:livro/:capitulo", element: <CapituloPage /> },
          { path: "catecismo", element: <CatecismoPage /> },
          { path: "herois-da-fe", element: <HeroisFePage /> },
          { path: "herois-biblicos", element: <HeroisBiblicosPage /> },
          { path: "quiz", element: <QuizPage /> },
          { path: "catolico-responde", element: <CatolicoRespondePage /> },
          { path: "comunidade", element: <ComunidadePage /> },
          { path: "comunidade/pregadores", element: <PregadoresPage /> },
          { path: "comunidade/pregadores/:slug", element: <PregadorPage /> },
          { path: "comunidade/musicas", element: <MusicasPage /> },
          { path: "comunidade/musicas/:slug", element: <MusicaPage /> },
          { path: "audiobooks", element: <AudiobooksPage /> },
          { path: "audiobooks/:slug", element: <AudiobookPage /> },
          { path: "livros", element: <LivrosPage /> },
          { path: "livros/ler/:slug", element: <LerLivroPage /> },
          { path: "sagrado-coracao", element: <SagradoCoracaoPage /> },
          { path: "sagrado-coracao/historia", element: <HistoriaSagradoCoracaoPage /> },
          { path: "sagrado-coracao/promessas", element: <PromessasPage /> },
          { path: "sagrado-coracao/consagracao", element: <ConsagracaoPage /> },
          { path: "lumine", element: <LuminePage /> },
          { path: "testemunhos", element: <TestemunhosPage /> },
          { path: "rosario", element: <RosarioPage /> },
          { path: "rosario/rezar", element: <RezarPage /> },
          { path: "rosario/aprenda", element: <AprendaPage /> },
          { path: "rosario/historia", element: <HistoriaRosarioPage /> },
          { path: "rosario/misterios", element: <MisteriosPage /> },
          { path: "rosario/misterios/:slug", element: <ConjuntoPage /> },
          { path: "rosario/aparicoes", element: <AparicoesPage /> },
          { path: "rosario/aparicoes/:slug", element: <AparicaoPage /> },
        ],
      },
    ]
  }
]);
