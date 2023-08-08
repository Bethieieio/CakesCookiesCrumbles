import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../context/CurrentUserContext';


export const CreateRecipe = () => {
    const navigate = useNavigate()
    const user = useCurrentUser()
    const [errors, setErrors] = useState()
    const [recipe, setRecipe] = useState({
        title: '',
        description: '',
        instructions: '',
        ingredients: '',
    })

    if (
        user === null
    ) navigate('/login/')


    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData()
        Object.keys(recipe).forEach(key => data.append(key, recipe[key]))

        try{
            const { data: result } = await axios.post('/recipes/', data, {
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
                    <Card.Header as="h5">Create a Recipe</Card.Header>
                    <Card.Body>
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
                            Create!
                        </Button>
                        {errors?.non_field_errors?.map((message, idx) => 
                        <Alert variant="warning" className="mt-3" key={idx}>{message}</Alert>)}

                    </Form>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
    </Container>
    )
}