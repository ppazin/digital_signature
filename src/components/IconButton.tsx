interface IconButtonProps {
    icon: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    text?: string;
}


const IconButton: React.FC<IconButtonProps> = ({
    icon,
    onClick,
    disabled = false,
    text,
}) => {
    return (
        <button onClick={onClick} disabled={disabled}
        className="cursor-pointer flex gap-2 items-center bg-[#757bc833] hover:bg-[#8e94f233] transition-colors duration-200 ease-in-out
         border border-[#757bc8] rounded-md p-2! disabled:opacity-50 disabled:cursor-not-allowed">
            <div className="border border-[#8187dc] bg-[#757bc8] rounded-md p-2!">
                {icon}
            </div>
            {text && <span>{text}</span>}
        </button>
    );
};

export default IconButton;