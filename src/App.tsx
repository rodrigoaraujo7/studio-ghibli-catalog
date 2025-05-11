import { Catalog } from "./components/Catalog"

function App() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
            Studio Ghibli Collection
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the magical world of Studio Ghibli films. Mark your favorites and keep track of what you've watched.
          </p>
        </header>
      </div>

      <Catalog />
    </main>
  )
}

export default App
