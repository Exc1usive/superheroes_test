import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Pagination from "../util/pagination";
import { getAll, deleteOne } from "../util/apiRequest";

const SuperheroesList = (props) => (
  <div className='superheroesCard'>
    <Link to={`/superhero/${props.record._id}`}>
      <img
        className='card-img-top cardImage'
        src={`../uploads/${props.record.images[0]}`}
        alt={props.record.nickname}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = "../unnamed.png";
        }}
      />
    </Link>
    <p className='superheroName p-0'>{props.record.nickname}</p>
    <div className='cardButtonBox'>
      <Link className='btn btn-primary cardButton' to={`/edit/${props.record._id}`}>
        Edit
      </Link>
      <button
        className='btn btn-primary cardButton deleteButton'
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </div>
  </div>
);

export default function Superheroes() {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  getAll(setRecords);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = records.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //This method will map out the records on the page
  function recordList() {
    return currentPosts.map((record) => {
      return (
        <div key={record._id} className='superheroesBox'>
          <SuperheroesList
            record={record}
            deleteRecord={() => deleteOne(record._id, records, setRecords)}
            key={record._id}
          />
        </div>
      );
    });
  }

  return (
    <div className='superheroes'>
      <h1>List of all superheroes</h1>
      <div className='superheroesList'>{recordList()}</div>
      <div className='superheroesPagination'>
        <Pagination postsPerPage={postsPerPage} totalPosts={records.length} paginate={paginate} />
      </div>
      <Outlet />
    </div>
  );
}
