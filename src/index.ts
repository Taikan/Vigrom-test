import { Router } from "./Router/Router";
import { Menu } from "./pages/Menu";
import { ItemsPage } from "./pages/ItemsPage";
import { AboutPage } from "./pages/AboutPage";

new Router(document.getElementById("app")!, {
  "/": Menu,
  "/items": ItemsPage,
  "/about": AboutPage
});
