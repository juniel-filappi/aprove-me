interface MenuItemProps {
    icon: string;
    label: string;
    isActive: boolean;
    onClick?: () => void;
}

export default function MenuItem(props: MenuItemProps) {
    return (
        <div
            className={`flex items-center gap-5 px-4 py-2 rounded cursor-pointer hover:bg-blue-400 transition-all delay-150 ${
                props.isActive ? 'bg-blue-500' : ''
            }`}
            onClick={props.onClick}
        >
            <i className={`pi ${props.icon}`}/>
            <span>{props.label}</span>
        </div>
    )
}