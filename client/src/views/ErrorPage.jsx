import React from "react";

export default function ErrorPage() {
  return (
    <div className='home'>
      <h1>Something go wrong, try again</h1>
      <button className='btn btn-lg'>
        <a className='nav-link' href='/superhero'>
          See all superheroes
        </a>
      </button>
      <button className='btn btn-lg'>
        <a className='nav-link' href='/add'>
          Add new superhero
        </a>
      </button>
    </div>
  );
}
