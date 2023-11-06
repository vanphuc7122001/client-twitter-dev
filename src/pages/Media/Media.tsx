import { useState } from 'react'
import { Link } from 'react-router-dom'
import http from 'src/utils/http'

export default function Media() {
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState<string>('')
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files as FileList
    setFile(file[0])
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('fileName', file as File)
    formData.append('name', name)
    http.post('/medias/uploads/image', formData, {
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
        <input onChange={handleFileChange} type='file' name='' id='' />
        <button onClick={handleClick} style={{ border: '1px solid #ccc', padding: '10px' }}>
          Submit
        </button>
      </form>

      <Link
        to='/home'
        className='m-4 inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none '
      >
        Home
      </Link>
    </div>
  )
}
