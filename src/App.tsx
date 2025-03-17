import CoffeeProductDisplay from "./components/custom/CoffeeProductDisplay";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="text-white shadow-md bg-primary">
        <div className="flex flex-col items-center justify-center px-4 py-6 mx-auto">
          <h1 className="mx-auto text-3xl font-bold">
            Premium Coffee Selection
          </h1>
        </div>
      </header>

      <main className="container mx-auto">
        <CoffeeProductDisplay />
      </main>

      <footer className="mt-12 bg-gray-100 border-t">
        <div className="container px-4 py-6 mx-auto text-center text-gray-500">
          &copy; {new Date().getFullYear()} Coffee Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
