import Announcement from './components/blocks/announcement';
import Header from './components/header';
import LeftPanel from './components/left-panel';
import logo from './logo.svg';

function App() {
  return (
    <div className='main'>
      <LeftPanel/>
      <div className='main-panel'>
        <Header/>
        <div className='screen-wrapper'>
          <Announcement/>
        </div>
      </div>
    </div>
  );
}

export default App;
