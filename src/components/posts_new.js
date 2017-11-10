import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class postsNew extends Component {

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-control ${touched && error ? 'is-invalid' : ''}`

        return (
            <div className="form-group is-invalid">
                <label className="form-control-label">{field.label}</label>
                <input className={className} type="text" {...field.input} />
                <div className="text-danger">
                    { touched ? error : '' }
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push("/");            
        });
        
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title"
                    name="title"
                    component={this.renderField} />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField} />
                <Field 
                    label="Post Content"
                    name="content"
                    component={this.renderField} />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validateForm(values) {
    const errors = {};
    
    if(!values.title || values.title.length < 3) {
        errors.title = "Enter a title that is at least 3 characters!";
    }
    if(!values.categories) {
        errors.categories = "Enter some categories";
    }
    if(!values.content) {
        errors.content = "Enter some contenct please";
    }


    return errors;
}

export default reduxForm({
    validate: validateForm,
    form: 'PostNewForm'
})(
    connect(null, { createPost })(postsNew)
);