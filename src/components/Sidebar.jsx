import { Folder, HardDrive, Image, FileText, Video, Files } from 'lucide-react'

const folderIcons = {
  'All Files': Files,
  'My Files': Folder,
  Images: Image,
  Documents: FileText,
  Videos: Video,
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export default function Sidebar({ folders, activeFolder, setActiveFolder, stats }) {
  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col py-6 px-4">
      <nav className="flex-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
          Papkalar
        </p>
        <ul className="space-y-1">
          {folders.map((folder) => {
            const Icon = folderIcons[folder] || Folder
            return (
              <li key={folder}>
                <button
                  onClick={() => setActiveFolder(folder)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    activeFolder === folder
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  {folder}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2 px-2 mb-2">
          <HardDrive size={16} className="text-gray-400" />
          <span className="text-xs font-medium text-gray-500">Saqlash</span>
        </div>
        <div className="px-2">
          <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min((stats.size / (100 * 1024 * 1024)) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-400">
            {formatSize(stats.size)} / 100 MB
          </p>
          <p className="text-xs text-gray-400 mt-1">{stats.total} ta fayl</p>
        </div>
      </div>
    </aside>
  )
}
