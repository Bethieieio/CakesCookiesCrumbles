import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCurrentUser } from '../context/CurrentUserContext';


export const EditRecipe = () => {
    const navigate = useNavigate()
    const user = useCurrentUser()
    const [errors, setErrors] = useState()
    const [recipe, setRecipe] = useState({
        title: '',
        description: '',
        instructions: '',
        ingredients: '',
    })
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    if (
        user === null
    ) navigate('/login/')

    useEffect(() => {
        const fetchRecipe = async() => {
            let result
            try{
                result = await axios.get(`recipes/${id}`)
            }catch(error){
                if(error.response.status !== 404) throw error
            }

            if (result && result.status === 200){
                setRecipe({
                    title: result.data.title,
                    description: result.data.description,
                    ingredients:  result.data.ingredients,
                    instructions: result.data.instructions,
                })
            }
            setLoading(false)
        }
        fetchRecipe()
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData()
        Object.keys(recipe).forEach(key => data.append(key, recipe[key]))

        try{
            const { data: result } = await axios.put(`/recipes/${id}/`, data, {
                headers: {
                    'Content-Type':  'multipart/form-data',
                },
            })
            navigate('/')
        } catch(err){
            setErrors(err.response?.data)
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                    <Card.Header as="h5">Edit {recipe.title ? recipe.title : 'recipe'}</Card.Header>
                    <Card.Body>
                        {loading ? (<>Loading...</>) : recipe.title ? (
                            <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Title" value={recipe.title} onChange={(event) => {
                                    setRecipe({
                                        ...recipe,
                                        title: event.target.value,
                                    })
                                }}/>
                            </Form.Group>
                            {errors?.title?.map((message, idx) => 
                            <Alert variant="warning" className="mt-3" key={idx}>{message}</Alert>)}
    
    <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" placeholder="Description" value={recipe.description} onChange={(event) => {
                                    setRecipe({
                                        ...recipe,
                                        description: event.target.value,
                                    })
                                }}/>
                            </Form.Group>
                            {errors?.description?.map((message, idx) => 
                            <Alert variant="warning" className="mt-3" key={idx}>{message}</Alert>)}
    
    <Form.Group className="mb-3" controlId="ingredients">
                                <Form.Label>Ingredients</Form.Label>
                                <Form.Control as="textarea" placeholder="Ingredients" value={recipe.ingredients} onChange={(event) => {
                                    setRecipe({
                                        ...recipe,
                                        ingredients: event.target.value,
                                    })
                                }}/>
                            </Form.Group>
                            {errors?.ingredients?.map((message, idx) => 
                            <Alert variant="warning" className="mt-3" key={idx}>{message}</Alert>)}
    
    <Form.Group className="mb-3" controlId="instructions">
                                <Form.Label>Instructions</Form.Label>
                                <Form.Control as="textarea" placeholder="Instructions" value={recipe.instructions} onChange={(event) => {
                                    setRecipe({
                                        ...recipe,
                                        instructions: event.target.value,
                                    })
                                }}/>
                            </Form.Group>
                            {errors?.instructions?.map((message, idx) => 
                            <Alert variant="warning" className="mt-3" key={idx}>{message}</Alert>)}
    
    <Form.Group className="mb-3" controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" placeholder="Image" onChange={(event) => {
                                    setRecipe({
                                        ...recipe,
                                        image: event.target.files[0],
                                    })
                                }}/>
                            </Form.Group>
                            {errors?.image?.map((message, idx) => 
                            <Alert variant="warning" className="mt-3" key={idx}>{message}</Alert>)}
    
                            
                            <Button variant="primary" type="submit">
                                Save!
                            </Button>
                            {errors?.non_field_errors?.map((message, idx) => 
                            <Alert variant="warning" className="mt-3" key={idx}>{message}</Alert>)}
    
                        </Form>
                        ) : <>We lost your recipe!</>}
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
    </Container>
    )
}