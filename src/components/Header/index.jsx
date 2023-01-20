import React from "react"
import Button from "@mui/material/Button"

import styles from "./Header.module.scss"
import Container from "@mui/material/Container"
import { Link } from "react-router-dom"
import { logout, selectIsAuth } from "../../redux/slices/auth"
import { useDispatch, useSelector } from "react-redux"

export const Header = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const onClickLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            dispatch(logout())
            window.localStorage.removeItem('token')
        }
    }

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link to="/">
                        <div>ARCHAKOV BLOG</div>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <Link to="/posts/create">
                                    <Button variant="contained">Написать статью</Button>
                                </Link>
                                <Button onClick={onClickLogout} variant="contained" color="error">
                                    Log Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outlined">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="contained">Create account</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    )
}
