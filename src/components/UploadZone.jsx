import { useState, useRef } from 'react'
import { Upload, CloudUpload } from 'lucide-react'

export default function UploadZone({ onUpload }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files.length) onUpload(e.dataTransfer.files)
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
      className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer transition ${
        dragging
          ? 'border-blue-400 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
      }`}
    >
      <div className={`p-4 rounded-full ${dragging ? 'bg-blue-100' : 'bg-gray-100'}`}>
        <CloudUpload size={32} className={dragging ? 'text-blue-500' : 'text-gray-400'} />
      </div>
      <div className="text-center">
        <p className="font-semibold text-gray-700">
          {dragging ? 'Qo\'yib yuboring!' : 'Fayllarni bu yerga tashlang'}
        </p>
        <p className="text-sm text-gray-400 mt-1">yoki <span className="text-blue-500 underline">tanlash uchun bosing</span></p>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => onUpload(e.target.files)}
      />
    </div>
  )
}
