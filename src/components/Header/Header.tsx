import React from 'react';

interface IProps {
    classes: {
        root: string
    }
}

class Header extends React.Component<IProps, {}> {
    render() {
        return (
            <nav className={"navbar is-warning"} role={"navigation"} aria-label={"main navigation"}>
                <div className={"header column is-10 is-offset-1"}>
                    <div className={"header__title"}>
                        <h1 className={"title"}>Meal App</h1>
                    </div>

                    <div className={"header__button"}>
                        <button className={"button is-dark"}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
