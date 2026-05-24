import {
    createContext,
    useEffect,
    useState,
} from "react";


export const AuthContext = createContext();


function AuthProvider({ children }) {

    const [user, setUser] = useState(null);


    useEffect(() => {

        const storedUser =
            localStorage.getItem("user");

        if (storedUser) {

            setUser(JSON.parse(storedUser));

        }

    }, []);



   const login = (data) => {

    localStorage.setItem(
        "user",
        JSON.stringify(data)
    );

    setUser(data);
};

    setUser(data.user);
};



    const logout = () => {

        localStorage.removeItem("user");

        localStorage.removeItem("token");

        setUser(null);

        window.location.href = "/login";
    };



    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );
}

export default AuthProvider;