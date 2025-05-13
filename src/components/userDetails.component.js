import React, { Component } from 'react';
 export default class UserData extends Component {
  constructor(props){
    super(props)
    this.state={
      userData:"",
    };
  }
    componentDidMount(){
        fetch("http://localhost:5000/userData",{
            method:"POST",
            crossDomain:"true",
            headers:{
              "Content-Type":"application/json",
              Accept:"application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body:JSON.stringify({
              token:window.localStorage.getItem("token"),
            }),
          }).then((result)=>result.json())
          .then((data)=>{
            console.log(data,"userData");
            this.setState({userData:data.data})
          });
    }
    logOut=()=>{
      window.localStorage.clear();
      //window.localStorage.removeItem("token");
      window.location.href="/sign-in";
    }
    render(){
        return (
            <div>
                Name<h1>{this.state.userData.firstname}</h1>
                Email<h1>{this.state.userData.email}</h1>
                
                <br />
                <button onClick={this.logOut}className="btn btn-primary">Log Out</button>
            </div>
        );
    }
}
// import React, { Component } from 'react';
// import './UserData.css'; // Import the CSS file for styling

// export default class UserData extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             userData: "",
//             loading: true,
//             profilePic: null, // State to hold the uploaded profile picture
//         };
//     }

//     componentDidMount() {
//         fetch("http://localhost:5000/userData", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 token: window.localStorage.getItem("token"),
//             }),
//         })
//         .then((result) => result.json())
//         .then((data) => {
//             this.setState({ userData: data.data, loading: false });
//         });
//     }

//     handleLogout = () => {
//         // Logic for logging out
//         window.localStorage.removeItem("token");
//         // Redirect to login or home page
//         window.location.href = "/sign-in"; // Adjust the path as needed
//     };

//     handlePhotoChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 this.setState({ profilePic: reader.result }); // Set the uploaded image as the profile picture
//             };
//             reader.readAsDataURL(file); // Convert the file to a base64 URL
//         }
//     };

//     render() {
//         if (this.state.loading) {
//             return <h2>Loading...</h2>;
//         }

//         const defaultProfilePic = "https://via.placeholder.com/150"; // Default profile picture URL
//         const profilePic = this.state.profilePic || defaultProfilePic; // Use uploaded picture or default

//         return (
//             <div className="user-data-container">
//                 <img 
//                     src={profilePic} 
//                     alt="Profile" 
//                     className="profile-pic" 
//                 />
//                 <h1>{this.state.userData.firstname}</h1>
//                 <p>Email: {this.state.userData.email}</p>
//                 <input 
//                     type="file" 
//                     accept="image/*" 
//                     onChange={this.handlePhotoChange} 
//                     className="file-input" 
//                 />
//                 <div className="button-container">
//                     <button onClick={this.handleLogout} className="btn">Logout</button>
//                 </div>
//             </div>
//         );
//     }
// }
