
import {HttpMethods} from "../services/HttpMethods"
import {useEffect, useState} from "react"


function App() {
  const [post, setPost] = useState()
  let http = new HttpMethods("post")

console.log(post)

  const FetchPost =async()=>{
    let res=await http.getAllParam({limit:40})
    setPost(LoadPost(res))
  }

  const LoadPost = (post)=>{
    console.log(post)
    return post.data.map((a)=>{
      return <div className="card m-2" style={{width: "18rem"}} key={a.id}>
                  <img src={a.image} style={{height: "16rem"}} className="card-img-top" alt={a.tex} />
                  <div className="d-flex flex-column justify-content-between card-body">
                    <h5 className="card-title">{FirstLetter(a.text)}</h5>
                    <a href="#" className="btn btn-secondary">See it</a>
                  </div>
              </div> 
    })
  }

  const FirstLetter=(sentence)=>{
    return sentence[0].toUpperCase() + sentence.slice(1);
  }

  useEffect(()=>{
    FetchPost()    

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
