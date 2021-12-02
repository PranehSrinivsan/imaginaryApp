
const Home = () =>{

return (
    <div>
        <h3>Enter proper Owner, Repository , Oid.</h3>

        <div>
        1. To get particular commit of particular repostitory :<br/>
        http://localhost:3000/repo/owner/repository/commits/oid<br/>
        example : http://localhost:3000/repo/arunnatarajs/toDoApp/commits/01484c7931c70226b09d9474a805ee7cfb71af79<br/><br/>
        </div>

        <div>
        2. To find difference between two commits :<br/>
        http://localhost:3000/repo/owner/repository/commits/oid/diff<br/>
        example : http://localhost:3000/repo/arunnatarajs/toDoApp/commits/01484c7931c70226b09d9474a805ee7cfb71af79/diff 

        </div>
    </div>
)
}
export default Home