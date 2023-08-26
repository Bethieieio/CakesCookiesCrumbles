import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './singleRecipe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarO } from '@fortawesome/free-regular-svg-icons';
import { FavouriteToggle } from '../favouriteToggle';
import { RatingModal } from '../ratingModal';
import { useCurrentUser } from '../context/CurrentUserContext';
import { faPencil } from '@fortawesome/free-solid-svg-icons';


export const SingleRecipe = () => {
    const params = useParams()
    const [recipe ,setRecipe] = useState()
    const [ratingModalOpen, setRatingModalOpen] = useState(false)
    const currentUser = useCurrentUser()
    const navigate = useNavigate()

    const getRecipe = async() => {
        const recipe = await axios.get(`/recipes/${params.id}`)
        console.log(recipe)
        setRecipe(recipe.data)
    }
    useEffect(() => {
        getRecipe()
    }, [])
    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    
                    <Card>
                    <Card.Header>
                        
                        
                        {recipe ?   
                        <Container>
                            <Row>
                                <Col className="d-flex justify-content-center"> <FontAwesomeIcon icon={faStarO} onClick={() => {
                                    if (currentUser) setRatingModalOpen(true)
                                    else navigate('/login/')
                                }}/></Col>
                                <Col className="d-flex justify-content-center"> <h3>{recipe.title}</h3> </Col>
                                <Col className="d-flex justify-content-center"><FavouriteToggle id={recipe.id} favouriteId={recipe.favourites[0]?.id} /></Col>
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-center">
                                {recipe.is_owner && <FontAwesomeIcon icon={faPencil} onClick={() => {
                                navigate(`/editrecipe/${recipe.id}`)
                                }} />}
                                </Col>
                            </Row>
                        </Container> : 'Not Found'}
                    </Card.Header>
                    <Card.Body>
                        {recipe ? (<>
                        <Container>
                            <Row>
                                <Col><img className='recipe-image' src={recipe.image} alt={`image of ${recipe.title}`}/></Col>
                                <Col>
                                    <h5>Ingredients</h5>
                                    {recipe.ingredients.split('\n').map((line)=> <p key={line}>{line}</p>)}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>{recipe.description}</p>
                                    <h5>Instructions</h5>

                                    {recipe.instructions.split('\n').map((line)=> <p key={line}>{line}</p>)}
                                </Col>
                            </Row>
                            <RatingModal title={recipe.title} open={ratingModalOpen} onClose={setRatingModalOpen} id={recipe.id}/>
                        </Container>
                        </>): (<>
                        loading or not found </>)}
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
    </Container>
    )
}