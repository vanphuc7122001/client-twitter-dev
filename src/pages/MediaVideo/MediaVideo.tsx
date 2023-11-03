import { useState } from 'react'
import http from 'src/utils/http'

export default function MediaVideo() {
  const [videos, setVideos] = useState<File | null>(null)
  const [name, setName] = useState<string>('')
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const videos = event.target.files as FileList
    console.log(videos[0])
    setVideos(videos[0])
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    const formData = new FormData()

    formData.append('videos', videos as File)
    formData.append('name', name)
    http.post('/medias/uploads/videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  return (
    <div>
      <h1>Media Videos</h1>
      <form>
        <input
          className='border border-red-100'
          placeholder='Nhập tên'
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input accept='video/*' onChange={handleFileChange} type='file' name='' id='' />
        <button onClick={handleClick} style={{ border: '1px solid #ccc', padding: '10px' }}>
          Submit
        </button>
      </form>
    </div>
  )
}
