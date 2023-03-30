import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import "./login.scss"

const Login = () => {

  const [email, setEmail]=useState('');
  const [error, setError] = useState(null);

  function ValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleEmailChange = event => {
    if (!ValidEmail(event.target.value)) {
      setError('Email is invalid');
    } else {
      setError(null);
    }
    setEmail(event.target.value);
  };
  const isValidEmail=() => {
    if(Object.keys(error).length>0){
      return false
    } return true
  }

  const[input, setInput]=useState({
    username:"",
    password:""
  });

  
  const onSubmitLogin=()=>{
    if(!isValidEmail){
      return 
    }
    Login();
  }


  return (
  <div className="login">
    <div className="card">
      <div className="right">
        <h1>CHEESERA</h1>
        <p>Login to continue</p>
        <form>
          {error && <span style={{color: 'red', fontSize: "10px"}}>{error}</span>}
          <input 
            type="email" 
            placeholder="Email" 
            //id="email" 
            name="email"
            value={email}
            onChange={handleEmailChange} />
            
          <input 
            type="password" 
            placeholder="Password"
            //id="password"
            name="password"

             />
          <button onClick={onSubmitLogin}>Continue</button>
          <span>Or contimue with:</span>
          <button>
            <img src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.429/static/media/google-logo.e086107b.svg" alt="" ></img>
            <span>Google</span>
          </button>
          <button>
            <img src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.429/static/media/microsoft-logo.42b61fa1.svg" alt="" ></img>
            <span>Microsoft</span>
          </button>
          <button>
            <img src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.429/static/media/apple-logo.4f2453fb.svg" alt=""></img>
            <span>Apple</span>
          </button>
          <button>
            <img src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.429/static/media/slack-logo.0390f069.svg" alt=""></img>
            <span>Slack</span>
          </button>
          <ul>
          <li>
            <a href="/login" alt=""> Can't login?</a>
          </li>
          <li>
            <a href="/login" alt=""> Create an account</a>
          </li>
          </ul>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login