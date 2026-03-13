import { FileCardGrid, FileCardList } from './FileCard'
import { FolderOpen } from 'lucide-react'

export default function FileGrid({ files, view, onDelete }) {
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-300">
        <FolderOpen size={64} />
        <p className="mt-4 text-lg font-medium">Fayllar yo'q</p>
        <p className="text-sm mt-1">Yuqoriga fayl yuklang</p>
      </div>
    )
  }

  if (view === 'grid') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {files.map((file) => (
          <FileCardGrid key={file.id} file={file} onDelete={onDelete} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="hidden md:flex items-center gap-4 px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        <div className="w-10 flex-shrink-0" />
        <div className="flex-1">Nomi</div>
        <div className="w-20 text-right">Hajm</div>
        <div className="w-28 text-right">Sana</div>
        <div className="w-16" />
      </div>
      {files.map((file) => (
        <FileCardList key={file.id} file={file} onDelete={onDelete} />
      ))}
    </div>
  )
}
