import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

import * as actions from '../actions'
import CustomInput from './CustomInput'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.responseGoogle = this.responseGoogle.bind(this)
        this.responseFacebook = this.responseFacebook.bind(this)
    }
    async onSubmit(formData) {
        console.log('onSubmit got calle')
        console.log('formData', formData)
        // We need to call some actionCreator
        await this.props.signUp(formData)
        if (!this.props.errorMessage) {
            this.props.history.push('/dashboard')
        }
    }


    async responseGoogle(res) {
        console.log('responseGoogle', res)
        await this.props.oauthGoogle(res.accessToken);
      if (!this.props.errorMessage) {
            this.props.history.push('/dashboard')
        

      }
    }
    async responseFacebook(res) {
        console.log('responseFacebook', res)
        await this.props.oauthFacebook(res.accessToken);
        if (!this.props.errorMessage) {
            this.props.history.push('/dashboard')
        

      }
    }



    render() {
        const { handleSubmit } = this.props
        return (
            <div className="row">
                <div className="col">

                    <form onSubmit={handleSubmit(this.onSubmit)}>

                        <fieldset>
                            <Field
                                name="email"
                                type="text"
                                id="email"
                                label="Enter your Email"
                                placeholder="example expample.com"
                                component={CustomInput} />
                        </fieldset>

                        <fieldset>
                            <Field name="password"
                                type="password"
                                id="password"
                                label="Enter your password"
                                placeholder="password"
                                component={CustomInput} />
                        </fieldset>

                        {this.props.errorMessage ?
                            <div className="alter alert-danger">
                                {this.props.errorMessage}
                            </div> : null}



                        <button type="submit" className="btn btn-primary">Sign Up</button>

                    </form>


                </div>
                <div className="col">
                    <div className="text-center">
                        <div className="alert alert-primary">
                            Sign Up using third-party service
                </div>
                        <FacebookLogin
                            appId="2743524672542540"
                            autoLoad={true}
                            textButton="Facebook"
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="btn btn-outline-primary"

                        />

                        <GoogleLogin
                            clientId="1031797538806-m5i5vp76r2sgsl9q19asjv0o1ml4bedt.apps.googleusercontent.com"
                            buttonText="Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            className="btn btn-outline-danger"

                        />
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage
    }
}




export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup' })
)(SignUp)