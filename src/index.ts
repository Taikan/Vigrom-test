import { Router } from "./Router";
import { createHashHistory } from "history";
import { Menu } from "./pages/Menu";
import { ItemsPage } from "./pages/ItemsPage";
import { AboutPage } from "./pages/AboutPage";

new Router(document.getElementById("app")!, createHashHistory(), {
  "/": Menu,
  "/items": ItemsPage,
  "/about": AboutPage
});
