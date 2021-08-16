/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import MainPageLayout from '../Component/MainPageLayout';
import ShowGrid from '../Component/Shows/ShowGrid';
import { getAPI } from '../helpers/config';
import { useShows } from '../helpers/custom-hooks';

const Starred = () => {
    const [starred] = useShows();
    const [shows, setShows] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (starred && starred.length >= 0) {
            const promises = starred.map(showId => getAPI(`/shows/${showId}`));
            Promise.all(promises)
            .then((apiData)=>apiData.map(show=>({show})))
                .then(response => {
                    setShows(response);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [starred]);

    return (
        <MainPageLayout>
            {isLoading && <div>Shows are loading</div>}
            {!isLoading && !shows && (
                <div>No shows added to Favourites</div>
            )}
            {error && <div>Error Occured</div>}
            {!isLoading && !error && <ShowGrid data={shows} />}
        </MainPageLayout>
    );
};

export default Starred;
