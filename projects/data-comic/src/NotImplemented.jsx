const NotImplemented = ({data}) => {
    return (
      <svg viewBox="0 0 400 300" width="400" height="300" overflow="visible">
        <foreignObject x="30" y="30" width="400" height="200">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{ width: "100%", height: "100%" }}
          >
            <div className="alert alert-danger">We received your input <b>{data}</b>. However, this part is not implemented yet, sorry. Please be patient!</div>
          </div>
        </foreignObject>
      </svg>
    )
}
export default NotImplemented;