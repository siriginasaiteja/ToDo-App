import React from "react";

const Profile = () => {
  const name = sessionStorage.getItem("username");

   const [Inputs,setInputs] = useState({"email":"","username":"","password":""});

    const change=(e)=>{
    const {name,value}=e.target;
    setInputs({...Inputs,[name]:value});
    }
  return (
    <div>
      <div className="profileheader">
        <h3>{name}'s Profile</h3>
      </div>
      <div className="form">
        <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
          <h3>Update Your Task</h3>
          <input
            type="text"
            placeholder="Email"
            className=" my-4 w-100 p-2"
            name="Email"
            value={Inputs.email}
            onChange={change}
          />
          
          <input
            type="text"
            placeholder="username"
            className="todo-updatein my-4 w-100 p-2"
            name="username"
            value={Inputs.username}
            onChange={change}
          />

          <input
            type="text"
            placeholder="password"
            className="todo-updatein my-4 w-100 p-2"
            name="password"
            value={Inputs.password}
            onChange={change}
          />
          
          <button className="btn-dark my-4" onClick={submit}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
