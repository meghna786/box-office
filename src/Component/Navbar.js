import React, {memo} from 'react';
import { useLocation } from 'react-router';
import { LinkStyled, NavList } from './Navbar.styled';

const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];


const Navbar = () => {
  const location=useLocation();
  // eslint-disable-next-line no-console
  console.log('location is', location);
  return (
    <div>
      <NavList>
        {LINKS.map(item => (
          <li key={item.to}>
            <LinkStyled className={location.pathname===item.to?'active':''} to={item.to}>{item.text}</LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default memo(Navbar);
