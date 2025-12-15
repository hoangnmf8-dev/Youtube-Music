import Home from "./pages/Home"
import Explore from "./pages/Explore"
import Library from "./pages/Library"

function App() {
  return `
    <main id="main" class="relative  min-h-screen mt-30 lg:ml-[calc(150px+5%)] lg:mr-10 pb-28">
      <div class="p-2">${Home()}</div>
    </main>
  `
}

export default App;