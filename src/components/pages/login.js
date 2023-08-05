import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Alert } from 'bootstrap';
import axios from 'axios';

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const {data} = await axios.post('/login', {username, password})
            // setCurrentUser(data.user)
            // history.pushState('/')
        } catch(err){
            setErrors(err.response?.data)
        }
    }

    return(
        <Container fluid>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                    <Card.Header as="h5">Log In</Card.Header>
                    <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" value={username} onChange={(event) => {
                                setUsername(event.target.value)
                            }}/>
                        </Form.Group>
                        {errors.username?.map((message, idx) => 
                        <Alert variant="warning" className="mt-3" key={idx}>{message}</Alert>)}

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => {
                                setPassword(event.target.value)
                            }}/>
                        </Form.Group>
                        {errors.password?.map((message, idx) => 
                        <Alert variant="warning" className="mt-3" key={idx}>{message}</Alert>)}

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => 
                        <Alert variant="warning" className="mt-3" key={idx}>{message}</Alert>)}

                    </Form>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
    </Container>
    )
}
    