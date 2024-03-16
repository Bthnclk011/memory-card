function Card({image, suit})
{
    return (
        <img src={image} alt={suit} width="150" height="200"/>
    )
}
export default Card