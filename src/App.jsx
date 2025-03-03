import { PlayersProvider } from './context/PlayersContext'
import { TeamsProvider } from './context/TeamsContext'
import PlayerForm from './components/players/PlayerForm'
import TeamForm from './components/teams/TeamForm'
import PlayerList from './components/players/PlayerList'
import TeamList from './components/teams/TeamList'
import ResetButton from './components/common/ResetButton'
import SaveButton from './components/common/SaveButton'
import Settings from './components/settings/Settings'
import './App.css'

function App() {
  return (
    <TeamsProvider>
      <PlayersProvider>
        <div className="container">
          <div className="header-container">
            <h1>Team Creator</h1>
            <div className="header-buttons">
              <SaveButton />
              <ResetButton />
              <Settings />
            </div>
          </div>
          
          <div className="forms-container">
            <PlayerForm />
            <TeamForm />
          </div>

          <div className="content-container">
            <TeamList />
            <PlayerList />
          </div>
        </div>
      </PlayersProvider>
    </TeamsProvider>
  )
}

export default App
