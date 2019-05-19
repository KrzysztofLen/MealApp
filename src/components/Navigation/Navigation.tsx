import React from "react";
import {NavLink, Route} from 'react-router-dom';

interface ISideMenuLinkProps {
    to: string,
    activeOnlyWhenExact?: boolean,
    id: number,
    name: string,
    icon?: string
}

export const NavigationItem = ({to, activeOnlyWhenExact, id, name, icon}: ISideMenuLinkProps) => {
    return (
        <Route path={to}
               exact={activeOnlyWhenExact}
               children={({match}: any, index: number) => (
                   <li key={index}
                       className={match ? "is-active" : "has-background-warning"}>
                       <NavLink to={to} id={id} className={"navigation__link"}>
                           <span className={"icon is-small"}>
                               <i className={`fas fa-${icon}`} aria-hidden="true" />
                           </span>
                           {name}
                       </NavLink>
                   </li>
               )}
        />
    );
};

export default () => {
    return (
        <div className={"tabs is-boxed is-centered"} role="navigation" aria-label="main navigation">
            <ul>
                <NavigationItem activeOnlyWhenExact={true} to="/" id={0} name={"Open"} icon={"door-open"}/>
                <NavigationItem to="/history" id={1} name={"History"} icon={"folder-open"}/>
            </ul>
        </div>
    )
}
