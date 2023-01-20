import React from "react"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import { useForm } from "react-hook-form"
import styles from "./Login.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth"
import { Navigate } from "react-router-dom"

export const Login = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values))
        if(!data.payload){
            alert('Failed to login')
        }
        if ("token" in data.payload) {
            window.localStorage.setItem("token", data.payload.token)
        }
    }

    if (isAuth) return <Navigate to="/" />
    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    type="email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    fullWidth
                    {...register("email", { required: "Enter your email" })}
                />
                <TextField
                    className={styles.field}
                    type="password"
                    label="Password"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register("password", { required: "Enter your password" })}
                    fullWidth
                />
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Enter
                </Button>
            </form>
        </Paper>
    )
}
