import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow">
        <HomePage />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
