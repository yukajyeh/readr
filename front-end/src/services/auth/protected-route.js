import React from 'react';
import { Route, Redirect } from 'react-router-dom';
 
const protectedRoute  = ({component: Component, userInSession, getTheUser, ...rest}) => {
  console.log({component: Component, userInSession, getTheUser, ...rest})
    return (
      <Route
        {...rest}
        render={ props  => {
            if(userInSession){
              return <Component {...props} loggedInUser={userInSession} getTheUser={getTheUser}/>
            } else {
              return <Redirect to={{pathname: '/', state: {from: props.location}}} />
            }
          }
        }
      />
    )
}
export default protectedRoute;