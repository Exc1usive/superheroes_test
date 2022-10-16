import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { put, getOne, deleteImage } from "../util/apiRequest";

export default function Edit() {
  const [form, setForm] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    images: [],
  });

  const [newImages, setNewImages] = useState({
    images: [],
  });

  const params = useParams();
  const navigate = useNavigate();

  getOne(setForm, params);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // These methods will update the state properties images
  function updatePhoto(value) {
    return setNewImages((prev) => {
      return { images: [...value.target.files] };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newSuperhero = new FormData();

    newSuperhero.append("nickname", form.nickname);
    newSuperhero.append("real_name", form.real_name);
    newSuperhero.append("origin_description", form.origin_description);
    newSuperhero.append("superpowers", form.superpowers);
    newSuperhero.append("catch_phrase", form.catch_phrase);
    for (let i = 0; i < newImages.images.length; i++) {
      newSuperhero.append("images", newImages.images[i]);
    }

    put(newSuperhero, params);

    setForm({
      nickname: "",
      real_name: "",
      origin_description: "",
      superpowers: "",
      catch_phrase: "",
      images: [],
    });

    navigate("/superhero");
  }

  function imagesList() {
    return form.images.map((image, i) => {
      return (
        <div key={i} className='container'>
          <img src={`../uploads/${image}`} alt={image} />
          <div className='overlay'>
            <div
              className='text'
              name={image}
              onClick={() => deleteImage(setForm, params, form, image)}
            >
              Press for delete this image
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className='editSuperhero home'>
      <h1>Edit Record</h1>

      <div className='editBlock'>
        <div className='superhero'>
          <div>
            <div className='editedNick'>
              <h1 className='shNickname'>{form.nickname}</h1>
            </div>
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

        <form onSubmit={onSubmit} encType='multipart/form-data' className='addForm'>
          <div className='form-group'>
            <label htmlFor='nickname'>Nickname</label>
            <input
              type='text'
              className='form-control'
              id='nickname'
              value={form.nickname}
              onChange={(e) => updateForm({ nickname: e.target.value })}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='real_name'>Real name</label>
            <input
              type='text'
              className='form-control'
              id='real_name'
              value={form.real_name}
              onChange={(e) => updateForm({ real_name: e.target.value })}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='origin_description'>Origin description</label>
            <input
              type='text'
              className='form-control'
              id='origin_description'
              value={form.origin_description}
              onChange={(e) => updateForm({ origin_description: e.target.value })}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='superpowers'>Superpowers</label>
            <input
              type='text'
              className='form-control'
              id='superpowers'
              value={form.superpowers}
              onChange={(e) => updateForm({ superpowers: e.target.value })}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='catch_phrase'>Catch phrase</label>
            <input
              type='text'
              className='form-control'
              id='catch_phrase'
              value={form.catch_phrase}
              onChange={(e) => updateForm({ catch_phrase: e.target.value })}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='images'>Add images</label>
            <input
              type='file'
              name='images'
              className='form-control'
              accept='image/png, image/jpeg, image/jpg'
              onChange={(e) => updatePhoto(e)}
              multiple={true}
            />
          </div>

          <div className='form-group'>
            <input type='submit' value='Update superhero' className='btn btn-primary' />
          </div>
        </form>
      </div>

      <div className='imageList'>{imagesList()}</div>
    </div>
  );
}
