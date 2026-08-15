/** Orielé visual system: original luxury storefront routes, built around a translucent editoral header and commerce-first pacing. */
import { Route, Switch } from "wouter";
import BrandShell from "@/components/BrandShell";
import SmoothMotion from "@/components/SmoothMotion";
import Collection, { OccasionCollection } from "@/pages/Collection";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Story from "@/pages/Story";

function App() {
  return <SmoothMotion><BrandShell><Switch><Route path="/" component={Home} /><Route path="/collections/sola" component={Collection} /><Route path="/collections/bridal" component={OccasionCollection} /><Route path="/products/:slug" component={Product} /><Route path="/pages/our-story" component={Story} /><Route component={Home} /></Switch></BrandShell></SmoothMotion>;
}

export default App;
