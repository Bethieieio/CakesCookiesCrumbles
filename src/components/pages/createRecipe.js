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
        categories: [],
    })

    if (
        user === null
    ) navigate('/login/')


    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData()
        Object.keys(recipe).filter(key => key !== 'categories').forEach(key => data.append(key, recipe[key]))

        data.append('categories', JSON.stringify(recipe['categories']))     

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
                    <Card className='card-css'>
                    <Card.Header className='headings d-flex justify-content-center' as="h5">Create a Recipe</Card.Header>
                    <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label className='subheading-title'>Title</Form.Label>
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
                            <Form.Label className='subheading-title'>Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Description" value={recipe.description} onChange={(event) => {
                                setRecipe({
                                    ...recipe,
                                    description: event.target.value,
                                })
                            }}/>
                        </Form.Group>
                        {errors?.description?.map((message, idx) => 
                        <Alert variant="warning" className="mt-3" key={idx}>{message}</Alert>)}

<Form.Group className='mb-3' controlId='categories'>
                                    <Form.Label className='subheading-title'>
                                        Categories
                                    </Form.Label>
                                    <Form.Select multiple onChange={(event) => {
                                    setRecipe({
                                        ...recipe,
                                        categories: [...event.target.options].filter(option => option.selected).map(option => ({ name: option.value })),
                                    })
                                }}>
                                        <option selected={recipe.categories.map(cat => cat.name).includes('Cakes')} value='Cakes'>Cakes</option>
                                        <option selected={recipe.categories.map(cat => cat.name).includes('Cookies')} value='Cookies'>Cookies</option>
                                        <option selected={recipe.categories.map(cat => cat.name).includes('Crumbles')} value='Crumbles'>Crumbles</option>
                                    </Form.Select>
                                </Form.Group>
                                {errors?.categories?.map((message, idx) => 
                            <Alert variant="warning" className="mt-3" key={idx}>{message}</Alert>)}

<Form.Group className="mb-3" controlId="ingredients">
                            <Form.Label className='subheading-title'>Ingredients</Form.Label>
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
                            <Form.Label className='subheading-title'>Instructions</Form.Label>
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
                            <Form.Label className='subheading-title'>Image</Form.Label>
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