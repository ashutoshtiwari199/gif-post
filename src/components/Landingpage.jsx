import React ,{useState, useEffect}from 'react';

const Landingpage=()=> {

    const [gifSearch, setGifSearch ] = useState(false)
    const [gifs, setgifs] = useState([]);
    const [postWithGif,setPostWithGif ] = useState(false)
    const [input, setInput] = useState({
        text:"",
        src:""
    })

    const [posts,setPosts] = useState([])
    const [reload, setReload] = useState(0);



    const toggleGifSearch=()=>{
        setGifSearch(gifSearch?false:true)
    }

    const clickGif=(e)=>{
        setPostWithGif(postWithGif?false:true)
        setGifSearch(gifSearch?false:true)
        setInput({...input,src:e.target.src})
        setgifs([])
    }

    const gifSerachArea=()=>{
        return(
            <div className="gif-seracharea">
                <input type="text" className='serch-input' onChange={(e)=>fetchgif(e)} placeholder='serach GIFs' />
                {gifs.length>0
                ? gifs.map(((img)=>{
                    return(
                        <img key={img.images.fixed_height.url} src={img.images.fixed_height.url} alt="not correct" onClick={clickGif} />
                    )
                }))
                : <img src="https://media3.giphy.com/media/1n6FOu976kb1yr5uW5/200.mp4?cid=89ba4ef601lle6faw7tnj8l1g8s6mc1t8kv3tqn5enpicddm&rid=200.mp4&ct=g" alt="" />
                }
            </div>
        )
    }
    
    const fetchgif=(e)=>{
        let searchQuerry=e.target.value
        const data=fetch(`https://api.giphy.com/v1/gifs/search?api_key=7uS6Jzwj1KWftbl93KaOHhF3HxbWA2bl&q=${searchQuerry}&limit=5&offset=0&rating=G&lang=en`)
            .then(val=>val.json())
            .then(response=>{
                setgifs(response.data)
            })             

    }
    

    const postData=()=>{
        let posts=[];
        if(typeof window !== undefined){
            if(localStorage.getItem("posts")){
                posts= JSON.parse(localStorage.getItem("posts"))
            }
            posts.push({...input});
            localStorage.setItem("posts", JSON.stringify(posts));
            setGifSearch(false)
            setPostWithGif(false);
            setReload(reload+1)
            setInput({...input, text:"",src:""})
        }
        
    }
    const loadPosts= ()=>{
        if(typeof window !== undefined){
            if(localStorage.getItem("posts")){
                return JSON.parse(localStorage.getItem("posts"))
            }
        } else {
            return []
        }
    }

    useEffect(()=>{
        setPosts(loadPosts());
    },[reload]);
    

  return (
    <>
    <div className='left-area'>
        <h2 className='title-bg' >Post A message with GIFs</h2>
        <div className='input-post' onClick={()=>setGifSearch(false)} >
            <input type="text" className="textInput" placeholder='Write here...' value={input.text} onInput={(e)=>setInput({...input, text:e.target.value})} />
        {postWithGif
        ?<img className='' src={input.src} alt="skshkjshkhjk" />
        :""}
        </div>
        <button onClick={toggleGifSearch} className='gif-button' >GIFs</button>
        <button className='post-button post-msg-text' onClick={postData} >Post</button>

        { gifSearch ? gifSerachArea():""}
    </div>
    <div className='right-area' >
    {posts && posts.length>0?
        posts.map((item,index)=>(
          <div key={index+item.src} className="saved-posts">
            <h3 className='post-msg-text' >{item.text}</h3>
            <img src={item.src} alt="Loading.." />
          </div>
        ))
    : <h3 className='nopost' >No Post Yet..</h3> }
    </div>
    </>  
  );
}

export default Landingpage;
