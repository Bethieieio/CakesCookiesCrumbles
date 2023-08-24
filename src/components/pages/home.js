import axios from "axios"
import { useEffect, useState } from "react"
import { Recipe } from "../recipe"
import { Button, Col, Container, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/fontawesome-free-solid"

export const Home = () => {
    const [page, setPage] = useState(1)
    const [showMoreButton, setShowMoreButton] = useState(true)
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    const getPage = async() => {
        try {   
            setLoading(true)
            const result = await axios.get(`recipes?page=${page}`)
            console.log(result)

            if (result.data.results.length != (10)) setShowMoreButton(false)

            setRecipes([
                ...recipes,
                ...result.data.results,
            ])
        }catch(error){

        }
        setLoading(false)
    }
    useEffect(() => {
        getPage()
    }, [])
    useEffect(() => {
        getPage()
    }, [page])


    return (
        <>
        <Container>
            <Row>
                {recipes.map(recipe => <Recipe key={`${recipe.id}-${recipe.title}`} recipe={recipe}/>)}
            </Row>
            <Row>
                <Col sm={{
                    span:3,
                    offset:5,
                }}>
                    {showMoreButton && <Button onClick={() => {
                        setPage(page+1)
                    }}>See More Recipes</Button>}
                </Col>
            </Row>
            <Row>
                {loading && <FontAwesomeIcon icon={faSpinner} spinPulse size='5x' />}
            </Row>
        </Container>
        </>
    )
}