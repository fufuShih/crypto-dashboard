import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-900">
      <SiteHeader />
      <section id="main-section" className="flex-1 w-full flex">
        <div className="min-h-screen w-full bg-gradient-to-br from-[#667eea] to-[#764ba2] p-6">
          <HomePage />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

export default App;
