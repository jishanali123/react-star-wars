import * as actionTypes from './actionTypes';
import $ from 'jquery';
import Alert from 'react-s-alert';
const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId:userId
    }
}
const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error : error
    }
}
const findPeople= (dispatch,name,password,url) =>{
    url=url || 'https://swapi.co/api/people/';
    $.ajax({
        type: 'get',
        url: url,
        crossDomain: true,
        success: function (data, status) {
            var noOfPages=data.count/10;
            var results = data.results.find(dt => {
                return (dt.name == name);
            })
            if(results){
                if(results.birth_year==password){
                    console.log("Login Successful");
                    dispatch(authSuccess(name));
                }
                else{
                    console.log("Login UnSuccessful");
                    dispatch(authFail());
                }
            }
            else if (noOfPages >0 && data.next) {
                noOfPages--;
                findPeople(dispatch,name,password,data.next);
            } else {
                dispatch(authFail("Could not find any user"));
                }

        }.bind(this),
        error: function (error, status) {
            console.log("ERROR", error, status);
            dispatch(authFail());
        }
    });
}

export const auth = (name , password) => {
    return dispatch => {
        dispatch(authStart());  
        findPeople(dispatch,name,password); 
        
        
    }
}

