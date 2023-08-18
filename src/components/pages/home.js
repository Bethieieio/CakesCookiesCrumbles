import axios from "axios"
import { useEffect, useState } from "react"
import { Recipe } from "../recipe"
import { Container, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/fontawesome-free-solid"

export const Home = () => {
    const [page, setPage] = useState(1)
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    const getPage = async() => {
        try {   
            setLoading(true)
            const result = await axios.get(`recipes?page=${page}`)
            console.log(result)
            setRecipes(result.data.results)
        }catch(error){

        }
        setLoading(false)
    }
    useEffect(() => {
        getPage()
    }, [])

    return (
        <>
        <Container>
            <Row>
                {recipes.map(recipe => <Recipe recipe={recipe}/>)}
                {loading && <FontAwesomeIcon icon={faSpinner} spinPulse size='5x' />}
            </Row>
        </Container>
        </>
    )
}