import React, { useState } from 'react';
import { Form, Space, Input, Button, Select, Divider, Card, Modal, Table, message, Tooltip, Typography } from 'antd';
import "./_compras.scss";

const FormularioClientes = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="complex-form"
            onFinish={onFinish}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
        >
            <Form.Item label="Cliente">
                <Space>
                    <Form.Item
                        name="username"
                        noStyle
                        rules={[
                            {
                                required: true,
                                message: 'Username is required',
                            },
                        ]}
                    >
                        <Input
                            style={{
                                width: 160,
                            }}
                            placeholder="Ingrese el nombre del cliente"
                        />
                    </Form.Item>
                    <Tooltip title="Useful information">
                        <Typography.Link href="#API">Need Help?</Typography.Link>
                    </Tooltip>
                </Space>
            </Form.Item>
            <Form.Item label="Dirección">
                <Input.Group compact>
                    <Form.Item
                        name={['address', 'province']}
                        noStyle
                        rules={[
                            {
                                required: true,
                                message: 'Province is required',
                            },
                        ]}
                    >
                        <Select placeholder="Region">
                            <Option value="Zhejiang">Zhejiang</Option>
                            <Option value="Jiangsu">Jiangsu</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={['address', 'street']}
                        noStyle
                        rules={[
                            {
                                required: true,
                                message: 'Street is required',
                            },
                        ]}
                    >
                        <Input
                            style={{
                                width: '50%',
                            }}
                            placeholder="Calle"
                        />
                    </Form.Item>
                </Input.Group>
            </Form.Item>
            <Form.Item
                label="Fecha de nacimiento"
                style={{
                    marginBottom: 0,
                }}
            >
                <Form.Item
                    name="year"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        display: 'inline-block',
                        width: 'calc(50% - 8px)',
                    }}
                >
                    <Input placeholder="Año" />
                </Form.Item>
                <Form.Item
                    name="month"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        display: 'inline-block',
                        width: 'calc(50% - 8px)',
                        margin: '0 8px',
                    }}
                >
                    <Input placeholder="Mes" />
                </Form.Item>
            </Form.Item>
        </Form>
    )

}

const DetalleCompra = () => {

    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const FormularioProductos = () => {
        const [form] = Form.useForm();

        const onFinish = (values) => {
            console.log('Received values of form: ', values);
            values.total = values.cantidad * values.precio;
            setData([...data, values]);
            setOpen(false);
        }

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        }

        return (
            <Form
                form={form}
                layout="vertical"
                name="FormularioProductos"
                initialValues={{ modifier: 'public' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item name="producto" label="Producto">
                    <Input />
                </Form.Item>
                <Form.Item name="cantidad" label="Cantidad">
                    <Input />
                </Form.Item>
                <Form.Item name="precio" label="Precio">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Agregar</Button>
                </Form.Item>
            </Form>
        )
    }

    const columns = [
        {
            title: 'Producto',
            dataIndex: 'producto',
            key: 'producto',
        },
        {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
        },
        {
            title: 'Precio',
            dataIndex: 'precio',
            key: 'precio',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
    ];

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };


    const [messageApi, contextHolder] = message.useMessage();

    let success = () => { }

    if (data.length > 0) {
        success = () => {
            messageApi.open({
                type: 'success',
                content: 'Compra registrada con éxito',
            })
            setTimeout(() => {
                window.location.assign('/');
            }, 2000);
        };
    }
    else {
        success = () => {
            messageApi.open({
                type: 'error',
                content: 'No se ha registrado ninguna compra',
            })
        };
    }
    return (
        <div className='detalle-compra'>
            <Table rowSelection={{
                type: 'checkbox',
                ...rowSelection,
            }}
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            <Space direction="horizontal" size="middle" style={{ margin: '2rem 0px 0px 0px' }}>
                <Modal
                    title="Añadir nuevo producto"
                    open={open}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                >
                    <FormularioProductos />
                </Modal>
                {contextHolder}
                <Button type="primary" onClick={showModal}>Agregar producto</Button>
                <Button type="primary" onClick={() => { console.log(selection.key) }}>Eliminar producto</Button>
                <Button onClick={success}>Registrar venta</Button>
            </Space>
        </div>
    )
}


export default function App() {
    const proveedores = [
        {
            label: 'Proveedor 1',
            value: 'proveedor1'
        },
        {
            label: 'Proveedor 2',
            value: 'proveedor2'
        },
        {
            label: 'Proveedor 3',
            value: 'proveedor3'
        },
    ]

    const [items, setItems] = useState(proveedores);

    const [openModal, setOpenModal] = useState(false);
    const [openSelector, setOpenSelector] = useState(false);

    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpenSelector(false);
        setOpenModal(true);
    };
    const handleOk = () => {
        setModalText('Cargando nuevo proveedor...');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpenModal(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpenModal(false);
    };
    const onChange = (value) => {
        console.log(`selected ${value}`);
    }

    return (
        <div className='contenedor-compras'>
            <Card bordered={false} style={{ width: '80%' }} >
                <FormularioClientes />
                <Divider />
                <DetalleCompra />
            </Card>

        </div>
    );
}