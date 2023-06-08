import React from "react";
import './Comment.css';
import { Button, Form, Icon } from "semantic-ui-react";
import { useForm } from "react-hook-form";

function Comment() {
    const { register, handleSubmit, setValue, watch, formState: { errors }, trigger } = useForm();

    const handleChange = (e: any) => {
        e.persist();
        setValue(e.target.name, e.target.value);
        trigger(e.target.name);
    };

    const onSubmit = (value: any) => {
        alert("submitted successfully");
        console.log(value);
    };

    return(
        <div className="support" id="comment">
            <h1 className="support-header"><Icon name="write"></Icon> Write a comment</h1>
            <Form className="support-form" size="big" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group widths="equal">
                    <Form.Input required fluid label="First name" placeholder='First name' name="firstName" onChange={handleChange} error={!!errors.input}></Form.Input>
                    <Form.Input required fluid label="Last name" placeholder='Last name' name="lastName" onChange={handleChange} error={!!errors.input}></Form.Input>
                </Form.Group>
                <Form.Input required fluid label="Email" placeholder='email@example.com' name="email" onChange={handleChange} error={!!errors.input}></Form.Input>
                <Form.TextArea required label="Comment" name="comment" onChange={handleChange} error={!!errors.input}></Form.TextArea>
                <Button floated="right" positive type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default Comment;