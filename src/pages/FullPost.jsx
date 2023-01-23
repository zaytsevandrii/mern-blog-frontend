import React from "react"
import ReactMarkdown from 'react-markdown'
import { Post } from "../components/Post"
import { Index } from "../components/AddComment"
import { CommentsBlock } from "../components/CommentsBlock"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import axios from "../axios"

export const FullPost = () => {
    const [data, setData] = useState()
    const { id } = useParams()
    const [isLoading, setIsLOading] = useState(true)
    useEffect(() => {
        axios.get(`/posts/${id}`).then((res) => {
          setData(res.data)
          setIsLOading(false)
        })
    .catch((err) => {
        console.warn(err)
        alert("Mistake with article access")
    })
    }, [])

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost />
    }
    return (
        <>
            <Post
                id={data._id}
                title={data.title}
                imageUrl={data.imageUrl?`http://localhost:4444${data.imageUrl}`:''}
                user={data.user}
                createdAt={data.createdAt}
                viewsCount={data.viewsCount}
                commentsCount={3}
                tags={data.tags}
                isFullPost
            >
                <ReactMarkdown children={data.text} />
            </Post>
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: "Roby Williams",
                            avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                        },
                        text: "This is a test comment",
                    },
                    {
                        user: {
                            fullName: "Ivan Cret",
                            avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                        },
                        text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                    },
                ]}
                isLoading={false}
            >
                <Index />
            </CommentsBlock>
        </>
    )
}
