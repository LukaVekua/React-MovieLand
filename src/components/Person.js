const Person = ({ person }) => {
    const { url, name, country, birthday, gender, image } = person
    return <>
        <img src={image !== null && image.medium !== null && image.medium} alt={name} />
        <div className="person-details">
            <span>{name}</span>
            <span>{country !== null && country.name}</span>
            <span>{birthday !== null && birthday}</span>
            <span>{gender !== null && gender}</span>
            <a href={url}>See Details</a>
        </div>
    </>
}
export default Person