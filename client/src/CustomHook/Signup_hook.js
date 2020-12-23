import {useState, useEffect} from 'react'

const useSignUp = (SignUp, Validation)=>{
  const [state, setstate] = useState({
      userName:'',
      email:'',
      password:'',
      password2:''
  })
  const [error, seterror] = useState({})
  const [boolean, setboolean] = useState(false)

  const handleChange = (e)=>{
      setstate({
          ...state,
          [e.target.id]:e.target.value
      })
   
  }
  useEffect(() => {
      app()
  }, [error])

  const app = ()=>{
      
      if(boolean){
    if(Object.keys(error).length === 0 && error.constructor === Object){
          SignUp(state)  
        }
    }
  }

  const handleSubmit = (e)=>{
      e.preventDefault()
      seterror(Validation(state))
      setboolean(true)
    
}

  return {state,handleChange, handleSubmit,error}
}

export default useSignUp