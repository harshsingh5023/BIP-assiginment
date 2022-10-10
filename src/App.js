// import logo from './logo.svg';
import React, { useEffect, useState} from 'react';
import './App.css';
import Header from './components/Header';
import Movie from './components/Movie';
import { Routes, Route, useNavigate, Link} from 'react-router-dom';

const url = "https://image.tmdb.org/t/p/original/";
function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["title"]);
  const [filterParam, setFilterParam] = useState(["All"]);

  useEffect(() => {
      fetch(
          "https://movie-task.vercel.app/api/popular?page=1"
      )
          .then((res) => res.json())
          .then(
              (res) => {
                  setIsLoaded(true);
                  var temp = [];
                  temp = res.data["results"];
                  setItems(temp);
              },
              (error) => {
                  setIsLoaded(true);
                  setError(error);
              }
          );
  }, []);

  const data = items;

  function search(items) {
      return items.filter((item) => {
          if (item.release_date.slice(0,4) == filterParam) {
              return searchParam.some((newItem) => {
                  return (
                      item[newItem]
                          .toString()
                          .toLowerCase()
                          .indexOf(q.toLowerCase()) > -1
                  );
              });
          } else if (filterParam ==  "All") {
              return searchParam.some((newItem) => {
                  return (
                      item[newItem]
                          .toString()
                          .toLowerCase()
                          .indexOf(q.toLowerCase()) > -1
                  );
              });
          }
      });
  }

  if (error) {
      return (
          <p>
              {error.message}, if you get this error, the free API I used
              might have stopped working.{" "}
          </p>
      );
  } else if (!isLoaded) {
      return <>loading...</>;
  } else {
      return (
          <div className="wrapper">
            <Header/>
              <div className="search-wrapper">
                  <label htmlFor="search-form">
                      <input
                          type="search"
                          name="search-form"
                          id="search-form"
                          className="search-input"
                          placeholder="Search for..."
                          value={q}
                          onChange={(e) => setQ(e.target.value)}
                      />
                      <span className="sr-only">Search movies here</span>
                  </label>

                  <div className="select">
                      <select
                          onChange={(e) => {
                              setFilterParam(e.target.value);
                          }}
                          className="custom-select"
                          aria-label="Filter Movies By Year"
                      >
                          <option value="All">Filter By Year</option>
                          <option value="2022">2022</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                          <option value="2019">2019</option>
                          <option value="2018">{"<"} 2019</option>
                      </select>
                      <span className="focus"></span>
                  </div>
              </div>
              <ul className="card-grid">
                  {search(data).map((item) => (
                    <Link key={item.id} to={`movies/${item.id}`}>

                          <article className="card" key={item.id}>
                              <div className="card-image">
                                  <img
                                      src={url + item.poster_path}
                                      alt={item.title}
                                      title={item.title}
                                  />
                              </div>
                              <div className="card-content">
                                  <h2 className="card-name">{item.title}</h2>
                                  <ol className="card-list">
                                      <li>
                                          Rating:{" "}
                                          <span>{item.vote_average}</span>
                                      </li>
                                  </ol>
                              </div>
                          </article>
                      </Link>
                  ))}
              </ul>
          </div>
      );
  }
}

export default App;
