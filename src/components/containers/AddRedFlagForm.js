import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Label, TextArea, Container } from 'semantic-ui-react';

const AddRedFlagForm = props => {
  const { handleChange, handleSubmit } = props;
  return (
    <div>
      <Container text>
        <br />
        <br />
        <h3>Create New Redflag</h3>
        <br />
        <div className="">
          <Form id="add_flag_form" onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Title</label>
                <input
                  id="title"
                  placeholder="Redflag Title"
                  onChange={handleChange}
                  required
                />
                <Label id="title_error" basic color="red" pointing />
              </Form.Field>
              <Form.Field>
                <label>Location</label>
                <input
                  id="location"
                  placeholder="Redflag Location"
                  onChange={handleChange}
                  required
                />
                <Label id="location_error" basic color="red" pointing />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Comment</label>
              <TextArea
                id="comment"
                style={{ minHeight: 100 }}
                onChange={handleChange}
                placeholder="Redflag Comment"
              />
              <Label id="comment_error" basic color="red" pointing />
            </Form.Field>

            <Button type="submit" id="submit_btn">
              Post
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default AddRedFlagForm;
