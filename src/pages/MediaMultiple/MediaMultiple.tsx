import { useState } from 'react'
import http from 'src/utils/http'
type FileInForm = Record<number, File>

export default function MediaMultiple() {
  const [files, setFile] = useState<FileInForm | null>(null)
  const [name, setName] = useState<string>('')
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesArr = event.target.files as FileList
    setFile(filesArr)
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    const formData = new FormData()
    for (const key in files as FileInForm) {
      formData.append('fileName', (files as FileInForm)[key])
    }

    formData.append('name', name)
    http.post('/medias/uploads/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  return (
    <div>
      <h1>Media</h1>
      <form>
        <input
          className='border border-red-100'
          placeholder='Nhập tên'
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input multiple onChange={handleFileChange} type='file' name='' id='' />
        <button onClick={handleClick} style={{ border: '1px solid #ccc', padding: '10px' }}>
          Submit
        </button>
      </form>
    </div>
  )
}
