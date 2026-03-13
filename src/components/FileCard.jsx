import { Download, Trash2, FileText, Image, Video, Music, Archive, File } from 'lucide-react'

function getFileIcon(type) {
  if (type.startsWith('image/')) return { Icon: Image, color: 'text-green-500', bg: 'bg-green-50' }
  if (type.startsWith('video/')) return { Icon: Video, color: 'text-purple-500', bg: 'bg-purple-50' }
  if (type.startsWith('audio/')) return { Icon: Music, color: 'text-pink-500', bg: 'bg-pink-50' }
  if (type.includes('pdf') || type.includes('document') || type.includes('text'))
    return { Icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' }
  if (type.includes('zip') || type.includes('rar') || type.includes('archive'))
    return { Icon: Archive, color: 'text-yellow-500', bg: 'bg-yellow-50' }
  return { Icon: File, color: 'text-gray-500', bg: 'bg-gray-50' }
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('uz-UZ', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

export function FileCardGrid({ file, onDelete }) {
  const { Icon, color, bg } = getFileIcon(file.type)

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition group">
      <div className={`w-12 h-12 rounded-lg ${bg} flex items-center justify-center mb-3`}>
        {file.type.startsWith('image/') ? (
          <img src={file.url} alt={file.name} className="w-12 h-12 object-cover rounded-lg" />
        ) : (
          <Icon size={24} className={color} />
        )}
      </div>
      <p className="text-sm font-medium text-gray-800 truncate" title={file.name}>
        {file.name}
      </p>
      <p className="text-xs text-gray-400 mt-1">{formatSize(file.size)}</p>
      <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition">
        <a
          href={file.url}
          download={file.name}
          className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition"
        >
          <Download size={12} /> Yuklab olish
        </a>
        <button
          onClick={() => onDelete(file.id)}
          className="p-1.5 bg-red-50 text-red-400 rounded-lg hover:bg-red-100 transition"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}

export function FileCardList({ file, onDelete }) {
  const { Icon, color, bg } = getFileIcon(file.type)

  return (
    <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-4 hover:shadow-sm transition group">
      <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
        {file.type.startsWith('image/') ? (
          <img src={file.url} alt={file.name} className="w-10 h-10 object-cover rounded-lg" />
        ) : (
          <Icon size={20} className={color} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
        <p className="text-xs text-gray-400">{file.folder}</p>
      </div>
      <p className="text-xs text-gray-400 w-20 text-right hidden sm:block">{formatSize(file.size)}</p>
      <p className="text-xs text-gray-400 w-28 text-right hidden md:block">{formatDate(file.uploadedAt)}</p>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <a
          href={file.url}
          download={file.name}
          className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 transition"
        >
          <Download size={14} />
        </a>
        <button
          onClick={() => onDelete(file.id)}
          className="p-2 bg-red-50 text-red-400 rounded-lg hover:bg-red-100 transition"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}
