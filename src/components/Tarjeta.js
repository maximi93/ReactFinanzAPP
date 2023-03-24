
const Tarjeta = ({tipo,header,title,body}) => {
    return (
        <div className={`card border-${tipo} mb-3`} >
            <div className="card-header">{header}</div>
            <div className={`card-body text-${tipo}`}>
                <h5 className="card-title">{title}</h5>
                <p className="card-text text-right">{body}</p>
            </div>
        </div>
    )
}

export default Tarjeta