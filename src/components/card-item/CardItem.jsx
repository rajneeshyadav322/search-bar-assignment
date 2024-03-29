const CardItem = ({ className, content }) => {
    return <div className={className} dangerouslySetInnerHTML={{ __html: `${content}` }}></div>
}

export default CardItem