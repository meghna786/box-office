/* eslint-disable no-underscore-dangle */
import React, { useReducer, useEffect } from 'react';
import { useParams } from 'react-router';
import Cast from '../Component/Shows/Cast';
import Details from '../Component/Shows/Details';
import Seasons from '../Component/Shows/Seasons';
import ShowMainPage from '../Component/Shows/ShowMainPage';
import { getAPI } from '../helpers/config';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const Reducer = (prevState, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...prevState,
                show: action.show,
                isLoading: false,
                error: null,
            };
        case 'FETCH_FAILED':
            return {
                ...prevState,
                error: action.error,
                isLoading: false,
            };
        default:
            return prevState;
    }
};

const initialShowState = {
    show: null,
    isLoading: true,
    error: null,
};

const Show = () => {
    const { id } = useParams();
    const [{ show, isLoading, error }, dispatch] = useReducer(
        Reducer,
        initialShowState
    );
    //     const [show, setShow] = useState(null);
    //     const [isLoading, setLoading] = useState(true);
    //     const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        // because this getAPI then is async action so even after we go to next page react still tries to update the state.....when we switch pages our component is unMounted but react does not know about it  ...therefore we create  isMounted... if its true then only we show results.(we use CleanUp function for this)
        getAPI(`/shows/${id}?embed[]=seasons&embed[]=cast`)
            .then(data => {
                if (isMounted) {
                    dispatch({ type: 'FETCH_SUCCESS', show: data });
                }
            })
            .catch(err => {
                if (isMounted) {
                    dispatch({ type: 'FETCH_FAILED', error: err.message });
                }
            });

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (isLoading) {
        return <div>Data is loading</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <ShowPageWrapper>
            <ShowMainPage
                name={show.name}
                image={show.image}
                rating={show.rating}
                tags={show.genres}
                summary={show.summary}
            />

            <InfoBlock>
                <h2>Details:</h2>
                <Details
                    status={show.status}
                    premiered={show.premiered}
                    network={show.network}
                />
            </InfoBlock>

            <InfoBlock>
                <h2>Seasons:</h2>
                <Seasons seasons={show._embedded.seasons} />
            </InfoBlock>

            <InfoBlock>
                <h2>Cast:</h2>
                <Cast cast={show._embedded.cast} />
            </InfoBlock>
        </ShowPageWrapper>
    );
};

export default Show;
