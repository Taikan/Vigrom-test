import { Router } from "./Router/Router";
import { Menu } from "./pages/Menu";
import { ItemsPage } from "./pages/ItemsPage";
import { AboutPage } from "./pages/AboutPage";
import { HistoryController } from "./components/HistoryController";

const router = new Router(document.getElementById("app")!, {
  "/": Menu,
  "/items": ItemsPage,
  "/about": AboutPage
});

router.setDebugComponent(
  document.getElementById("history")!,
  HistoryController
);
