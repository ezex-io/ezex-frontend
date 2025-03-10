import { FC, SVGProps } from "react";

const XLogoIcon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#clip0_146_31)">
                <path
                    d="M14.3204 0C6.41175 0 0 6.41175 0 14.3204C0 22.2291 6.41175 28.6409 14.3204 28.6409C22.2291 28.6409 28.6409 22.2291 28.6409 14.3204C28.6409 6.41175 22.2291 0 14.3204 0Z"
                    fill="black"
                />
                <path
                    d="M15.8873 13.0245L22.0177 5.89839H20.565L15.242 12.0859L10.9905 5.89839H6.08691L12.516 15.255L6.08691 22.7278H7.53971L13.161 16.1936L17.6508 22.7278H22.5544L15.8869 13.0245H15.8873ZM8.06316 6.99204H10.2946L20.5657 21.6839H18.3343L8.06316 6.99204Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="clip0_146_31">
                    <rect width="28.6409" height="28.6409" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default XLogoIcon;
