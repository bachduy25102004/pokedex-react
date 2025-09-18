export default function MyButton( props ) {
    // const { text } = props 
    return (
        <button style={{background: 'blue'}} {...props}>
            {props.children}
        </button>
    )
}