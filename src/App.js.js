import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

const getData = () =>
  Promise.resolve({
    ok: true,
    members: [
      {
        id: "W012A3CDE",
        real_name: "Egon Spengler",
        tz: "America/Los_Angeles",
        activity_periods: [
          {
            start_time: "Feb 1 2020  1:33PM",
            end_time: "Feb 1 2020 1:54PM"
          },
          {
            start_time: "Mar 1 2020  11:11AM",
            end_time: "Mar 1 2020 2:00PM"
          },
          {
            start_time: "Mar 16 2020  5:33PM",
            end_time: "Mar 16 2020 8:02PM"
          }
        ]
      },
      {
        id: "W07QCRPA4",
        real_name: "Glinda Southgood",
        tz: "Asia/Kolkata",
        activity_periods: [
          {
            start_time: "Feb 1 2020  1:33PM",
            end_time: "Feb 1 2020 1:54PM"
          },
          {
            start_time: "Mar 1 2020  11:11AM",
            end_time: "Mar 1 2020 2:00PM"
          },
          {
            start_time: "Mar 16 2020  5:33PM",
            end_time: "Mar 16 2020 8:02PM"
          }
        ]
      }
    ]
  });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      selectedMember: {},
      show: false
    };
  }

  async componentDidMount() {
    const data = await getData();
    this.setState({ members: data.members });
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    const { members, selectedMember, show } = this.state;
    return (
      <Container className="p-3">
        <Modal show={show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedMember.real_name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <pre>
              {JSON.stringify(selectedMember.activity_periods, undefined, 2)}
            </pre>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Jumbotron>
          <h1 className="header">Welcome</h1>
          <ListGroup>
            {members.map(member => (
              <ListGroup.Item
                active={selectedMember.id === member.id}
                action
                onClick={() => {
                  this.setState({ selectedMember: member, show: true });
                }}
              >
                {member.real_name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Jumbotron>
      </Container>
    );
  }
}

export default App;
