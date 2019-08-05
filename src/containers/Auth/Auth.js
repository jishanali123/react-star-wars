import React , {Component} from 'react';
import {connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as allActions from '../../store/actions/index';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state ={
        controls : {
            UserName : {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder : 'Character Name'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            Password : {
                elementType : 'input',
                elementConfig : {
                    type: 'password',
                    placeholder : 'password'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            }
        },
        isSignup : true,
        isAuth : false
    }
    
    checkValidity (value , rules){
        let isValid = true;
        if(rules){
            if(rules.required){
                isValid = value.trim() !== '' && isValid;
            }
        }
        return isValid;
    }
    
    inputChangeHandler = (event , controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value : event.target.value,
                valid : this.checkValidity(event.target.value , this.state.controls[controlName].validation),
                touched : true
            }
        }
        this.setState({
            controls : updatedControls
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.UserName.value , this.state.controls.Password.value);
        //this.props.history.replace('/planets');
        //
        //if(this.props.isAuth){
        //    this.props.history.push(this.props.authRedirectPath);
       // }
       //
    }

    render(){
        const formsElementArray =[];
        for (let key in this.state.controls){
            formsElementArray.push({
                id : key,
                config : this.state.controls[key]
            });
        }
        
        const form = formsElementArray.map((formElement) => {
            return (
                <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event)=>this.inputChangeHandler(event , formElement.id)}
                inValid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched ={formElement.config.touched}
                />
                );
            });

        let errorExists = null;
        if(this.props.error){
            errorExists = <p>{this.props.error}</p>;
        }

        let autoRedirect = null;
        if(this.props.isAuth){
            autoRedirect = <Redirect to={this.props.authRedirectPath} />
        } 
        
        let authForm = <Spinner />
        if(!this.props.loading){
        authForm = (
        <div className={classes.Auth}>
            {autoRedirect}
            {errorExists}
            <form onSubmit={this.submitHandler}>
            {form}
            <Button btnType="Danger" >Cancel</Button>
            <Button btnType="Success" >Submit</Button>
            </form>
        </div>
            )
        } 
        return authForm;
    }
}

const mapStateToProps = (state) => {
    return {
        loading : state.loading,
        error : state.error,
        isAuth:state.userId,
        authRedirectPath:state.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onAuth : (name , password) => {dispatch(allActions.auth(name, password))}
    }
}

export default connect(mapStateToProps , mapDispatchToProps) (Auth);
