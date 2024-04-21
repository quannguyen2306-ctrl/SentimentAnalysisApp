import { GoogleLogin } from "react-google-login";

const clientId = "561826027643-4limjsvo3q2nv8e8r94n9tlmn8b0vcf9.apps.googleusercontent.com";

function Login() {

    const onSuccess = (res)=>{
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res)
    }

    return(
        <div id="signInButton">
            <GoogleLogin
                clientId = {clientId}
                buttonText = "Login"
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy = {'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )


}

export default Login