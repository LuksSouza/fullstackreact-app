import React, { Component } from 'react';
import moment from 'moment';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import AuthenticationService from '../service/authentication/AuthenticationService';
import TodoDataService from '../../../api/TodoDataService';

class Todo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validade = this.validade.bind(this);
    }

    componentDidMount() {
        if (this.state.id === '-1') {
            return;
        }

        let username = AuthenticationService.getUserLoggedIn();

        TodoDataService.getTodoBy(username, this.state.id)
        .then(
            response => {
                this.setState({
                    description: response.data.description,
                    targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                })
            }
        );

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
        let errors = {};
        let username = AuthenticationService.getUserLoggedIn();

        let todo = {
            id: this.state.id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            isDone: false
        }

        if (this.state.id === '-1') {
            TodoDataService.saveTodo(username, todo)
            .then(response => {
                this.props.history.push(`/todos`);
            })
            .catch(response => {
                console.log('deu ruim! ' + response.data.ErrorMessage);
                errors.api = response.data.ErrorMessage
            });
        } else {
            TodoDataService.updateTodo(username, this.state.id, todo)
            .then(response => {
                this.props.history.push(`/todos`);
            })
            .catch(response => {
                console.log('deu ruim! ' + response.data.ErrorMessage);
                errors.api = response.data.ErrorMessage
            });
        }

        return errors;
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
                        validate={this.validade}
                        enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="api" component="div" className="alert alert-warning" />
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