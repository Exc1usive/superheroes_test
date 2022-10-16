import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className='home'>
      <h1>Hello, u can watch our superheroes or add new to our DBs, use navigation, please</h1>
      <Link to={"./superhero"}>
        <button className='btn btn-lg'>See all superheroes</button>
      </Link>
      <Link to={"./add"}>
        <button className='btn btn-lg'>Add new superhero</button>
      </Link>
    </div>
  );
}
