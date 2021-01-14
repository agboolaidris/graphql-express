import {USER_LOADED,
    LOGOUT,
    USER_LOADING,
    USER_AUTH_ERR,
     REGISTER_SUCCESSFUL,
     REGISTER_ERROR,
     LOGIN_ERROR,
     LOGIN_SUCCESSFUL,
     FORGET_PASSWORD_ERROR,
     FORGET_PASSWORD_SUCCESSFUL
    } from './type' 
import axios from 'axios'
import {getError} from './ErrorAction'
import {getSuccess} from './SuccessfulAction'


export const checkAuth = ()=>{
    return async(dispatch, getState)=>{
       try{ 
        dispatch({type:USER_LOADING})
        const token = getState().Auth.token
        if(token){
           axios.get('https://iriswebsite.herokuapp.com/user',{headers:{'x-auth-token':token}})
           .then(res=>{
               dispatch({type:USER_LOADED, payload:res.data})
            })
           .catch(err=>{
               dispatch({type:USER_AUTH_ERR})
           })
        }
        else{
            dispatch({type:USER_AUTH_ERR})
        }
    }
    catch(err){
        console.log(err.message)
    }
    }
}

export const Register = (user)=>{
    return async(dispatch)=>{
        dispatch({type:USER_LOADING})
     try{ axios.post('https://iriswebsite.herokuapp.com/user/register',user)
      .then(res=>{

          dispatch({type:REGISTER_SUCCESSFUL,payload:res.data})
        
      })
      .catch(err=>{
          console.log(err)
          dispatch({type:REGISTER_ERROR})
          dispatch(getError(err.response,'REGISTERATION FAIL'))
      })       
    }
    catch(err){
    } 
   }
}
export const Login = (user)=>{
    return async(dispatch)=>{
        dispatch({type:USER_LOADING})
     try{ 
        axios.post('https://iriswebsite.herokuapp.com/user/login',user)
      .then(res=>{
        
        dispatch({type:LOGIN_SUCCESSFUL,payload:res.data})
        
      })
      .catch(err=>{
        
          dispatch({type:LOGIN_ERROR})
          dispatch(getError(err.response,'LOGIN FAIL'))
      })       
    }
    catch(err){
        console.log(err.message)
    } 
   }
}

export const Logout = ()=>{
    return (dispatch)=>{
      dispatch({type:LOGOUT})
    }
}

export const forgetpassword = (email)=>{
    console.log(email)
   return async(dispatch)=>{
      dispatch({type:USER_LOADING})
     try{ 
       axios.post('http://localhost:5000/user/forgetpassword',email)
      .then(res=>{
          
          dispatch({type:FORGET_PASSWORD_SUCCESSFUL})
          dispatch(getSuccess(res, 'FORGET PASSWORD SUCCESSFUL'))
      })
      .catch(err=>{
          dispatch(getError(err.response,'FORGET PASSWORD FAIL'))
          dispatch({type:FORGET_PASSWORD_ERROR})
    
      })
    }
    catch(err){
      console.log(err.response.message)
    }
   }
}