import { Outlet, useLocation } from 'react-router-dom';
import './Administration.scss';
import { SideBarAdmin } from './components/SideBarAdmin/SideBarAdmin';
import { useEffect, useRef, useState } from 'react';


export function Administration() {
  const outletRef = useRef(null);
  const location = useLocation();
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (shouldScroll) {
      if (outletRef.current) {
        outletRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      setShouldScroll(false);
    }
  }, [shouldScroll, location]);

  const handleScrollToOutlet = () => {
    setShouldScroll(true);
  };

  return (
    <div className='Administration'>
      <SideBarAdmin onLinkClick={handleScrollToOutlet} />
      <div className='SideBarAdminContent' ref={outletRef}>
        <Outlet />
      </div>
    </div>

  );
}
