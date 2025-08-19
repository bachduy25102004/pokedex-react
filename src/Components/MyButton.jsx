export default function MyButton( props ) {
    const { text } = props 
    return (
        <button style={{background: 'red'}} {...props}>
            {props.children}
        </button>
    )
}