const timestamp = () =>  {
  const time = new Date().toLocaleTimeString()
  const date = new Date().toLocaleDateString()
  return `[${date} ${time}] => `
}

const info = (...params) => {
  console.log(timestamp(), ...params)
}

const error = (...params) => {
  console.error(timestamp(), ...params)
}

module.exports = {
  info, error
}