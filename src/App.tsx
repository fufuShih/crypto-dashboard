import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-900">
      <SiteHeader />
      <section className="flex-1 w-full">
        <HomePage />
      </section>
      <SiteFooter />
    </main>
  );
}

export default App;
