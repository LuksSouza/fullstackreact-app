import React, { Component } from 'react';
import moment from 'moment';
import { Formik, Field, Form, ErrorMessage } from 'formik';

class Todo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            description: 'Became shinobi in React',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validade = this.validade.bind(this);
    }

    validade(values) {
        let errors = {};

        if (!values.description) {
            errors.description = 'Enter a Description';
        } else if (!values.description.length > 5) {
            errors.description = 'Enter at least 5 characters in Description';
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date';
        }

        return errors;
    }

    onSubmit(values) {
        console.log(values);
    }

    render() {
        let {description, targetDate} = this.state;

        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik initialValues={{description, targetDate}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validade}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"></Field>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        );
    }

}

export default Todo;