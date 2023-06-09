import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import HomePage from './components/Home.page';
import RQSuperHeroesPage from './components/RQSuperHeroes.page';
import SuperHeroesPage from './components/SuperHeroes.page';
import RQSuperHero from './components/RQSuperHero';
import ParallerQueriesPage from './components/ParallerQueries.page';
import DynamicParallelPage from './components/DynamicParallel.page';
import DependantPage from './components/Dependant.page';
import { PaginatedQueriesPage } from './components/PaginatedQueries.page';
import { InfiniteQueriesPage } from './components/InfiniteQueries.page';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
          <Route path='/rq-infinite' element={<InfiniteQueriesPage />} />
            <Route path='/rq-paginated' element={<PaginatedQueriesPage />} />
            <Route path='/rq-dependent' element={<DependantPage email={'myname@example.com'} />} />
            <Route path='/rq-dynamic-parallel' element={<DynamicParallelPage heroIds={[1, 3]} />} />
            <Route path='/rq-parallel' element={ <ParallerQueriesPage />} />
            <Route path='/super-heroes' element={<SuperHeroesPage />} />
            <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
            <Route path='/rq-details-hero/:heroId' element={<RQSuperHero />} />
            <Route path='/' element={<HomePage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
