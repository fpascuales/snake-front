export {signUser, login, isLogin};
const URL_BACK='https://snake-back-sigma.vercel.app';
const signUser = async (username, password) => {
    const objectToSend = {
        user: username,
        password: password
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectToSend)
    }
    await fetch(`${URL_BACK}/players/registro`, options);
    login(username, password)
}
const login = async (username, password) => {
    const objectToSend = {
      user: username,
      password: password
    };
    try {
      const response = await fetch(`${URL_BACK}/players/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectToSend)
      });
      const result = await response.json();
      if (result.token) {
        sessionStorage.setItem('token', result.token);
        isLogin(result.player.user);
      } else {
        throw new Error('Error de autenticación');
      }
    } catch (error) {
      console.error(error);
    }
  };
const isLogin = (user) => {
    const divFormulario = document.querySelector('#div-formulario')
    divFormulario.innerHTML = ''

    const welcome = document.createElement("span")
    welcome.textContent = `Bienvenido ${user}`
    welcome.classList = "col mx-1"

    const btnLogout = document.createElement("button")
    btnLogout.textContent = "Log out"
    btnLogout.classList = "col btn btn-secondary btn-sm mx-1"

    divFormulario.appendChild(welcome)
    divFormulario.appendChild(btnLogout)
    btnLogout.addEventListener('click', logOut)
}
const logOut = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("userId")
    sessionStorage.removeItem("user")
    location.reload();
}