import React, { } from 'react'
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useDispatch } from 'react-redux';
const FbLogin = () => {

  const dispatch = useDispatch()
  return (
    <>

      <FacebookLogin
        style={{
          backgroundColor: '#3b5998',
          color: 'white',
          width: '120px',
          height: '43px',
          borderRadius: '4px',
          display: ' flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: ' 0 10px',
          transition: ' 0.3s',

        }}
        appId="809869226693156"

        onSuccess={(response) => {

        }}
        onFail={(error) => {
        }}
        onProfileSuccess={(response) => {
          const name = response.name;
          const email = response.email;

        }}
        fields="name,email"
      >
        <i className="fab fa-facebook">&nbsp;
          <span style={{
            fontStyle: "Nunito Sans, sans-serif",
            fontWeight: "400"

          }}>
            facebook</span>
        </i>
      </FacebookLogin >
    </>
  )
}

export default FbLogin

