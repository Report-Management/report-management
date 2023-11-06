import {useState, useEffect} from "react";
import {Button} from "flowbite-react";
import { supabaseSession } from "../../core/index.js";

export const FirebaseView = () => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        async function getUser(){
            await supabaseSession.auth.getSession().then(({ data: { session } }) => {
                console.log(session)
                setUser(session)
            })
            await supabaseSession.auth.getUser().then(({ data: { user } }) => {
                console.log(user)
            })
        }

        getUser();
    }, []);
    return (
        <div className="container mx-auto h-screen flex flex-col justify-center items-center">
            <div className="text-center">
                {user && user.user && user.user.user_metadata && (
                    <div>{user.user.user_metadata.full_name}</div>
                )}
                <Button onClick={() => supabaseSession.auth.signOut()}>Sign out</Button>
            </div>
        </div>
    )
}
