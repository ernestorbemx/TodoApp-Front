import './App.css'
import { HeroUIProvider } from '@heroui/system'
import { TodoView } from './views/TodoView'

function App() {
  return (
    <HeroUIProvider>
      <TodoView></TodoView>
    </HeroUIProvider>
  )
}

export default App
