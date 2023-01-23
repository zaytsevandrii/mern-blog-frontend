import React, { useEffect, useState } from "react"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import SimpleMDE from "react-simplemde-editor"
import axios from "../../axios"
import "easymde/dist/easymde.min.css"
import styles from "./AddPost.module.scss"
import { useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const AddPost = () => {
    const {id} = useParams()
  const navigate = useNavigate()
    const [imageUrl, setImageUrl] = useState("")
    const [value, setValue] = React.useState("")
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState("")
    const [isLoading, setLoading] = useState(false)

    const inputRef = useRef()
    const isEditing=Boolean(id)

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append("image", file)
            const { data } = await axios.post("/uploads", formData)
            setImageUrl(data.url)
        } catch (err) {
            console.warn(err)
            alert("Error uploading")
        }
    }

    const onClickRemoveImage = () => {
        setImageUrl("")
    }

    const onChange = React.useCallback((value) => {
        setValue(value)
    }, [])

    const onSubmit = async () => {
        try {
            setLoading(true)
            const fields = {
                title,
                imageUrl,
                tags,
                text:value
            }
            const { data } = isEditing
            ? await axios.patch(`posts/${id}`,fields)
            : await axios.post("/posts", fields)

            const _id = isEditing?id:data._id
            navigate(`/posts/${_id}`)

        } catch (err) {
          console.warn(err)
          alert('Mistake with create article')
        }
    }

    useEffect(()=>{
        if(id){
            axios.get(`/posts/${id}`).then(({data})=>{
                setTitle(data.title)
                setValue(data.text)
                setImageUrl(data.imageUrl)
                setTags(data.tags.join(','))
            }).catch(err=>{
                console.warn(err)
                alert('Mistake with get article')
            })
        }
    },[])


    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: "400px",
            autofocus: true,
            placeholder: "Enter text..",
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        []
    )
    return (
        <Paper style={{ padding: 30 }}>
            <Button onClick={() => inputRef.current.click()} variant="outlined" size="large">
                Upload Image
            </Button>
            <input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
            {imageUrl && (
                <>
                    <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                        Удалить
                    </Button>
                    <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
                </>
            )}

            <br />
            <br />
            <TextField
                classes={{ root: styles.title }}
                variant="standard"
                placeholder="title.."
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                classes={{ root: styles.tags }}
                variant="standard"
                placeholder="Tags"
                fullWidth
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
            <div className={styles.buttons}>
                <Button onClick={onSubmit} size="large" variant="contained">
                    {isEditing? 'Save':'Public'} 
                </Button>
                <a href="/">
                    <Button size="large">Cancel</Button>
                </a>
            </div>
        </Paper>
    )
}
