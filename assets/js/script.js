const link = 'https://dragonball-api.com/api/characters?name=goku';
const load = async () => {
  const response = await fetch(link)
  const data = await response.json()
  console.log(data)
}

load ();
