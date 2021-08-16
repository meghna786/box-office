import React from 'react';
import ShowCard from './ShowCard';
import NOT_FOUND_IMAGE from '../../images/not-found.png';
import { FlexGrid } from '../styled';
import { useShows } from '../../helpers/custom-hooks';

const ShowGrid = ({ data }) => {
    const [StarredState, StarredDisptach] = useShows();
    return (
        <FlexGrid>
            {data.map(({ show }) => {
                const isStarred = StarredState.includes(show.id);

                const onStarClick = () => {
                    if (isStarred) {
                        StarredDisptach({ type: 'REMOVE', showID: show.id });
                    } else StarredDisptach({ type: 'ADD', showID: show.id });
                };

                return (
                    <ShowCard
                        key={show.id}
                        id={show.id}
                        name={show.name}
                        image={show.image ? show.image.medium : NOT_FOUND_IMAGE}
                        summary={show.summary}
                        onStarClick={onStarClick}
                        isStarred={isStarred}
                    />
                );
            })}
        </FlexGrid>
    );
};

export default ShowGrid;
