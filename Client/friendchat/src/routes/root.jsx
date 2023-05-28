import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";

const Root = ({children: Component}) => {
    return (
      <Container fluid>
        <Row>
          {Component}
        </Row>
      </Container>
    );
}
 
export default Root;