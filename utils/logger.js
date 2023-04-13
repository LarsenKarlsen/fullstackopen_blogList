const timestamp = () =>  {
  const time = new Date().toLocaleTimeString()
  const date = new Date().toLocaleDateString()
  return `[${date} ${time}] => `
}

const info = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(timestamp(), ...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(timestamp(), ...params)
  }
}

module.exports = {
  info, error
}