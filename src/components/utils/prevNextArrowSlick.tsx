

const PrevNextArrowSlick = (props:any) => {
    const { className, onClick, style } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block",backgroundColor:'red' }}
            onClick={onClick}
        />
    )
}

export default PrevNextArrowSlick
