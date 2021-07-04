import {HttpMethods} from "../services/HttpMethods"

let http = new HttpMethods("post")


const FetchPost = async(setPost)=>{
    
    let res = await http.getAllParam({limit:20})
    console.log({res})

    setPost(LoadPost(res))
  }

  const LoadPost = (post)=>{
    console.log({post})
    return post.data.map((a)=>{
      return <div className="card m-2" style={{width: "18rem"}} key={a.id}>
                  <img src={a.image} style={{height: "16rem"}} className="card-img-top" alt={a.tex} />
                <div className="d-flex flex-column justify-content-between card-body">
                  <h6 className="card-subtitle">{FirstLetter(a.owner.firstName)} {FirstLetter(a.owner.lastName)}</h6>
                  <p className="card-text">{a.tags.map((a,i,arr)=>`#${a}${arr[i+1]!=undefined?",":""} `)}</p>
                  <h5 className="card-title">{FirstLetter(a.text)}</h5>    
                  <p className="card-text">{DateConvert(a.publishDate)}</p>
                  {a.link?  <a href={a.link} className="btn btn-secondary">Go to page</a>:""}
                    <div>
                        <p>{a.likes} Likes</p>
                    <button type="button" className="btn btn-secondary " data-bs-toggle="modal" data-bs-target="#modalComments">Comments
</button>

                    </div>

                    <div class="modal fade" id="modalComments" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Comments</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                {()=>{
                                    let comments= CommentsLoad(a.id)
                                }}
                            </div>

                            </div>
                        </div>
                    </div>
                 
                </div>
              </div> 
    })
  }

  const FirstLetter=(sentence)=>{
    return sentence[0].toUpperCase() + sentence.slice(1);
  }

  const DateConvert=(date)=>{
    let dat=new Date(date)
    return `${dat.getDate()}/${dat.getMonth()}/${dat.getFullYear()}`
  }

  const CommentsLoad= async (id)=>{
      const http = new HttpMethods(`post/${id}/comment`)
      let comments = await http.getAll()
      return comments;
  }

  
  export {FetchPost}