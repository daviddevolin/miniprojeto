import React from 'react';
import { Button, Form, Input ,Layout, theme, Menu, Breadcrumb } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

export default function Search(){
    const onFinish =()=>{
        const value = document.getElementById('inputAuthor').value;
        window.location.href= `/searchauthor/${value}`
    }
    const { Header, Content, Footer } = Layout
    
    

    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 8,
        },
    };

    const formTailLayout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 8,
          offset: 4,
        },
    };
    return(
        <div>
            <Layout className="layout" style={{minHeight:'100vh'}}>
                <Header>
                    <div className="logo" />
                    <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items=''
                    />
                </Header>
                <Content
                    style={{
                    padding: '0 50px',
                    margin: '12% 0'
                    }}
                >
                    <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                    >
                    
                    </Breadcrumb>
                    <div
                    className="site-layout-content"
                    
                    >
                        <Form form={form} name="dynamic_rule" onFinish={onFinish}>
                            <Form.Item
                                {...formItemLayout}
                                name="author"
                                label="Author"
                                rules={[
                                {
                                    required: true,
                                    message: 'insira o nome do autor',
                                },
                                ]}
                            >
                                <Input 
                                    placeholder="digite o nome do autor"  
                                    id="inputAuthor" 
                                />
                            </Form.Item>

                            <Form.Item {...formTailLayout}>
                            <Button 
                                type='primary'  
                                icon={<SearchOutlined />}
                                htmlType="submit" 
                                id='buttonInput'> pesquisar
                            </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>

                <Footer
                    style={{
                    textAlign: 'center',
                    }}
                >
                    ©2022 Created by David Santos
                </Footer>
            </Layout>
        </div>
    );
}
