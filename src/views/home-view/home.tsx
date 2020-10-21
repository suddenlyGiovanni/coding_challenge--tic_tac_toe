import React from 'react'
import { RouteChildrenProps } from 'react-router'
import { NavLink, Route, Switch } from 'react-router-dom'

import { homeWrapper, elementContainer, listElement } from './home.styles'

import { Duck } from 'components/duck/duck'
import { Header } from 'views/home-view/header/header'
import { Main } from 'views/home-view/main/main'

export function Home(props: RouteChildrenProps): JSX.Element {
  return (
    <div className={homeWrapper}>
      <Header />
      <Main>
        <ul className={elementContainer}>
          <li className={listElement}>
            <NavLink to="/duck">{'Duck'}</NavLink>
          </li>

          <li className={listElement}>
            <NavLink to="/other">{'Other'}</NavLink>
          </li>
        </ul>
        <Switch>
          <Route component={Duck} path="/duck" />
        </Switch>
      </Main>
    </div>
  )
}
