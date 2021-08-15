import React, { useState} from 'react';
import ActorGrid from '../Component/Actors/ActorGrid';
import MainPageLayout from '../Component/MainPageLayout';
import ShowGrid from '../Component/Shows/ShowGrid';
import { getAPI } from '../helpers/config';

const Home = () => {
  const [input, ChangeInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const isShowsSelected = searchOption === 'shows';

  const handleInputChange = e => {
    ChangeInput(e.target.value);
  };

  const onSearch = () => {
    getAPI(`/search/${searchOption}?q=${input}`).then(data => {
      setResults(data);
    });
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  const renderResults = () => {
    if (results && results.length === 0) return <div>No results found!</div>;

    if (results && results.length > 0)
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );

    return null;
  };

  const handleSearchOption = e => {
    setSearchOption(e.target.value);
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        placeholder="Search Movie or Actor"
      />

      <div>
        <label htmlFor="search-shows">
          Shows
          <input
            type="radio"
            id="search-shows"
            onChange={handleSearchOption}
            value="shows"
            checked={isShowsSelected}
          />
        </label>

        <label htmlFor="search-actors">
          Actors
          <input
            type="radio"
            id="search-actors"
            onChange={handleSearchOption}
            value="people"
            checked={!isShowsSelected}
          />
        </label>
      </div>

      <button type="button" onClick={onSearch}>
        search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
