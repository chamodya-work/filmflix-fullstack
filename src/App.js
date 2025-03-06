import Login from "./Containers/Account/login.js";
import Home from "./Containers/Home/Home.js";
import SignUp from "./Containers/Account/signup.js";
import Movie from "./Containers/Movie/movie.js";
import TVSeries from "./Containers/TVSeries/tvSeries.js";
import Docs from "./Containers/Docs/doc.js";
import MovieTrailer from "./Components/MovieTrailer/movieTrailer.js";
import Content from "./Containers/Content/content.js";
import TVSeriesTrailer from "./Components/TVSeriesTrailer/tvSeriesTrailer.js";
import DocTrailer from "./Components/DocTrailer/docTrailer.js";
import Neutral from "./Components/NeutralPage/neutral.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop.js";

import PreventBackButton from "./Components/PreventBackButton";



function App() {
  return (
    
    <div className="App">
      <Router>
        <ScrollToTop/>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/series" element={<TVSeries />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/movieTrailer/:movie_id" element={<MovieTrailer />} />
          <Route
            path="/seriesTrailer/:series_id"
            element={<TVSeriesTrailer />}
          />
          <Route path="/docTrailer/:doc_id" element={<DocTrailer />} />
          <Route path="/addContent" element={<Content />} />
          <Route path="/" element={<Neutral />} />
          <Route
            path="/"
            element={
              <>
                <PreventBackButton /> {/* Prevent back navigation */}
                <Neutral />
              </>
            }
          />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
