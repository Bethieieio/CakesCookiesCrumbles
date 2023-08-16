import axios from "axios"
import { useEffect, useState } from "react"

export const Home = () => {
    const [page, setPage] = useState(1)
    const [recipes, setRecipes] = useState([])
    const getPage = async() => {
        try {   
            const result = await axios.get(`recipes?page=${page}`)
            console.log(result)
        }catch(error){

        }
    }
    useEffect(() => {
        getPage()
    }, [])

    return (
        <h1>My new home page</h1>
    )
}