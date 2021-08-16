/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router';
import Cast from '../Component/Shows/Cast';
import Details from '../Component/Shows/Details';
import Seasons from '../Component/Shows/Seasons';
import ShowMainPage from '../Component/Shows/ShowMainPage';
import { useShow } from '../helpers/custom-hooks';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const Show = () => {
    const { id } = useParams();
    const {show, isLoading, error}=useShow(id);

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
