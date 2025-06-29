import React, { Component, createRef } from 'react';
import { observer } from 'mobx-react';
import { Button, Input, Space, Card, Typography, Table, message, Divider, Row, Col, Badge } from 'antd';
import { CopyOutlined, DatabaseOutlined, ApiOutlined } from '@ant-design/icons';
import store from './store';

const { Text, Title } = Typography;

const DEMO_DATA = [
    { id: 1, string: '123' },
    { id: 2, string: '456' },
    { id: 3, string: "123' UNION SELECT username,password FROM users-- -" }
];

const USERS_DATA = [
    { id: 1, username: 'admin', password: 'super_secret_admin_password123', created_at: '2024-03-21 00:00:00' },
    { id: 2, username: 'regular_user', password: 'normal_user_password456', created_at: '2024-03-21 00:00:00' }
];

@observer
export default class SQLInjectionPage extends Component {
    constructor(props) {
        super(props);
        this.resultRef = createRef();
        this.state = {
            backendStatus: 'processing',  // 'success', 'error', 'processing'
            dbStatus: 'processing'        // 'success', 'error', 'processing'
        };
    }

    componentDidMount() {
        this.checkConnections();
        // Check connections every 5 seconds
        this.connectionInterval = setInterval(this.checkConnections, 5000);
    }

    componentWillUnmount() {
        if (this.connectionInterval) {
            clearInterval(this.connectionInterval);
        }
    }

    checkConnections = async () => {
        try {
            // Check backend connection
            const backendResponse = await store.checkBackendConnection();
            this.setState({ backendStatus: backendResponse ? 'success' : 'error' });
            
            // Check database connection
            const dbResponse = await store.checkDatabaseConnection();
            this.setState({ dbStatus: dbResponse ? 'success' : 'error' });
        } catch (error) {
            this.setState({ 
                backendStatus: 'error',
                dbStatus: 'error'
            });
        }
    };

    getColumns(data) {
        if (!data || !data[0]) return [];
        return Object.keys(data[0]).map(key => ({
            title: key,
            dataIndex: key,
            key: key
        }));
    }

    copyInjectionString() {
        const injectionString = "123' UNION SELECT username,password FROM users-- -";
        navigator.clipboard.writeText(injectionString)
            .then(() => message.success('Copied!', 1))
            .catch(() => message.error('Failed to copy', 1));
    }

    render() {
        const { backendStatus, dbStatus } = this.state;

        return (
            <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    {/* Connection Status */}
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Space size="large">
                                <Space>
                                    <ApiOutlined />
                                    <Text>Backend:</Text>
                                    <Badge 
                                        status={backendStatus} 
                                        text={backendStatus === 'success' ? 'Connected' : 
                                              backendStatus === 'error' ? 'Disconnected' : 'Checking...'}
                                    />
                                </Space>
                                <Space>
                                    <DatabaseOutlined />
                                    <Text>Database:</Text>
                                    <Badge 
                                        status={dbStatus}
                                        text={dbStatus === 'success' ? 'Connected' : 
                                              dbStatus === 'error' ? 'Disconnected' : 'Checking...'}
                                    />
                                </Space>
                            </Space>
                        </Col>
                    </Row>

                    {/* Data Overview Section */}
                    <Row gutter={[0, 16]}>
                        <Col span={24}>
                            <Card 
                                title={<Space><DatabaseOutlined />demo_data table</Space>}
                            >
                                <Table 
                                    dataSource={DEMO_DATA}
                                    columns={this.getColumns(DEMO_DATA)}
                                    pagination={false}
                                    size="small"
                                />
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card 
                                title={<Space><DatabaseOutlined />users table</Space>}
                            >
                                <Table 
                                    dataSource={USERS_DATA}
                                    columns={this.getColumns(USERS_DATA)}
                                    pagination={false}
                                    size="small"
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Divider>SQL Injection Playground | SQLi POC </Divider>

                    {/* SQL Injection Test Section */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Input
                            placeholder="Enter values (e.g. 123, 456)"
                            value={store.username}
                            onChange={(e) => store.setUsername(e.target.value)}
                            style={{ width: '100%' }}
                        />
                        <Button 
                            icon={<CopyOutlined />}
                            onClick={this.copyInjectionString}
                            title="Copy Injection String"
                        >
                            Copy Injection String
                        </Button>
                    </div>
                    
                    <Space>
                        <Button type="primary" danger onClick={() => store.testInjectable()} loading={store.loading}>
                            Test Injectable
                        </Button>
                        <Button type="primary" onClick={() => store.testNonInjectable()} loading={store.loading}>
                            Test Non-Injectable
                        </Button>
                    </Space>

                    {/* Result Section with fixed height container */}
                    <div style={{ 
                        minHeight: '500px',
                        transition: 'min-height 0.3s ease-in-out',
                        overflow: 'hidden'
                    }}>
                        {(store.result || store.error) && (
                            <Card title="Result" ref={this.resultRef}>
                                {store.error ? (
                                    <Text type="danger">{store.error}</Text>
                                ) : Array.isArray(store.result) ? (
                                    <Table 
                                        dataSource={store.result}
                                        columns={this.getColumns(store.result)}
                                        rowKey={(record, index) => index}
                                        pagination={false}
                                        scroll={{ y: 240 }}
                                    />
                                ) : (
                                    <pre>{JSON.stringify(store.result, null, 2)}</pre>
                                )}
                            </Card>
                        )}
                    </div>
                </Space>
            </div>
        );
    }
} 