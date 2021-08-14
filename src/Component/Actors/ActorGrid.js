import React from 'react';
import ActorCard from './ActorCard';
import NOT_FOUND_IMAGE from '../../images/not-found.png';
import { FlexGrid } from '../styled';

const ActorGrid = ({ data }) => {
      
  return (
    <FlexGrid>
      {data.map(({ person }) => (
        <ActorCard
          key={person.id}
          id={person.id}
          name={person.name}
          image={person.image ? person.image.medium : NOT_FOUND_IMAGE}
          gender={person.gender}
          birthday={person.birthday}
          deathday={person.deathday}
          country={person.country}

        />
      ))}
    </FlexGrid>
  );
};

export default ActorGrid;
