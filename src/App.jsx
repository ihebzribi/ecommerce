import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Listarticle from "./components/articles/Listarticle";
import Insertarticle from "./components/articles/Insertarticle";
import Editarticle from "./components/articles/Editarticle";
import Viewarticle from "./components/articles/Viewarticle";
import Listcategorie from "./components/categories/Listcategorie";
import Insertcategorie from "./components/categories/Insertcategorie";
import Editcategorie from "./components/categories/Editcategorie";
import Viewcategorie from "./components/categories/Viewcategorie";
import Listscategorie from "./components/scategories/Listscategorie";
import Insertscategorie from "./components/scategories/Insertscategorie";
import Editscategorie from "./components/scategories/Editscategorie";
import Viewscategorie from "./components/scategories/Viewscategorie";
import Menu from "./Menu";
import { CartProvider } from "use-shopping-cart";
import Cart from "./components/client/Cart";
import Listarticlecard from "./components/client/Listarticlescard";

const App = () => {
  return (
    <div>
      <CartProvider>
        <Router>
          <Menu />
          <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/client" element={<Listarticlecard />} />
            <Route path="/articles" element={<Listarticle />} />
            <Route path="/articles/add" element={<Insertarticle />} />
            <Route path="/article/edit/:id" element={<Editarticle />} />
            <Route path="/article/view/:id" element={<Viewarticle />} />
            <Route path="/categories" element={<Listcategorie />} />
            <Route path="/categories/add" element={<Insertcategorie />} />
            <Route path="/categories/edit/:id" element={<Editcategorie />} />
            <Route path="/categories/view/:id" element={<Viewcategorie />} />
            <Route path="/scategories" element={<Listscategorie />} />
            <Route path="/scategories/add" element={<Insertscategorie />} />
            <Route path="/scategories/edit/:id" element={<Editscategorie />} />
            <Route path="/scategories/view/:id" element={<Viewscategorie />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
};
export default App;
