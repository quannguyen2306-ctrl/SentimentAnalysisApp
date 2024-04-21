import { GoogleLogout } from "react-google-login";

const clientId = "561826027643-4limjsvo3q2nv8e8r94n9tlmn8b0vcf9.apps.googleusercontent.com";

function Logout() {

    const onSuccess = (res)=>{
        console.log("LOGOUT SUCCESS!");
    }

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout