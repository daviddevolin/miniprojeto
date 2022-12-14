import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Card, Table, Space, Button} from 'antd';
import React, { useState } from 'react';

import "antd/dist/antd.css";

export default function AuthorSearch(){
    const router = useRouter();
    const {author} = router.query;
    const {data, error} = useSWR(`http://openlibrary.org/search.json?author=${author}`, fetcher);
    
    if (error) return <div>falha na requisição...</div>
    if (!data) return <div>carregando...</div>
    if (data.Response=="False")return<div>autor não encontrado...</div>
    
    const array= data.docs;
    console.log(array)

    let data2 = []
   
    array.forEach((element,index) => {
            
        data2[index] = {
            title: element.title,
            first_publish_year: element.first_publish_year,
            author_name: element.author_name
        }
    });

    console.log(data2)

    
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'tile',
            width: '30%',

        },
        {
            title: 'First_publish_year',
            dataIndex: 'first_publish_year',
            key: 'first_publish_year',
            width: '20%',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.first_publish_year - b.first_publish_year
           
        },
        {
            title: 'author_name',
            dataIndex: 'author_name',
            key: 'author_name',
            
        },
      ];
    
   
    return (
        <>
            <Space
                style={{
                marginBottom: 16,
                }}
            >
                
            </Space>
            <Table dataSource={data2} columns={columns} />
        </>
    )
}

async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}