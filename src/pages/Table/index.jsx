import { useState, useEffect } from 'react';
import { Button, Table, Modal, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function PageTable() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('usuario_logado');

    try {
      const response = await fetch('http://localhost:3000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: '2',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: '3',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: '4',
      title: 'Age',
      dataIndex: 'age',
    },
    {
      key: '5',
      title: 'Website',
      dataIndex: 'website',
    },
    {
      key: '6',
      title: 'Introduction',
      dataIndex: 'introduction',
    },
    {
      key: '7',
      title: 'Actions',
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditUser(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteUser(record);
              }}
              style={{ color: 'red', marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  function onAddUser() {
    navigate('/form');
  }

  const onDeleteUser = (record) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this user record?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((user) => user.id !== record.id);
        });
      },
    });
  };

  const onEditUser = (record) => {
    setIsEditing(true);
    setEditingUser({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingUser(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onAddUser}>Add a new User</Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit user"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((user) => {
                if (user.id === editingUser.id) {
                  return editingUser;
                } else {
                  return user;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingUser?.name}
            onChange={(e) => {
              setEditingUser((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <Input
            value={editingUser?.email}
            onChange={(e) => {
              setEditingUser((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <Input
            value={editingUser?.age}
            onChange={(e) => {
              setEditingUser((pre) => {
                return { ...pre, age: e.target.value };
              });
            }}
          />
          <Input
            value={editingUser?.website}
            onChange={(e) => {
              setEditingUser((pre) => {
                return { ...pre, website: e.target.value };
              });
            }}
          />
          <Input
            value={editingUser?.introduction}
            onChange={(e) => {
              setEditingUser((pre) => {
                return { ...pre, introduction: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}
