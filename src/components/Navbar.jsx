import { Search, Grid, List, Cloud } from 'lucide-react'

export default function Navbar({ search, setSearch, view, setView }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
      <div className="flex items-center gap-2 mr-4">
        <Cloud className="text-blue-500" size={24} />
        <span className="text-xl font-bold text-gray-800">MiniCloud</span>
      </div>

      <div className="flex-1 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Fayl qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition"
        />
      </div>

      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 ml-auto">
        <button
          onClick={() => setView('grid')}
          className={`p-2 rounded-md transition ${view === 'grid' ? 'bg-white shadow text-blue-500' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Grid size={16} />
        </button>
        <button
          onClick={() => setView('list')}
          className={`p-2 rounded-md transition ${view === 'list' ? 'bg-white shadow text-blue-500' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <List size={16} />
        </button>
      </div>
    </header>
  )
}
