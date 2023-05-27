import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Root = ({children: Component}) => {
    return (
      <Container fluid>
        <Row>
          <Col>{Component}</Col>
        </Row>
      </Container>
    );
}
 
export default Root;