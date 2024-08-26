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
      <Outlet />
      <NavMenu />
    </main>
  );
}

export default App;
