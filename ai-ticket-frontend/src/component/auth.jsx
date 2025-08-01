import React, { useEffect }  from "react";


function Auth({children, protectedRoute}) {
    const navigate=useNavigate();
    const[loading, setLoading]=useState(true);
    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(!token && protectedRoute){
            navigate("/login");
        }else if(token && !protectedRoute){
            navigate("/");
        }else{
            setLoading(false);
        }
    },[navigate,protectedRoute]);
    if(loading){
        return <div>Loading...</div>;
    }
    return children;
}
export default Auth;