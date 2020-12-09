export const randomNameGenerator = () => {
  const num = 8;
  let name = '';

  for (let i = 0; i < num; i++) {
    const random = Math.floor(Math.random() * 27);

    name += String.fromCharCode(97 + random);
  }

  return name;
};
