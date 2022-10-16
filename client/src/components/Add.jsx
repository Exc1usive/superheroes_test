import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../util/apiRequest";

export default function Add() {
  const [form, setForm] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    images: [],
  });

  const navigate = useNavigate();

  // These methods will update the state properties all string
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // These methods will update the state properties images
  function updatePhoto(value) {
    return setForm((prev) => {
      return { ...prev, images: [...value.target.files] };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    const newSuperhero = new FormData();

    newSuperhero.append("nickname", form.nickname);
    newSuperhero.append("real_name", form.real_name);
    newSuperhero.append("origin_description", form.origin_description);
    newSuperhero.append("superpowers", form.superpowers);
    newSuperhero.append("catch_phrase", form.catch_phrase);
    for (let i = 0; i < form.images.length; i++) {
      newSuperhero.append("images", form.images[i]);
    }

    post(newSuperhero);

    setForm({
      nickname: "",
      real_name: "",
      origin_description: "",
      superpowers: "",
      catch_phrase: "",
      images: [],
    });

    setTimeout(() => {
      navigate("/superhero");
    }, 1000);
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div className='home'>
      <h3>Create New Record</h3>

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
          <input type='submit' value='Add superhero' className='btn btn-primary' />
        </div>
      </form>
    </div>
  );
}
