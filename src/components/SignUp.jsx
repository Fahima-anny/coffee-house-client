import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";


const SignUp = () => {

const {createUser} = useContext(AuthContext) ;

const handleSubmit = e => {
    e.preventDefault() ;

const form = e.target ;
const password = form.password.value ;
const email = form.email.value ;
const name = form.name.value ;
 console.log(password, email) ;


// create new user 
createUser(email, password)
.then(res => {
    console.log(res.user)
    const createdAt = res.user?.metadata?.creationTime
    const newUser = {name, email, createdAt} ;

    // add user in db 
    fetch("https://coffee-store-server-seven-smoky.vercel.app/users", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data?.insertedId){
            alert("New User Created")
        }
    })
})
.catch(er => console.log(er))
}

    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6 max-w-4xl">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name="name" placeholder="name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up or Register</button>
              </div>
              <p>Already have an account? <Link to="/signin" className="text-primary">Sign In</Link> now</p>
            </form>
          </div>
        </div>
      </div>
    );
};

export default SignUp;