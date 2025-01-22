const Header = ({ txt, isForm, isMandatory }: any) => {
    return (
        <h1 className={`text-[20px] font-semibold 
        ${isForm && 'text-formColor'} ${isMandatory && 'mandotatory'}`}>
            {txt}
        </h1>
    )
}


export default Header
