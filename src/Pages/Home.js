import React, { useState } from 'react';

import ActorGrid from '../Component/Actors/ActorGrid';
import MainPageLayout from '../Component/MainPageLayout';
import ShowGrid from '../Component/Shows/ShowGrid';
import { getAPI } from '../helpers/config';
import { UseLastQuery } from '../helpers/custom-hooks';
import CustomRadio from './CustomRadio';
import {
    RadioInputsWrapper,
    SearchButtonWrapper,
    SearchInput,
} from './Home.styled';

const Home = () => {
    const [input, ChangeInput] = UseLastQuery();
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
        if (results && results.length === 0)
            return <div>No results found!</div>;

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
            <SearchInput
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={onKeyDown}
                placeholder="Search Movie or Actor"
            />

            <RadioInputsWrapper>
                <div>
                    <CustomRadio
                        label="Shows"
                        id="search-shows"
                        onChange={handleSearchOption}
                        value="shows"
                        checked={isShowsSelected}
                    />
                </div>
                <div>
                    <CustomRadio
                        label=" Actors"
                        id="search-actors"
                        onChange={handleSearchOption}
                        value="people"
                        checked={!isShowsSelected}
                    />
                </div>
            </RadioInputsWrapper>

            <SearchButtonWrapper>
                <button type="button" onClick={onSearch}>
                    search
                </button>
            </SearchButtonWrapper>
            {renderResults()}
        </MainPageLayout>
    );
};

export default Home;
