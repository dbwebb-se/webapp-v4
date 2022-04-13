import Post from '../interfaces/post';
import ErrorMessage from '../interfaces/errormessage';


async function getPosts(): Promise<Post[]> {
    const response = await fetch("https://ladda.emilfolino.se/posts");
    const result = await response.json();
    return result.data;
}

export { getPosts };
