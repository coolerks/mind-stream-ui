export const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:26000' : '/';

// export const BASE_URL = import.meta.env.MODE === 'development' ? 'http://10.205.253.83:26000' : '/';
export const UPLOAD_URL = import.meta.env.MODE === 'development' ? 'http://localhost:26000/file/upload' : '/';
