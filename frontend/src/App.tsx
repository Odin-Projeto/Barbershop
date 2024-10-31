import { Outlet } from 'react-router-dom';
import { NavMenu } from './components/nav/nav-menu';

function App() {
  return (
    <main
      style={{
        background: '#1D2939',
        height: '100%',
        maxWidth: '400px',
        margin: 'auto',
      }}
    >
      {/* <div className='left-0 fixed top-20 grid grid-cols-2 w-full z-10 pointer-events-none'>
        <div className='bg-gray-25/15 blur-4xl aspect-square rounded-full flex justify-center items-center -translate-x-1/2 '></div>
        <div className='bg-gray-25/15 blur-4xl aspect-square rounded-full flex justify-center items-center translate-x-1/2'></div>
      </div> */}
      <Outlet />
      <NavMenu />
    </main>
  );
}

export default App;
