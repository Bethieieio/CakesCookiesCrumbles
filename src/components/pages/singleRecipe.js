import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

export const SingleRecipe = () => {
    const params = useParams()
    console.log(params);
    const getRecipe = async() => {
        const recipe = await axios.get(`/recipes/${params.id}`)
        console.log(recipe)
    }
    useEffect(() => {
        getRecipe()
    }, [])
    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                    <Card.Header as="h5">recipe title</Card.Header>
                    <Card.Body>
                        put recipe here
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
    </Container>
    )
}