import React, { useState } from 'react';
import { Form, Space, Input, Button, Select, Divider, Card, Modal, Table, message } from 'antd';
import "./_compras.scss";

const FormularioProveedores = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            name="FormularioProveedores"
            initialValues={{ modifier: 'public' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item name="proveedor" label="Proveedor">
                <Input />
            </Form.Item>
            <Form.Item name="direccion" label="Dirección">
                <Input />
            </Form.Item>
            <Form.Item name="telefono" label="Teléfono">
                <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
                <Input />
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
                <Button onClick={success}>Registrar compra</Button>
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
                <Select
                    mode="single"
                    style={{ width: '100%' }}
                    placeholder="Seleccione Proveedor"
                    onChange={onChange}
                    optionLabelProp="label"
                    open={openSelector}
                    onDropdownVisibleChange={(open) => {
                        setOpenSelector(open);
                    }}
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                            <Divider style={{ margin: '4px 0' }} />
                            <Space
                                style={{
                                    padding: '0 8px 4px',
                                }}
                            >
                                <Button onClick={showModal}>Añadir nuevo proveedor</Button>
                                <Modal
                                    title="Añadir nuevo proveedor"
                                    open={openModal}
                                    onOk={handleOk}
                                    confirmLoading={confirmLoading}
                                    onCancel={handleCancel}
                                    cancelText="Cancelar"
                                    okText="Guardar"
                                >
                                    <FormularioProveedores />
                                </Modal>
                            </Space>
                        </>
                    )}
                >
                    {items.map((item, index) => (
                        <Select.Option key={index} value={item.value} label={item.label}>
                            {item.label}
                        </Select.Option>
                    ))}
                </Select>
                <Divider />
                <DetalleCompra />
            </Card>

        </div>
    );
}