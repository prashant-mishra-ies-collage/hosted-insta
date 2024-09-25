import "../css/PostDetails.css";
import {useNavigate} from "react-router-dom"


export default function PostDetails({item,toggleDetails}){
    const navigate=useNavigate()

    const removePost=(postId)=>{

       if(window.confirm("do you really want to delete this post ?")){

        fetch(`/deletePost/${postId}`,{
            method:"delete",
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            
        }).then(res=>res.json)
        .then((result)=>{
            console.log(result)
            toggleDetails();
            navigate("/")
        })
        .catch(err=>{
            console.log(err)
        })
    }
    }

    return(
        <div className="showComment">
        <div className="container">
      <div className="postPic">
         <img src={item.photo} alt="" />
      </div>
      <div className="details">
        {/*card header */}
      <div className="card-header" style={{borderBottom:"1px solid #00000029"}}>
            <div className="card-pic">
          <img src="http://res.cloudinary.com/duuzgpf8f/image/upload/v1724158899/slmrqrdqj6dm3nrpo0fz.jpg" alt="" />
            </div>
            <h5>{item.postedBy.name}</h5>
            
            <div className="deletePost" onClick={removePost(item._id)}>
            <span className="material-symbols-outlined">
delete
</span>
            </div>
          </div>
        {/*commlentsection*/}
        <div
                      className="comment-section"
                      style={{ borderBottom: "1px solid #00000029" }}
                    >
                      {item.comments.map((comment) => {
                        return (
                          <p className="comm">
                            <span
                              className="commenter"
                              style={{ fontWeight: "bolder" }}
                            >
                              {comment.postedBy.name}{" "}
                            </span>
                            <span className="commentText">{comment.comment}</span>
                          </p>
                        );
                      })}
                    </div>
          {/*cardcontent*/}
          <div className="card-content">
           
          <p>{item.likes.length}</p>
          <p>{item.body}</p>
         
          </div>
      
          {/*addcomment*/}
          <div className="add-comment">
                    <span className="material-symbols-outlined">mood</span>
                    <input
                      type="text"
                      placeholder="Add a comment"
                   //   value={comment}
                    //  onChange={(e) => {
                    //    setComment(e.target.value);
                   //   }}
                    />
                    <button
                      className="comment"
                   //  onClick={() => {
                    //  makeComment(comment, item._id);
                    //  toggleComment();
                    //  }}
                 >
                      Post
                    </button>
                  </div>
                </div>
         
         
          
        </div>
      
      {/*close comment*/}
      //here this function use for specially true and false
      <div className="close-comment"
       onClick={()=>{toggleDetails()}}
       >
      <span className="material-symbols-outlined material-symbols-outlined-comment">
      close
      </span>
      </div>
      
      
      
      </div> 
    )
}