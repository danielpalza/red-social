
import {useEffect, useState} from "react"
import {FetchPost} from "./utils"


function App() {
  const [post, setPost] = useState()

  useEffect(()=>{
    FetchPost(setPost)    

  },[])

  return (
    <div>
      <nav className="navbar bg-dark  sticky-top p-2"><h1 className="text-light">Red Social</h1> </nav>
      <div className="d-flex flex-wrap flex-row justify-content-center">
        {post!==undefined?post.map((a)=>a):""}
      </div>
    </div>
    
  );
}

export default App;
