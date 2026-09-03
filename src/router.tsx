import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { ErrorView } from "./components/layout/ErrorView";
import { HojePage } from "./features/hoje/HojePage";
import { BibliaPage } from "./features/biblia/BibliaPage";
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
import { AdminPage } from "./features/admin/AdminPage";
import { AjudePage } from "./features/ajude/AjudePage";
import { TestemunhosPage } from "./features/testemunhos/TestemunhosPage";
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
      { path: "ajude", element: <AjudePage /> },
      { path: "testemunhos", element: <TestemunhosPage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "mais", element: <MaisPage /> }
    ]
  }
]);
