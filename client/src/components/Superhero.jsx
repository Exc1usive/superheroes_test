import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../util/apiRequest";

export default function Superhero() {
  const [form, setForm] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    images: [],
  });
  const params = useParams();

  getOne(setForm, params);

  function imagesList() {
    let imagesWithoutMain = [...form.images];
    imagesWithoutMain.splice(0, 1);

    return imagesWithoutMain.map((image, i) => {
      return (
        <div key={i} className='superheroImage'>
          <img src={`../uploads/${image}`} alt={image} />
        </div>
      );
    });
  }

  return (
    <>
      <div className='home'>
        <h1 className='shNickname'>{form.nickname}</h1>
        <div className='superhero'>
          <div className='photo'>
            <img
              className='card-img-top cardImage'
              src={`../uploads/${form.images[0]}`}
              alt={form.nickname}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "../../unnamed.png";
              }}
            />{" "}
          </div>
          <div className='info'>
            <div className='blockOne'>
              <div>
                <p>Real name</p>
                <h4>{form.real_name}</h4>
              </div>

              <div>
                <p>Catch phrase</p>
                <h4>{form.catch_phrase}</h4>
              </div>
            </div>

            <hr />

            <div>
              <p>Superpowers</p>
              <h4>{form.superpowers}</h4>
            </div>

            <hr />

            <div>
              <p>Origin</p>
              <h4>{form.origin_description}</h4>
            </div>
          </div>
        </div>

        <div className='superheroImageList'>{imagesList()}</div>
      </div>
    </>
  );
}
