/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import axios from "axios";
import config from "../config.json";

export function getAll(setRecords) {
  useEffect(() => {
    axios
      .get(`${config.SERVER_URL}/api/superheroes`)
      .then((res) => setRecords(res.data))
      .catch((err) => console.log(err));
  }, []);
}

// POST request to add superhero
export function post(newSuperhero) {
  axios
    .post(`${config.SERVER_URL}/api/superheroes`, newSuperhero)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
}

// PUT request to update superhero
export function put(newSuperhero, params) {
  axios
    .put(`${config.SERVER_URL}/api/superheroes/${params.id.toString()}`, newSuperhero)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
}

export function getOne(setForm, params) {
  useEffect(() => {
    axios
      .get(`${config.SERVER_URL}/api/superheroes/${params.id.toString()}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.log(err));
  }, [params.id]);
}

export function deleteImage(setForm, params, form, image) {
  axios
    .delete(`${config.SERVER_URL}/api/superheroes/${params.id.toString()}/${image}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));

  const newForm = form.images.filter((prev) => prev !== image);
  setForm((prev) => {
    return { ...prev, images: newForm };
  });
}

export function deleteOne(id, records, setRecords) {
  axios
    .delete(`${config.SERVER_URL}/api/superheroes/${id.toString()}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));

  const newRecords = records.filter((prev) => prev._id !== id);
  setRecords(newRecords);
}
