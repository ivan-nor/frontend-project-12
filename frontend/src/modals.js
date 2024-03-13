import Add from './components/modals/Add.jsx'
import Remove from './components/modals/Remove.jsx'
import Rename from './components/modals/Rename.jsx'

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename
}

export default (modalName) => modals[modalName]
