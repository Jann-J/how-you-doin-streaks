import {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import supabase from './config/supabaseClients';

function ProtectedRoute({children}){
    const [user, setUser] = useState(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const {
              data: { session },
            } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setChecking(false);
        };
        checkUser();
    }, []);

    if (checking) return <div>Loading...</div>;

    return user ? children : <Navigate to="/login" />;

}

export default ProtectedRoute;