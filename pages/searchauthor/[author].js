import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Card, Table, Space, Button, Input} from 'antd';
import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import "antd/dist/antd.css";

export default function AuthorSearch(){
    const router = useRouter();
    const {author} = router.query;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
      };
    const {data, error} = useSWR(`https://openlibrary.org/search.json?author=${author}`, fetcher);
    if (error) return <div>falha na requisição...</div>
    if (!data) return <div>carregando...</div>
    if (data.Response=="False")return<div>autor não encontrado...</div>
    
    

    const array= data.docs;
    console.log(array)

    let data2 = []
   
    array.forEach((element,index) => {
            
        data2[index] = {
            key:index,
            title: element.title,
            first_publish_year: element.first_publish_year,
            author_name: element.author_name,
            cover_i: element.cover_i,
            img:`https://covers.openlibrary.org/b/id/${element.cover_i}-L.jpg`
        }
    });

    console.log(data2)
    
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({
                    closeDropdown: false,
                  });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1890ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'tile',
            width: '30%',
            
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('title'),
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
            <Table 
              columns={columns} 
              expandable={{
                expandedRowRender: (record) => <img src={`${record.img}`}/>,
                rowExpandable: (record) => record.cover_i >0,
              }}
              dataSource={data2}
            />
        </>
    )
}

async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}
