import { faHeart, faStar } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Badge,
  Card,
  Col,
  Container,
  Image,
  Row,
  Stack,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FavouriteToggle } from "./favouriteToggle";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

export const Recipe = (props) => {
  const { recipe } = props;
  const navigate = useNavigate();
  return (
    <Col md={4}>
      <Card className="recipe-box">
        <Container>
          <Row>
            <Col xs={9}>
              <Image
                onClick={() => {
                  navigate(`/recipe/${recipe.id}`);
                }}
                fluid
                src={recipe.image}
                alt={`image of ${recipe.title}`}
              />
            </Col>
            <Col xs={3}>
              <div>
                <FavouriteToggle
                  id={recipe.id}
                  favouriteId={recipe.favourites[0]?.id}
                />
              </div>
              <div className="star">
                <FontAwesomeIcon icon={faStar} />
                {recipe.average_rating || "-"}
              </div>
              <div className="pencil">
                {recipe.is_owner && (
                  <FontAwesomeIcon
                    icon={faPencil}
                    onClick={() => {
                      navigate(`/editrecipe/${recipe.id}`);
                    }}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col
              onClick={() => {
                navigate(`/recipe/${recipe.id}`);
              }}
            >
              <h4 className="asap">{recipe.title}</h4>
              <Stack direction="horizontal" gap="2">
                {recipe.categories.map((category) => (
                  <Badge key={`${category.name}-${recipe.id}`}>
                    {category.name}
                  </Badge>
                ))}
              </Stack>
              <p className="josefin">{recipe.description}</p>
            </Col>
          </Row>
        </Container>
      </Card>
    </Col>
  );
};
