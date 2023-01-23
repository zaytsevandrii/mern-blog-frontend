import React, { useEffect } from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Grid from "@mui/material/Grid"

import { Post } from "../components/Post"
import { TagsBlock } from "../components/TagsBlock"
import { CommentsBlock } from "../components/CommentsBlock"

import { get } from "react-hook-form"
import axios from "../axios"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts, fetchTags } from "../redux/slices/post"
import { selectIsAuth } from "../redux/slices/auth"

export const Home = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const {posts,tags}=useSelector(state=>state.posts)
    const isPostLoading=posts.stats==='loading'
    const isTagsLoading=tags.stats==='loading'
    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchTags())
    }, [])
    return (
        <>
            <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
                <Tab label="Новые" />
                <Tab label="Популярные" />
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(isPostLoading?[...Array(5)]:posts.items).map((obj, i) => (
                       isPostLoading?(
                        <Post key={i} isLoading={true} />
                       ):(
                        <Post
                        key={i}
                        id={obj._id}
                        title={obj.title}
                        imageUrl={obj.imageUrl?`http://localhost:4444${obj.imageUrl}`:''}
                        user={obj.user}
                        createdAt={obj.createdAt}
                        viewsCount={obj.viewsCount}
                        commentsCount={3}
                        tags={obj.tags?obj.tags:["react", "fun", "typescript"]}
                        isEditable={isAuth}
                    />
                       )
                    ))}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={tags.items} isLoading={isTagsLoading} />
                    <CommentsBlock
                        items={[
                            {
                                user: {
                                    fullName: "Viktor Perss",
                                    avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                                },
                                text: "Test comment",
                            },
                            {
                                user: {
                                    fullName: "Ivan Branch",
                                    avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                                },
                                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                            },
                        ]}
                        isLoading={false}
                    />
                </Grid>
            </Grid>
        </>
    )
}
