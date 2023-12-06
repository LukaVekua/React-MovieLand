const ShowCast = ({ cast }) => {
    return <>
        {cast.name === undefined && < div className="cast-box">
            {cast.map((actor, index) => {
                const { person } = actor
                const { id, name, birthday, deathday, image, } = person
                const { medium: img } = image !== null && image
                if (index < 8) return <div>
                    <img src={img} />
                    <span>{name}</span>
                </div>
            })}
        </div >}
    </>


}
export default ShowCast