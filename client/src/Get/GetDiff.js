import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { display } from '../commponents/Display'

function GetDiff(){

    const {owner,repository,oid}=useParams();
    const curl=`http://localhost:8081/repos/${owner}/${repository}/commits/${oid}`;

    var [days,setDays] = useState();
    var [parentid,setParentid] = useState();
    var [commitedby,setCommittedby] = useState();
    var [authorname,setAuthorname] = useState();
    var [authorphoto,setAuthorphoto] = useState();
    var [authordate, setAuthordate] = useState();
    var [files, setFiles] = useState([]);
    var [filename,setFilename] = useState([]);
    var psha;

    useEffect( () => {
        axios.get(curl)
        .then((json)=>{

            var currdate = new Date();
            setDays(Math.floor((currdate-Date.parse(json.data.commit.committer.date))/(1000*3600*24)));
            setAuthorname(json.data.commit.author.name);
            setCommittedby(json.data.commit.committer.name);
            psha = json.data.parents[0].sha;
            setParentid(json.data.parents[0].sha);
            setAuthorphoto(json.data.author.avatar_url);

            const durl = `http://localhost:8081/repos/${owner}/${repository}/compare/${psha}...${oid}`;
            
            axios.get(durl)
            .then((res)=>{

                for(var i in res.data.files){

                    var sam = res.data.files[i].patch.split("\n")
                    setFiles(files => [...files, sam]);
                    filename.push(res.data.files[i].filename);
                }
            })
            .catch((e)=>{
                console.log("no patch found");
            })
        })
    },[curl,oid,owner,parentid,repository])

    files = files.slice(0,files.length/2);//redusing size to over come double execution  
    
    return(
    <html class ="center">
        <header>
            <div className="left">

                <div className="left">
                    <img src={authorphoto} alt="Avatar" className="image">
                    </img>
                </div>

                <div className="left"><p className="header">Frame</p>
                    <p><span className="muted">Authored by </span><span className="body-text">{authorname}</span></p>
                </div>

            </div>

            <div className="right">
                <p><span className="muted">Commited by </span><span className="body">{commitedby} </span><span className="muted">{days} days ago</span></p>
                <p><span className="muted">Commit </span><span className="body">{oid}</span></p>
                <p><span className="muted">Parent </span><span className="Link-monospace">{parentid}</span></p>
            </div>

        </header>

        <body>
            <article>
                <div>
                    {files.map((file,index) =>(
                    <>
                    <button type="button" class="collapsiblelink" onClick={() => display(index)}>{filename[index]}</button>
                    <div class="content">
                        <span> {file[0]} </span>
                        {file.map(line => (
                        <tr>
                            <td>
                                <span>0</span>
                            </td>

                            <td>
                               <span> 1  </span>
                            </td>
                                
                            <td>
                                {line}
                            </td>
                        </tr>
                        ))}

                        </div></>
                    ))}
                </div>
            </article>
        </body>

    </html>
    )
}

export default GetDiff