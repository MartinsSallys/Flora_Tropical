import { Navbar } from "./components/Navbar.js";
import { Footer } from "./components/Footer.js";
import { Home } from "./pages/Home.js";
import { Products } from "./pages/Products.js";
import { Consultoria } from "./pages/Consultoria.js";
import { Eventos } from "./pages/Eventos.js";

export function App() {
  return `
    <div class="page">
      <div class="topbar">
        <span>18+</span> Flora Tropical | head shop premium com experiência tropical.
      </div>
      ${Navbar()}
      <main>
        ${Home()}
        ${Products()}
        ${Consultoria()}
        ${Eventos()}
      </main>
      ${Footer()}
    </div>
  `;
}
