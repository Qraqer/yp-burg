import { cloneElement, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './nav-item.module.css';

type INavItemProp = {
  to: string;
  text: string;
  icon: React.JSX.Element;
  className?: string;
};

export const NavItem = ({
  to,
  text,
  icon,
  className = '',
}: INavItemProp): React.JSX.Element => {
  const location = useLocation();
  const [isCurrentRoute, checkCurrentRoute] = useState(false);

  useEffect(() => {
    checkCurrentRoute(location.pathname === to);
  }, [to, location.pathname]);

  return (
    <NavLink
      to={to}
      className={`${styles.link} ${isCurrentRoute ? styles.active : ''} ${className}`}
    >
      {cloneElement(icon, { type: isCurrentRoute ? 'primary' : 'secondary' })}
      <p className="text text_type_main-default ml-2">{text}</p>
    </NavLink>
  );
};
