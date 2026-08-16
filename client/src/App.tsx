/** Golden Hour visual system: original luxury storefront routes, built around a translucent editorial header and commerce-first pacing. */
import { Route, Switch } from "wouter";
import BrandShell from "@/components/BrandShell";
import SmoothMotion from "@/components/SmoothMotion";
import { CartProvider } from "@/contexts/CartContext";
import { FavouritesProvider } from "@/contexts/FavouritesContext";
import Collection from "@/pages/Collection";
import Account from "@/pages/Account";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Story from "@/pages/Story";

function App() {
  return <CartProvider><FavouritesProvider><SmoothMotion><BrandShell><Switch><Route path="/" component={Home} /><Route path="/account" component={Account} /><Route path="/collections/:edit" component={Collection} /><Route path="/products/:slug" component={Product} /><Route path="/pages/our-story" component={Story} /><Route component={Home} /></Switch></BrandShell></SmoothMotion></FavouritesProvider></CartProvider>;
}

export default App;
