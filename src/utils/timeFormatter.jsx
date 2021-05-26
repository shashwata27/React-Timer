const timeFormatter = (time) => {
  const mili = `0${Math.floor(time % 100)}`.slice(-2);
  const sec = `0${Math.floor((time / 100) % 60)}`.slice(-2);
  const min = `0${Math.floor((time / 100 / 60) % 60)}`.slice(-2);
  const hr = `0${Math.floor((time / 100 / 60 / 60) % 60)}`.slice(-2);
  return `${hr}:${min}:${sec}:${mili}`;
};
export default timeFormatter;
