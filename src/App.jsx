import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import UploadZone from './components/UploadZone'
import FileGrid from './components/FileGrid'

function App() {
  const [files, setFiles] = useState(() => {
    const saved = localStorage.getItem('mini_cloud_files')
    return saved ? JSON.parse(saved) : []
  })
  const [view, setView] = useState('grid')
  const [search, setSearch] = useState('')
  const [activeFolder, setActiveFolder] = useState('All Files')

  useEffect(() => {
    localStorage.setItem('mini_cloud_files', JSON.stringify(files))
  }, [files])

  const handleUpload = (newFiles) => {
    const fileObjects = Array.from(newFiles).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      url: URL.createObjectURL(file),
      folder: activeFolder === 'All Files' ? 'My Files' : activeFolder,
      uploadedAt: new Date().toISOString(),
    }))
    setFiles((prev) => [...prev, ...fileObjects])
  }

  const handleDelete = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const folders = ['All Files', 'My Files', 'Images', 'Documents', 'Videos']

  const filteredFiles = files.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase())
    const matchFolder =
      activeFolder === 'All Files' || f.folder === activeFolder
    return matchSearch && matchFolder
  })

  const stats = {
    total: files.length,
    size: files.reduce((acc, f) => acc + f.size, 0),
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar
        folders={folders}
        activeFolder={activeFolder}
        setActiveFolder={setActiveFolder}
        stats={stats}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar
          search={search}
          setSearch={setSearch}
          view={view}
          setView={setView}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <UploadZone onUpload={handleUpload} />
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                {activeFolder}{' '}
                <span className="text-sm font-normal text-gray-400">
                  ({filteredFiles.length} ta fayl)
                </span>
              </h2>
            </div>
            <FileGrid
              files={filteredFiles}
              view={view}
              onDelete={handleDelete}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
