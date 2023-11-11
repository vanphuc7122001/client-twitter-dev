import { useEffect, useState } from 'react'
import { getUserIdFromAccessToken } from 'src/utils/common'
import http from 'src/utils/http'
import socket from 'src/utils/socket'

interface ObjectType {
  _id: string
  name: string
  email: string
}

interface MessageType {
  content: string
  sender_id: string
  receiver_id: string
}

export default function Chat() {
  const [friends, setFriends] = useState<any>([])
  const [conversations, setConversations] = useState<MessageType[]>([])

  const [value, setValue] = useState<string>('')
  const [object, setObject] = useState<ObjectType>({ _id: '', name: '', email: '' })
  const user_id = getUserIdFromAccessToken(localStorage.getItem('access_token') as string)

  useEffect(() => {
    http
      .get<
        any,
        {
          message: string
          result: any
        }
      >('friends/')
      .then((data) => {
        setFriends(data.result)
      })
      .catch((err) => {
        console.log(err)
      })

    socket.on('connect', () => {
      console.log(socket.id)
    })
    socket.on('disconnect', (reason) => {
      console.log(reason) // undefined
    })

    socket.on('connect_error', (err) => {
      console.log(err.message) // prints the message associated with the error
    })

    socket.on('receive_message', async (data) => {
      const { payload } = data
      setConversations((prevConversations) => {
        const newConversations = [...prevConversations, { ...payload }]
        return newConversations
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleClick = (object: ObjectType) => {
    setObject(object)
    http
      .post<any, { message: string; result: MessageType[] }>('/conversations', { receiver_id: object._id })
      .then((res) => {
        setConversations([...res.result])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSendMessage = () => {
    const payload = {
      content: value,
      to: object._id
    }
    setConversations((prev) => [...prev, { content: value, receiver_id: object._id, sender_id: user_id }])
    socket.emit('send_message', payload)
    setValue('')
  }

  return (
    <div className='min-h-[500px] text-center grid grid-lg-cols-1  grid-cols-[350px_minmax(900px,_1fr)] m-8 gap-4'>
      <div className='border border-blue-400 rounded h-full p-4'>
        <h1 className='text-[24px]'>Danh sách bạn</h1>
        <ul className='mt-4'>
          {friends.map((friend: any) => {
            return <Name handleClick={handleClick} key={friend.friends._id} object={friend.friends} />
          })}
        </ul>
      </div>
      <div className='border border-blue-400 rounded h-full p-4 relative'>
        <h1 className='text-[24px]'>Tin nhắn</h1>
        <div className='text-left ml-4 border border-blue-400 bg-white p-2 rounded w-[93%]'>{object.email}</div>
        <div className='absolute right-0 left-0 bottom-0 text-gray-600 mb-2'>
          <div className='w-full min-h-[10px] max-h-[350px] overflow-x-scroll'>
            {conversations.map((conversation, index) => {
              return (
                <div
                  key={index}
                  className={
                    conversation.sender_id === object._id
                      ? ' transform translate-x-[29px]'
                      : ' transform translate-x-[729px]'
                  }
                >
                  <p
                    className={`text-left mt-1 min-w-[50px] max-w-[300px] min-h-[50px] bg-blue-400 text-white font-medium rounded border p-2 break-words `}
                  >
                    {conversation.content}
                  </p>
                </div>
              )
            })}
          </div>
          <input
            onChange={(event) => setValue(event.target.value)}
            type='text'
            value={value}
            className='outline-none p-2 border rounded border-blue-400  w-[90%] text-left'
          />
          {object._id && (
            <button onClick={handleSendMessage} type='submit' className='border border-blue-400 p-2 rounded ml-2'>
              Gửi
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const Name = (props: {
  object: {
    _id: string
    name: string
    email: string
  }
  handleClick: (object: ObjectType) => void
}) => {
  const { object: ObjectFromParent, handleClick } = props
  const [isActive, setIsActive] = useState<boolean>(false)
  const handleActive = (object: ObjectType) => {
    handleClick(object)
    setIsActive(!isActive)
  }
  return (
    <>
      <li
        onClick={() => handleActive(ObjectFromParent)}
        style={isActive ? { color: 'white', background: 'blue' } : {}}
        className='cursor-pointer border border-blue-400 rounded p-1 mt-2'
      >
        {ObjectFromParent.email}
      </li>
    </>
  )
}
