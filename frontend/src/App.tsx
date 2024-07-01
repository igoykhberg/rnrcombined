import { WithAppData } from './context/app.context';
import { WithFetchData } from './context/fetch.context';
import { WithLayout } from './components/WithLayout';
import Main from './components/Main';
function App() {
  return (
    <WithAppData>
      <WithFetchData>
        <WithLayout>
          <Main />
        </WithLayout>
      </WithFetchData>
    </WithAppData>
  );
}

export default App;
