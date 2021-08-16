import React from 'react';
import NOT_FOUND_IMAGE from '../../images/not-found.png';
import { Star } from '../styled';
import { Headline, MainDataWrapper, TagList } from './ShowMainPage.styles';

const ShowMainPage = ({ name, rating, summary, tags, image }) => {
      return (
        <MainDataWrapper>
          <img src={image ? image.original : NOT_FOUND_IMAGE} alt="show-cover" />
          <div className='text-side'>
            <Headline>
              <h1>{name}</h1>
              <div>
                <Star active/>
                <span>{rating.average || 'N/A'}</span>
              </div>
            </Headline>
            <div className='summary' dangerouslySetInnerHTML={{ __html: summary }} />
    
            <div>
              Tags:{' '}
              <TagList>
                {tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </TagList>
            </div>
          </div>
        </MainDataWrapper>
      );
    };

export default ShowMainPage
