import classNames from "classnames";
import React from "react";

export default function Section(props) {
    const classes = classNames("flex", "flex-row", "flex-wrap", props.className);
    let id = props.id;
    return (
        <section className={classes} id={id}>
            {props.children}
        </section>
    );
}

export function SectionColumn(props) {
    const classes = classNames("flex", "flex-col", props.className);
    return <div className={classes}>{props.children}</div>;
}

export function SectionRow(props) {
    const classes = classNames("flex flex-row  flex-wrap   ", props.className);
    return <div className={classes}>{props.children}</div>;
}