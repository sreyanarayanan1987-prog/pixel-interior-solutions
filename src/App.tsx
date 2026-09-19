import { Route, Routes } from "react-router-dom";
import { Layout } from "./Components";
import { About, Contact, Gallery, Home, ServicesPage } from "./Pages";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
