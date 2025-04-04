import './App.css'
import { HeroUIProvider } from '@heroui/system'
import { TodoView } from './views/TodoView'
import {ToastProvider} from "@heroui/toast";
function App() {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <TodoView></TodoView>
    </HeroUIProvider>
  )
}

export default App
