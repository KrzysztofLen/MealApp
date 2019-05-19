import React from "react";
import {connect} from "react-redux";

interface IProps {
    onClick: (e: any) => void,
    isOpen: boolean,
    onConfirmDelete: (e: any) => void,
}

export default (props: IProps) => {
        return (
            <div className={`modal ${props.isOpen ? "is-active" : null}`}>
                <div className="modal-background"/>
                <div className="modal-content">
                    <article className="message is-danger">
                        <div className="message-header">Delete order?</div>
                        <section className="modal-body">
                            <h4 className="subtitle is-4">Are you sure?</h4>
                        </section>
                        <div className={"form__buttons"}>
                            <button className="button is-danger is-outlined" onClick={props.onClick}>
                                <span>Cancel</span>
                                <span className="icon is-small">
                              <i className="fas fa-times"/>
                            </span>
                            </button>
                            <button type={"submit"} className={"button is-success"} onClick={props.onConfirmDelete}>
                                <span className={"icon is-small"}>
                                  <i className={"fas fa-check"}/>
                                </span>
                                <span>Delete</span>
                            </button>
                        </div>
                    </article>
                </div>
            </div>
        )
}