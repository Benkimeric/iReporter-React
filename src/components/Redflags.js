import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Image,
  Header,
  Icon,
  Modal,
  Menu,
  Table,
  Label
} from "semantic-ui-react";

const Redflags = ({ redflags }) => {
  //   let item = redflags.results[0].comment;

  function handleClick() {
    // alert("Opened");
    console.log("opened");
  }

  console.log(redflags);
  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {redflags.results.map(redflag => (
            <Table.Row key={redflag.id}>
              <Table.Cell>{redflag.title}</Table.Cell>
              <Table.Cell>{redflag.incident_type}</Table.Cell>
              <Table.Cell>{redflag.status}</Table.Cell>
              <Table.Cell>
                {/* <Icon onClick={handleClick} name="eye" size="large" /> */}
                <Modal
                  trigger={
                    <Icon onClick={handleClick} name="eye" size="large" />
                  }
                >
                  <Modal.Header>Image</Modal.Header>
                  <Modal.Content image scrolling>
                  <Image
                      size="medium"
                      src="https://react.semantic-ui.com/images/wireframe/image.png"
                      wrapped
                    />

                    <Modal.Description>
                      <Header>{redflag.title}</Header>
                      <Header as='h6'>By: { redflag.createdBy } On: { redflag.createdOn }</Header>
                      <p>{redflag.comment}</p>
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <label> Share: </label>
                    <a href= { redflag.twitter }> <Icon name="twitter" size="large" /> </a>
                    <a href= { redflag.facebook }>  <Icon name="facebook official" size="large" /> </a>
                    <a href= { redflag.linkedin }> <Icon name="linkedin" size="large" /> </a>
                    <a href= { redflag.mail }> <Icon name="mail" size="large" /></a>
                  </Modal.Actions>
                </Modal>
                <Icon name="edit outline" size="large" />
                <Icon name="trash" size="large" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default Redflags;
