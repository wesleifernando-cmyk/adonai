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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    errorElement: <ErrorView />,
    children: [
      { index: true, element: <HojePage /> },
      { path: "evangelho", element: <EvangelhoPage /> },
      { path: "biblia", element: <BibliaPage /> },
      { path: "biblia/:livro", element: <LivroPage /> },
      { path: "biblia/:livro/:capitulo", element: <CapituloPage /> },
      { path: "catecismo", element: <CatecismoPage /> },
      { path: "santos", element: <SantosPage /> },
      { path: "santos/:slug", element: <SantoPage /> },
      { path: "herois-da-fe", element: <HeroisFePage /> },
      { path: "herois-biblicos", element: <HeroisBiblicosPage /> },
      { path: "doutores", element: <DoutoresPage /> },
      { path: "documentos", element: <DocumentosPage /> },
      { path: "devocionais", element: <DevocionaisPage /> },
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
      { path: "ajude", element: <AjudePage /> },
      { path: "testemunhos", element: <TestemunhosPage /> },
      { path: "noticias", element: <NoticiasPage /> },
      { path: "rosario", element: <RosarioPage /> },
      { path: "rosario/rezar", element: <RezarPage /> },
      { path: "rosario/aprenda", element: <AprendaPage /> },
      { path: "rosario/historia", element: <HistoriaRosarioPage /> },
      { path: "rosario/misterios", element: <MisteriosPage /> },
      { path: "rosario/misterios/:slug", element: <ConjuntoPage /> },
      { path: "rosario/aparicoes", element: <AparicoesPage /> },
      { path: "rosario/aparicoes/:slug", element: <AparicaoPage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "mais", element: <MaisPage /> }
    ]
  }
]);
