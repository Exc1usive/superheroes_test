import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Header from "./views/Header";
import Add from "./components/Add";
import Superheroes from "./components/Superheroes";
import Superhero from "./components/Superhero";
import NoPage from "./views/NoPage";
import Edit from "./components/Edit";
import ErrorPage from "./views/ErrorPage";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Home />} />

          <Route path='superhero' element={<Superheroes />} />
          <Route path='superhero/:id' element={<Superhero />} />

          <Route path='add' element={<Add />} />

          <Route path='edit/:id' element={<Edit />} />

          <Route path='*' element={<NoPage />} />
          <Route path='error' element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
