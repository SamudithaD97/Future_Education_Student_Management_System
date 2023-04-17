import classNames from "classnames";
import React from "react";

export default function RoundedButton({ ref, onClick, type, ...props }) {
    const classes = classNames("rounded-full align-middle", props.className);
    return (
        <button ref={ref} onClick={onClick} className={classes} type={type}>
            {props.children}
        </button>
    );
}
