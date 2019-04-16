import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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

const Redflags = ({ redflags, next }) => {
  function displayMessage(message) {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: true
    });
  }

  function deleteRedflag(e) {
    let flag_id = e.target.id;
    fetch(
      "https://ireporter-drf-api-staging.herokuapp.com/api/redflags/" + flag_id,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        if (data.status == 200) {
          toast.success(data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true
          });
          setTimeout(function() {
            location.reload(true);
          }, 3000); //!!REPLACE WITH UPDATING THE STATE
        } else if (data.detail) {
          displayMessage("Please login again");
          this.props.history.push("/");
        } else if (data.status == 403) {
          displayMessage(data.error);
        } else if (data.status == 404) {
          displayMessage(data.error);
        } else {
          console.log(data);
        }
      });
  }

  function openNextPage(e) {
    let next_url = e.target.id;
    next(next_url);
  }

  function openPreviousPage(e) {
    let prev_url = e.target.id;
    next(prev_url);
  }

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
                <Modal trigger={<Icon name="eye" size="large" />}>
                  <Modal.Header>Image</Modal.Header>
                  <Modal.Content image scrolling>
                    <Image
                      size="medium"
                      src="https://react.semantic-ui.com/images/wireframe/image.png"
                      wrapped
                    />

                    <Modal.Description>
                      <Header>{redflag.title}</Header>
                      <Header as="h6">
                        By: {redflag.createdBy} On: {redflag.createdOn}
                      </Header>
                      <p>{redflag.comment}</p>
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <label> Share: </label>
                    <a href={redflag.twitter}>
                      {" "}
                      <Icon name="twitter" size="large" />{" "}
                    </a>
                    <a href={redflag.facebook}>
                      {" "}
                      <Icon name="facebook official" size="large" />{" "}
                    </a>
                    <a href={redflag.linkedin}>
                      {" "}
                      <Icon name="linkedin" size="large" />{" "}
                    </a>
                    <a href={redflag.mail}>
                      {" "}
                      <Icon name="mail" size="large" />
                    </a>
                  </Modal.Actions>
                </Modal>
                <Icon name="edit outline" size="large" />
                <Icon
                  name="trash"
                  id={redflag.id}
                  onClick={deleteRedflag}
                  size="large"
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item
                  onClick={openPreviousPage}
                  id={redflags.previous}
                  as="a"
                  icon
                >
                  <Icon
                    onClick={openPreviousPage}
                    id={redflags.previous}
                    name="chevron left"
                  />
                </Menu.Item>
                <Menu.Item
                  onClick={openNextPage}
                  id={redflags.next}
                  as="a"
                  icon
                >
                  <Icon
                    onClick={openNextPage}
                    id={redflags.next}
                    name="chevron right"
                  />
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
