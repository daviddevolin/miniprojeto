import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Card, Space} from 'antd';
import "antd/dist/antd.css";

export default function AuthorSearch(){
    const router = useRouter();
    const {author} = router.query;
    const {data, error} = useSWR(`http://openlibrary.org/search.json?author=${author}`, fetcher);
    const { Meta } = Card;

    if (error) return <div>falha na requisição...</div>
    if (!data) return <div>carregando...</div>
    if (data.Response=="False")return<div>autor não encontrado...</div>
    console.log(data)
    
    const array= data.docs;
    return (
        <div>
            <ul>
                {array.map((item,i)=>{
                    return(
                        <li key={i}> {item.title}</li>
                    )
                })}
            </ul>
        </div>
    )
}

async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }