import React from 'react';
import { observer } from 'mobx-react';
import { Button, Input, Space, Card, Typography } from 'antd';
import store from './store';

const { Text } = Typography;

const SQLInjectionPage = () => {
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Input
                    placeholder="Enter username (e.g., admin' OR '1'='1)"
                    value={store.username}
                    onChange={(e) => store.setUsername(e.target.value)}
                    style={{ width: '100%' }}
                />
                
                <Space>
                    <Button type="primary" danger onClick={() => store.testInjectable()} loading={store.loading}>
                        Test Injectable
                    </Button>
                    <Button type="primary" onClick={() => store.testNonInjectable()} loading={store.loading}>
                        Test Non-Injectable
                    </Button>
                </Space>

                {(store.result || store.error) && (
                    <Card title="Result">
                        {store.error ? (
                            <Text type="danger">{store.error}</Text>
                        ) : (
                            <pre>{JSON.stringify(store.result, null, 2)}</pre>
                        )}
                    </Card>
                )}
            </Space>
        </div>
    );
};

export default observer(SQLInjectionPage); 