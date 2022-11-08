
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import {
  Landing,
  Error,
  Register,
  ProtectedRoute
} from './pages';
import {
  Stats,
  SharedLayout,
  Profile,
  AllJobs,
  AddJob
} from './pages/dashboard';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element={
            <ProtectedRoute>
              <SharedLayout/>
            </ProtectedRoute>
          } 
        >
          <Route index element={<Stats/>} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>

        <Route path='/landing' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}