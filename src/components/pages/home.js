import axios from "axios"
import { useEffect, useState } from "react"
import { Recipe } from "../recipe"
import { Button, Col, Container, Form, FormLabel, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/fontawesome-free-solid"
import qs from 'qs'
import { useCurrentUser } from "../context/CurrentUserContext"

export const Home = () => {
    const [page, setPage] = useState(1)
    const [showMoreButton, setShowMoreButton] = useState(true)
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({categories : [], isOwner: false, isFavourited: false })
    const currentUser = useCurrentUser()

    const getPage = async (reset = false) => {              
        if (reset) setRecipes([])
        try {   
            setLoading(true)
            const result = await axios.get(`recipes`, {
                params : {
                    categories : filters.categories,
                    isOwner: filters.isOwner,
                    isFavourited: filters.isFavourited,
                    page,
                },
                paramsSerializer: params => {
                    return qs.stringify(params, {
                        arrayFormat: 'repeat',
                    })
                },
            })

            if (result.data.results.length != 10) setShowMoreButton(false)
            else if (!showMoreButton) setShowMoreButton(true)

            if (reset) setRecipes(result.data.results)
            else setRecipes([
                    ...recipes,
                    ...result.data.results,
                ])
        }catch(error){

        }
        setLoading(false)
    }
    useEffect(() => {
        if (recipes.length === 0) getPage()
    }, [])
    useEffect(() => {
        getPage()
    }, [page])


    return (
        <>
        <Container>
            <Row className="filter-bar">
                <Col className="d-flex justify-content-center">
                    {['Cakes','Cookies', 'Crumbles'].map(category=>
                    <FormLabel key={category} className="filter-checkbox-label">
                        <Form.Check className="filter-checkbox" type='checkbox' value={category} onChange={(event) => {
                            if(filters.categories.includes(event.target.value)){
                                setFilters({
                                    categories : filters.categories.filter(cat=>cat!==event.target.value)
                                })
                            }else{
                                setFilters({
                                    categories : [
                                        ...filters.categories,
                                        event.target.value,
                                    ]
                                })
                            }
                        }}/>{category}
                    </FormLabel>)}
                    {
                        currentUser && (
                            <>
                                <FormLabel className="filter-checkbox-label">
                        <Form.Check className="filter-checkbox" type='checkbox' value={true} onChange={() => {
                            setFilters({
                                ...filters,
                                isOwner: !filters.isOwner,
                            })
                        }}/> Your Recipes
                    </FormLabel>
                    <FormLabel className="filter-checkbox-label">
                        <Form.Check className="filter-checkbox" type='checkbox' value={true} onChange={() => {
                            setFilters({
                                ...filters,
                                isFavourited: !filters.isFavourited,
                            })
                        }}/> Your Favourites
                    </FormLabel>
                            </>
                        )}
                </Col>
                <Row>
                    <Col className="d-flex justify-content-center">
                            <Button onClick={async () => {
                                setPage(1)
                                await getPage(true)
                            }}> 
                                Update
                            </Button>
                    </Col>
                </Row>
            </Row>
            <Row>
                {recipes.map(recipe => <Recipe key={`${recipe.id}-${recipe.title}`} recipe={recipe}/>)}
            </Row>
            <Row>
                {loading && <FontAwesomeIcon icon={faSpinner} spinPulse size='5x' />}
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
        </Container>
        </>
    )
}