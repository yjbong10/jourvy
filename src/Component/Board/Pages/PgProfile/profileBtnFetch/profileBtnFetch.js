// reset profile
export const onResetProfile = (props) => {
    props.setIsShow(false);
    props.setProgress(10)
    fetch('https://jourvy-server.herokuapp.com/profile/reset', {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            email: props.email,
            password: props.userPasswordInput
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data !== 'wrong password.') {
            props.setProgress(100)
            props.setIsShow(true);
            props.setError(data)
            props.history.push('/')

        } else {
            props.setProgress(70)
            props.setIsShow(true);
            props.setError('wrong password! Loging out...', 'warn')
            setTimeout(() => {
                props.history.push('/logout')
                props.setProgress(100)
            }, [3000])
        }
    })
    .catch(err => {
        props.setProgress(100)
        props.setIsShow(true);
        props.setError(err, 'warn')
    })
    props.setProgress(60)
}




// change password
export const onChangePassword = (props) => {
    props.setIsShow(false);
    props.setProgress(10)
    fetch('https://jourvy-server.herokuapp.com/account/edit/password', {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            email: props.email,
            password: props.userPasswordInput,
            newPassword: props.userNewPasswordInput
        })
    })
    .then(res => res.json())
    .then(data => {
        if( data === 'user password has been successfuly changed.' ) {
  
            props.setProgress(70)
            props.setIsShow(true);
            props.setError(data)
            setTimeout(() => {
                props.history.push('/logout')
                props.setProgress(100)
            }, [3000])

        } else {
            props.setIsShow(true);
            props.setError(data, 'warn')
        }

    })
    .catch(err => {
        props.setProgress(100)
        props.setIsShow(true);
        props.setError(err, 'warn')
    })
    props.setProgress(60)
}




//change name
export const onChangeName = (props) => {
    props.setIsShow(false);
    props.setProgress(10)
    fetch('https://jourvy-server.herokuapp.com/account/edit/name', {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            email: props.email,
            name: props.userData.name,
            newName: props.userNewNameInput
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.newName) {
            props.setUserName(data.newName)
            props.setOnEditAccount(false)
            props.setProgress(100)
        } else {
            props.setIsShow(true);
            props.setError(data, 'warn')
            props.setProgress(100)
        }
    })
    .catch(err => {
        props.setIsShow(true);
        props.setError(err, 'warn')
        props.setProgress(100)
    })
    props.setProgress(60)
}




//delete account
export const onDeleteAccount = (props) => {
    props.setIsShow(false);
    props.setProgress(10)
    fetch('https://jourvy-server.herokuapp.com/account/delete', {
        method: 'delete',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            email: props.email,
            password: props.userPasswordInput
        })
    })
    .then(res => res.json())
    .then(data => {
        props.setProgress(70)
        props.setIsShow(true);
        props.setError(data)
        setTimeout(() => {
            props.history.push('/logout')
            props.setProgress(100)
        }, [3000])
    })
    .catch(err => {
        props.setIsShow(true);
        props.setError(err, 'warn')
        props.setProgress(100)
    })
    props.setProgress(60)
}




// location verify
export const locationVerify = (props) => {
    props.setIsShow(false)
    props.setProgress(10)
    const { city, lat, lon } = props.userInfoInput
    const previousCity  = props.weatherInfo.location.city

    fetch('https://jourvy-server.herokuapp.com/weather', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          lat: lat|| null,
          lon: lon || null,
          city: city || null
      })
  })
    .then(res => res.json())
    .then(data => {
      if(data.weather){
        const { id, main, description } = data.weather[0]
        const { temp, feels_like, temp_min, temp_max } = data.main
        const { country } = data.sys
        const city = data.name
        props.setWeatherInfo(id, main, temp, feels_like, temp_min, temp_max, description, country, city)
        props.setIsShow(true)
        props.setError(`location is set to ${city}.`)
        if (props.userInfoInput.city) {
            props.setCity(city)

        } else if (props.userInfoInput.lat && props.userInfoInput.lon) {
            props.setGeolocation(props.userInfoInput.lat, props.userInfoInput.lon)
        }
      } else {
        props.setIsShow(true)
        props.setError('location not found.', 'warn')
        // props.setIsAutoLocation(true)
        props.setCityInput(previousCity)
        props.setCity(previousCity)
      }
    props.setProgress(100)
    }) 
    .catch(err => {
      props.setIsShow(true)
      props.setError('something is wrong. :(', 'warn')
      props.setProgress(100)
    }) 
  props.setProgress(50)
}


// save default settings 
export const saveDefault = (props) => {
    console.log('in')
    props.setIsShow(false)
    props.setProgress(10)

    const { city, lat, lon } = props.userInfoInput
    const { auto } = props.userInfo.location
    const method = !props.userInfo.location.method.byCity
    const previousCity  = props.weatherInfo.location.city


    fetch('https://jourvy-server.herokuapp.com/weather', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            lat: lat|| null,
            lon: lon || null,
            city: city || null
        })
    }).then(res => res.json())
    .then(data => {
        if(data.weather) {
            console.log('weather Data')
            props.setProgress(40)
            return data
        } else {
            if(auto) {
                console.log('weather no Data but auto')
                return data
            } else {
                props.setCityInput(previousCity)
                props.setCity(previousCity)
                console.log('location not found')
                throw new Error ('location not found.')
            }
        }
    })
    .then(data => {
        console.log('settings in')
        props.setProgress(60)
        fetch('https://jourvy-server.herokuapp.com/settings', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email: props.email,
                isNightMode: props.isNightMode, 
                islocationAuto: auto,
                locationMethod: method,
                city: city,
                lat: lat,
                lon: lon
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.settings_id) {
                console.log('settings is saved')
                props.setIsShow(true)
                props.setError(`settings is saved.`)
                props.history.push('/')
            } else {
                console.log('no settings_id')
                props.setIsShow(true)
                props.setError(data.message, 'warn')
            }
            props.setProgress(100)
        })
        .catch(err => {
            console.log(err)
            props.setProgress(100)
        })
        props.setProgress(80)
    })
    .catch(err => {
        console.log('err', err.message)
        props.setIsShow(true)
        props.setError(err.message, 'warn')
        props.setProgress(100)
    })
    props.setProgress(50)
} 