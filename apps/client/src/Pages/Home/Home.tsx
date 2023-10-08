import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
export default function Home() {
  const navigate = useNavigate();
  function redirect(){
    navigate("/report", {replace: true})
  }
  useEffect(()=>{
  redirect();

  }, [])
  return (
    <>
      
    </>
  )
}
