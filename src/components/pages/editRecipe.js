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
import { Modal } from 'react-bootstrap';


export const EditRecipe = () => {
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
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    const [openModal, setOpenModal] = useState(false)

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
                    categories: result.data.categories,
                })
            }
            setLoading(false)
        }
        fetchRecipe()
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData()
        Object.keys(recipe).filter(key => key !== 'categories').forEach(key => data.append(key, recipe[key]))

        data.append('categories', JSON.stringify(recipe['categories']))

        try{
            const { data: result } = await axios.put(`/recipes/${id}/`, data, {
                headers: {
                    'Content-Type':  'multipart/form-data',
                },
            })
            navigate('/')
        } catch(err){
            // setErrors(err.response?.data)
        }
    }
    const deleteRecipe = async() => {
        await axios.delete(`/recipes/${id}/`)
        navigate('/')

    }

    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className='card-css'>
                    <Card.Header>Edit {recipe.title ? <>
                        <h5> {recipe.title} </h5>
                        <button onClick={() => {
                            setOpenModal(true)
                        }} aria-label='Delete recipe'>Delete Recipe</button>
                    </>: 'recipe'}</Card.Header>
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

                                <Form.Group className='mb-3' controlId='categories'>
                                    <Form.Label>
                                        Categories
                                    </Form.Label>
                                    <Form.Select multiple
                                    selected={recipe.categories.map(cat => cat.name)}
                                    defaultValue={recipe.categories.map(cat => cat.name)}
                                    onChange={(event) => {
                                        setRecipe({
                                            ...recipe,
                                            categories: [...event.target.options].filter(option => option.selected).map(option => ({ name: option.value })),
                                        })
                                    }}>
                                        <option value='Cakes'>Cakes</option>
                                        <option value='Cookies'>Cookies</option>
                                        <option value='Crumbles'>Crumbles</option>
                                    </Form.Select>
                                </Form.Group>
                                {errors?.categories?.map((message, idx) => 
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
    
                            
                            <Button variant="primary" type="submit" aria-label='Save changed recipe'>
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
            <Modal show={openModal} onHide={() => {
                setOpenModal(false)
            }}>
                <Modal.Body>
                    Are you sure you want to delete this recipe?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        deleteRecipe()
                    }} aria-label='Yes, delete recipe'>Yes</Button>
                    <Button onClick={() => {
                        setOpenModal(false)
                    }}aria-label='No, do not delete recipe'>No</Button>
                </Modal.Footer>
            </Modal>
    </Container>
    )
}