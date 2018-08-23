const SENSORS_URL = 'https://motherweathernews.mybluemix.net/api/v1/sensors';

const post = (data: {}) => {
  const body = JSON.stringify(data);
  const method = 'POST'
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  fetch(SENSORS_URL, { body, method, headers })
    .then((response) => response.json())
    .then((response) => console.log(response));
};

export const postImage = (image: string) => {
  post({ image });
};

export const postText = (text: string) => {
  post({ text });
};
