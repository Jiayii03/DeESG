'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function ForumPage({}) {
  
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "This company is exploitative, treating employees poorly every day.",
      upvotes: 8,
      downvotes: 2,
      time: "4m ago",
      txId: "6af3de"
    },
    {
      id: 2,
      text: "This company is WAGMIIII",
      upvotes: 198,
      downvotes: 4,
      time: "8m ago",
      txId: "eef3ae"
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const company = params?.company

  const handleCommentChange = (e) => {
    setNewComment(e.target.value)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      setIsLoading(true)
      setTimeout(() => {
        const newCommentObj = {
          id: comments.length + 1,
          text: newComment,
          upvotes: 0,
          downvotes: 0,
          time: "Just now",
          txId: Math.random().toString(36).substr(2, 6),
          isNew: true
        }
        setComments([newCommentObj, ...comments])
        setNewComment('')
        setIsLoading(false)
      }, 1000)
    }
  }

  const handleUpvote = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, upvotes: comment.upvotes + 1 } 
        : comment
    ))
  }

  const handleDownvote = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, downvotes: comment.downvotes + 1 } 
        : comment
    ))
  }

  return (
    <>
      <main className="flex flex-column lg:flex-row gap-4 py-5 mx-12">
        <div className='flex flex-col w-full'>
          {/* Comment Box */}
          <form className="flex flex-col w-full bg-white p-4 rounded-lg shadow-md mb-8" onSubmit={handleCommentSubmit}>
            <div className="flex items-center gap-4 mx-4">
              <div className="relative flex justify-center items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 via-pink-300 to-blue-300 p-[2px]">
                  <img
                    src="/greenesis_logo.png"
                    alt="Profile"
                    className="w-full h-full rounded-full bg-black p-1"
                  />
                </div>
              </div>

              <div className="w-full">
                <textarea
                  value={newComment}
                  onChange={handleCommentChange}
                  rows={1}
                  placeholder={`Tell us about ${company}...`}
                  className="w-full p-4 text-xl text-black bg-white resize-none focus:outline-none border-b-2 border-gray-400 border-t-0 border-l-0 border-r-0"
                />
              </div>
            </div>

            <div className="flex justify-end mt-2 mx-4">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-lg hover:bg-[#55b2b5] focus:outline-none w-24 flex justify-center items-center"
                style={{ backgroundColor: '#65c3c8', color: 'black' }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <img src="/loading.gif" alt="Loading" className="w-4 h-4" />
                ) : (
                  "Comment"
                )}
              </button>
            </div>
          </form>

          <div className='flex flex-col lg:flex-row justify-between'>
            {/* Sidebar Container */}
            <div className="w-96 bg-white rounded-lg p-6 flex flex-col items-start gap-4 shadow-lg sticky top-20 self-start">
              <div className="flex flex-row items-center gap-4">
                <img src={`/${company.toLowerCase()}_logo.png`} alt={company} className="w-16 rounded-lg"/>
                <p className="text-2xl font-semibold text-black">{company}</p>
              </div>

              <div className="w-full">
                <p className="text-gray-600 font-medium mb-1">Sustainability (S):</p>
                <p className="text-sm text-gray-600">
                  {company} is committed to achieving net-zero carbon by 2040.
                </p>

                <p className="text-gray-600 font-medium mt-4 mb-1">Governance (G):</p>
                <p className="text-sm text-gray-600">
                  {company} adheres to strict corporate governance standards, ensuring transparency and accountability.
                </p>

                <div className="mt-6">
                  <p className="text-gray-600 font-medium">Total Upvotes Percentage:</p>
                </div>

                <p className="text-lg font-light text-gray-800 mt-4">{comments.length} comments</p>
              </div>
            </div>

            {/* Comments Container */}
            <div className="flex flex-col gap-6 w-full ml-8">
              {comments.map((comment) => {
                const totalVotes = comment.upvotes + comment.downvotes
                const upvotePercentage = totalVotes > 0 ? (comment.upvotes / totalVotes) * 100 : 50
                const downvotePercentage = totalVotes > 0 ? (comment.downvotes / totalVotes) * 100 : 50
                const netVotes = comment.upvotes - comment.downvotes

                return (
                  <div 
                    key={comment.id} 
                    className={`bg-white rounded-lg pt-4 transition-transform duration-500 ${comment.isNew ? 'slide-in' : ''}`}
                  >
                    <div className="flex flex-row gap-2 items-center justify-between pl-8 pr-12">
                      <div className="flex flex-row gap-4 items-center w-full">
                        <p 
                          className={`font-xl font-bold min-w-12 ${
                            netVotes >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {netVotes >= 0 ? `+${netVotes}` : netVotes}
                        </p>
                        <div className="flex flex-col gap-4">
                          <svg 
                            onClick={() => handleUpvote(comment.id)}
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="size-8 cursor-pointer hover:brightness-110 text-green-600"
                          >
                            <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
                          </svg>
                          <svg 
                            onClick={() => handleDownvote(comment.id)}
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="size-8 cursor-pointer hover:brightness-110 text-red-600"
                          >
                            <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="py-4 flex-col flex gap-2 w-full">
                          <p className='text-gray-600'>{comment.text}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className='text-sm text-gray-500'>{comment.time}</p>
                        <p className='text-sm text-gray-500 underline cursor-pointer'>tx:{comment.txId}</p>
                      </div>
                    </div>
                    <div className="relative h-2 rounded-b-lg w-full mt-4 bg-gray-200">
                      <div 
                        className="absolute top-0 left-0 h-full bg-green-600 rounded-bl-lg tooltip-container" 
                        style={{ width: `${upvotePercentage}%` }}
                        data-tooltip={`Upvotes: ${comment.upvotes}`}
                      />
                      <div 
                        className="absolute top-0 left-0 h-full bg-red-600 rounded-br-lg tooltip-container" 
                        style={{ width: `${downvotePercentage}%`, marginLeft: `${upvotePercentage}%`, transform: 'translateY(-8px)' }}
                        data-tooltip={`Downvotes: ${comment.downvotes}`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .slide-in {
          transform: translateX(100%);
          animation: slideIn 0.5s forwards;
        }
        @keyframes slideIn {
          to {
            transform: translateX(0);
          }
        }
        .tooltip-container {
          position: relative;
        }
        .tooltip-container:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
        }
        .tooltip-container.bg-green-600:hover::after {
          background-color: #16a34a;
          color: white;
        }
        .tooltip-container.bg-red-600:hover::after {
          background-color: #dc2626;
          color: white;
        }
      `}</style>
    </>
  )
}