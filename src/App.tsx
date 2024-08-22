import { Outlet } from 'react-router-dom';

function App() {
  return (
    <main
      style={{
        background: '#1D2939',
        height: '100%',
      }}
    >
      <Outlet />
    </main>
  );
}

export default App;
