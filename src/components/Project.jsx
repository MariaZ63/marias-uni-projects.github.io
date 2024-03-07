import { Link } from "react-router-dom"; 

const Project = (param) => {
    return (
        <div id={param.content["name"]}>
            <h3>{param.content["title"]}</h3>
            <div>{param.content["Long description"]}</div>
            <div><b>Acquired skills:</b> {param.content["Acquired skills"].map((e, i) => {
                if(i < param.content["Acquired skills"].length - 1){
                    return <>{e} · </>
                }
                return <>{e} </>
            })}
            </div>
            <Link to={`${param.content["link"]}`} className="btn btn-primary m-1">View the project</Link>
        </div>
    );
}
export default Project;