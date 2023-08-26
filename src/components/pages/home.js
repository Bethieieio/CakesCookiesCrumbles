import axios from "axios"
import { useEffect, useState } from "react"
import { Recipe } from "../recipe"
import { Button, Col, Container, Form, FormLabel, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/fontawesome-free-solid"
import qs from 'qs'

export const Home = () => {
    const [page, setPage] = useState(1)
    const [showMoreButton, setShowMoreButton] = useState(true)
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({categories : []})

    const getPage = async (reset = false) => {              
        if (reset) setRecipes([])
        try {   
            setLoading(true)
            const result = await axios.get(`recipes?page=${page}`, {
                params : {
                    categories : filters.categories,
                },
                paramsSerializer: params => {
                    return qs.stringify(params, {
                        arrayFormat: 'repeat',
                    })
                },
            })

            if (result.data.results.length != 10) setShowMoreButton(false)
            else if (!showMoreButton) setShowMoreButton(true)

            console.log('results', result.data.results, recipes)

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
            <Row>
                <Col>
                    {['Cakes','Cookies', 'Crumbles'].map(category=>
                    <FormLabel key={category}>
                        <Form.Check type='checkbox' value={category} onChange={(event) => {
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
                </Col>
                <Row>
                    <Col>
                            <Button onClick={async () => {
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