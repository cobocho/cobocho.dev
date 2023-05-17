type Props = {
  children: string;
  onClick?: () => void;
}

const TOCButton = ({ children , onClick } : Props) => {
  return (
    <button type='button' onClick={onClick}>
      <span className='material-symbols-outlined'>
        {children}
      </span>
    </button>
  )
}

export default TOCButton;